/**
 * OMC Bridge Server — Escrow Routes
 * Implements the four escrow endpoints:
 *   POST /escrow
 *   GET  /escrow/:sessionId/manifest
 *   GET  /escrow/:sessionId/modules
 *   POST /escrow/:sessionId/consume
 */

import { Router, type Request, type Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createHash, randomBytes } from 'node:crypto';

import {
  createSession,
  getSession,
  consumeSession,
} from '../escrow-store';
import { writeAuditRecord } from '../audit-logger';
import { validateEscrowRequest } from '../schema-validator';
import { GovernanceGate } from '../governance-gate';
import type {
  CreateEscrowRequest,
  CreateEscrowResponse,
  ManifestResponse,
  ModulesResponse,
  ConsumeResponse,
  ErrorResponse,
  ModuleEntry,
} from '../types';

const router = Router();
const gate = new GovernanceGate();

function decodeModuleContent(content: string): string {
  const normalized = content.replace(/\s+/g, '');
  const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
  if (normalized.length === 0 || normalized.length % 4 !== 0 || !base64Pattern.test(normalized)) {
    throw new Error('Module content is not valid base64');
  }

  const decoded = Buffer.from(normalized, 'base64').toString('utf8');
  if (decoded.length === 0) {
    throw new Error('Decoded module content is empty');
  }
  return decoded;
}

function sha256Hex(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

// ─── POST /escrow ─────────────────────────────────────────────────────────────
// Create a new escrow session and store the module bundle in memory.

router.post('/', async (req: Request, res: Response) => {
  const ip = req.ip ?? 'unknown';
  const body = req.body as CreateEscrowRequest;

  // Schema validation
  const validation = validateEscrowRequest(body);
  if (!validation.valid) {
    writeAuditRecord({
      timestamp: new Date().toISOString(),
      event_type: 'validation.failed',
      ip_address: ip,
      detail: validation.errors.join('; '),
    });
    const err: ErrorResponse = {
      error: 'Payload validation failed',
      code: 'VALIDATION_ERROR',
    };
    res.status(400).json({ ...err, details: validation.errors });
    return;
  }

  // Integrity + GOVERNANCE VALIDATION (Circuit Breaker)
  for (const module of body.modules) {
    let decodedCode: string;
    try {
      decodedCode = decodeModuleContent(module.content);
    } catch (error) {
      const err: ErrorResponse = {
        error: `Payload validation failed for ${module.module_id}: ${(error as Error).message}`,
        code: 'VALIDATION_ERROR',
      };
      res.status(400).json(err);
      return;
    }

    const computedHash = sha256Hex(decodedCode);
    if (computedHash !== module.sha256.toLowerCase()) {
      writeAuditRecord({
        timestamp: new Date().toISOString(),
        event_type: 'validation.failed',
        ip_address: ip,
        detail: `SHA mismatch for ${module.module_id} expected=${module.sha256} actual=${computedHash}`,
      });
      const err: ErrorResponse = {
        error: `SHA-256 mismatch for ${module.module_id}`,
        code: 'VALIDATION_ERROR',
      };
      res.status(400).json(err);
      return;
    }

    const report = await gate.validateSovereignty(module.module_id, decodedCode, module.spectral);
    if (!report.authorized) {
       writeAuditRecord({
         timestamp: new Date().toISOString(),
         event_type: 'governance.violation',
         ip_address: ip,
         detail: `Stability Warning! ${module.module_id} | Tier: ${report.tier} | Resonance: ${report.resonanceScore.toFixed(3)}v`,
       });
       const err: ErrorResponse = {
         error: `Sovereignty Breach: ${report.reason}`,
         code: 'GOVERNANCE_BREACH',
       };
       res.status(403).json(err);
       return;
    }
  }

  // Generate session id and one-time token
  const sessionId = uuidv4();
  const token = randomBytes(32).toString('hex'); // 64 hex chars
  const now = new Date();
  const expiresAt = new Date(now.getTime() + body.ttl_seconds * 1000);

  createSession({
    session_id: sessionId,
    token,
    pipeline_id: body.pipeline_id,
    manifest_hash: body.manifest_hash,
    manifest: body.manifest,
    ttl_seconds: body.ttl_seconds,
    expires_at: expiresAt,
    created_at: now,
    pack_id: body.pack_id,
    pack_version: body.pack_version,
    capability_tags: body.capability_tags,
    modules: body.modules,
    metadata: body.metadata,
    consumed: false,
  });

  writeAuditRecord({
    session_id: sessionId,
    timestamp: now.toISOString(),
    event_type: 'session.created',
    manifest_hash: body.manifest_hash,
    pipeline_id: body.pipeline_id,
    pack_id: body.pack_id,
    ip_address: ip,
  });

  const response: CreateEscrowResponse = {
    session_id: sessionId,
    token,
    expires_at: expiresAt.toISOString(),
    created_at: now.toISOString(),
  };

  res.status(201).json(response);
});

// ─── GET /escrow/:sessionId/manifest ─────────────────────────────────────────
// Return the manifest stored in this escrow session.

router.get('/:sessionId/manifest', (req: Request, res: Response) => {
  const { sessionId } = req.params as { sessionId: string };
  const ip = req.ip ?? 'unknown';
  const session = getSession(sessionId);

  if (!session) {
    writeAuditRecord({
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      event_type: 'session.not_found',
      ip_address: ip,
    });
    const err: ErrorResponse = {
      error: 'Session not found or expired',
      code: 'SESSION_NOT_FOUND',
    };
    res.status(404).json(err);
    return;
  }

  writeAuditRecord({
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    event_type: 'session.manifest_retrieved',
    manifest_hash: session.manifest_hash,
    pipeline_id: session.pipeline_id,
    pack_id: session.pack_id,
    ip_address: ip,
  });

  const response: ManifestResponse = {
    session_id: sessionId,
    manifest: session.manifest,
    manifest_hash: session.manifest_hash,
    expires_at: session.expires_at.toISOString(),
    consumed: session.consumed,
  };

  res.json(response);
});

// ─── GET /escrow/:sessionId/modules ──────────────────────────────────────────
// Return the module bundle. Requires the one-time token. Optionally filter by
// capability tag or module id query params.

router.get('/:sessionId/modules', (req: Request, res: Response) => {
  const { sessionId } = req.params as { sessionId: string };
  const ip = req.ip ?? 'unknown';
  const { token, capability, ids } = req.query as {
    token?: string;
    capability?: string;
    ids?: string;
  };

  const session = getSession(sessionId);

  if (!session) {
    writeAuditRecord({
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      event_type: 'session.not_found',
      ip_address: ip,
    });
    const err: ErrorResponse = {
      error: 'Session not found or expired',
      code: 'SESSION_NOT_FOUND',
    };
    res.status(404).json(err);
    return;
  }

  // Token authentication (replay guard)
  if (!token || token !== session.token) {
    const err: ErrorResponse = {
      error: 'Invalid or missing token',
      code: 'INVALID_TOKEN',
    };
    res.status(401).json(err);
    return;
  }

  // Session must not already be consumed
  if (session.consumed) {
    writeAuditRecord({
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      event_type: 'session.already_consumed',
      ip_address: ip,
    });
    const err: ErrorResponse = {
      error: 'Session already consumed',
      code: 'SESSION_CONSUMED',
    };
    res.status(410).json(err);
    return;
  }

  // Optional filtering
  let modules: ModuleEntry[] = session.modules;

  if (capability) {
    modules = modules.filter((m) =>
      m.capability_tags.includes(capability)
    );
  }

  if (ids) {
    const idList = ids.split(',').map((id) => id.trim());
    modules = modules.filter((m) => idList.includes(m.module_id));
  }

  writeAuditRecord({
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    event_type: 'session.modules_retrieved',
    manifest_hash: session.manifest_hash,
    pipeline_id: session.pipeline_id,
    pack_id: session.pack_id,
    ip_address: ip,
  });

  const response: ModulesResponse = {
    session_id: sessionId,
    modules,
    retrieved_at: new Date().toISOString(),
  };

  res.json(response);
});

// ─── POST /escrow/:sessionId/consume ─────────────────────────────────────────
// Mark the session as consumed. Called by the Studio plugin after successful install.

router.post('/:sessionId/consume', (req: Request, res: Response) => {
  const { sessionId } = req.params as { sessionId: string };
  const ip = req.ip ?? 'unknown';
  const { token } = req.body as { token?: string };

  const session = getSession(sessionId);

  if (!session) {
    writeAuditRecord({
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      event_type: 'session.not_found',
      ip_address: ip,
    });
    const err: ErrorResponse = {
      error: 'Session not found or expired',
      code: 'SESSION_NOT_FOUND',
    };
    res.status(404).json(err);
    return;
  }

  // Token authentication
  if (!token || token !== session.token) {
    const err: ErrorResponse = {
      error: 'Invalid or missing token',
      code: 'INVALID_TOKEN',
    };
    res.status(401).json(err);
    return;
  }

  if (session.consumed) {
    writeAuditRecord({
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      event_type: 'session.already_consumed',
      ip_address: ip,
    });
    const err: ErrorResponse = {
      error: 'Session already consumed',
      code: 'SESSION_CONSUMED',
    };
    res.status(410).json(err);
    return;
  }

  const consumed = consumeSession(sessionId);
  if (!consumed) {
    const err: ErrorResponse = {
      error: 'Session not found or expired',
      code: 'SESSION_NOT_FOUND',
    };
    res.status(404).json(err);
    return;
  }

  writeAuditRecord({
    session_id: sessionId,
    timestamp: new Date().toISOString(),
    event_type: 'session.consumed',
    manifest_hash: session.manifest_hash,
    pipeline_id: session.pipeline_id,
    pack_id: session.pack_id,
    ip_address: ip,
  });

  const response: ConsumeResponse = {
    session_id: sessionId,
    consumed: true,
    consumed_at: consumed.consumed_at!.toISOString(),
  };

  res.json(response);
});

export default router;
