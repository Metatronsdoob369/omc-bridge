import assert from 'node:assert/strict';
import { spawn, type ChildProcess } from 'node:child_process';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { GovernanceGate } from '../governance-gate';
import { validateEscrowRequest } from '../schema-validator';
import type { ModuleSpectralSignals, TemporalFrame } from '../types';

type JsonObject = Record<string, unknown>;

interface HttpResponse {
  status: number;
  json: JsonObject;
  text: string;
}

const BRIDGE_DIR = path.resolve(__dirname, '../..');
const TSX_CLI_CANDIDATES = [
  path.resolve(BRIDGE_DIR, 'node_modules/tsx/dist/cli.mjs'),
];
const TSX_CLI = TSX_CLI_CANDIDATES.find((candidate) => fs.existsSync(candidate));
const VERIFIED_PIPELINE_ID = '11111111-1111-4111-8111-111111111111';

function sha256Hex(text: string): string {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}

function base64(text: string): string {
  return Buffer.from(text, 'utf8').toString('base64');
}

function spectralSignals(tFrame: TemporalFrame, overrides?: Partial<ModuleSpectralSignals>): ModuleSpectralSignals {
  return {
    heat: 0.9,
    shatter: 0.1,
    shatterMap: [0.1, 0.11, 0.12],
    nearestCanonicalId: 'CANON:bootstrap',
    nearestCanonicalScore: 0.95,
    room: 'sandbox://bridge-verification',
    embeddingModel: 'mxbai-embed-large',
    vectorDim: 3072,
    tFrame,
    ...overrides,
  };
}

function buildEscrowPayload(options?: {
  code?: string;
  content?: string;
  sha?: string;
  tFrame?: TemporalFrame;
  spectral?: ModuleSpectralSignals;
}): JsonObject {
  const code = options?.code ?? "local x = 1\nprint('bridge verification', x)\n";
  const content = options?.content ?? base64(code);
  const digest = options?.sha ?? sha256Hex(code);
  const tFrame = options?.tFrame ?? 't_start';
  const spectral = options?.spectral ?? spectralSignals(tFrame);

  const manifest = {
    schema_version: '1.0',
    pack_id: 'roblox-game-automator',
    pack_version: '1.0.0',
    pipeline_id: VERIFIED_PIPELINE_ID,
    created_at: '2026-05-19T00:00:00.000Z',
    files: [
      {
        path: 'generated/StructureGenerator.luau',
        type: 'luau_module',
        sha256: digest,
      },
    ],
  };

  return {
    schema_version: '1.0',
    pipeline_id: VERIFIED_PIPELINE_ID,
    manifest_hash: sha256Hex(JSON.stringify(manifest)),
    manifest,
    ttl_seconds: 120,
    modules: [
      {
        module_id: 'architect-01',
        name: 'StructureGenerator.luau',
        content,
        sha256: digest,
        capability_tags: ['capability:client.install'],
        spectral,
      },
    ],
    capability_tags: ['capability:client.install'],
    pack_id: 'roblox-game-automator',
    pack_version: '1.0.0',
    metadata: {
      scenario: 'bridge-verification',
      run_mode: 'headless',
    },
  };
}

function parseJsonLines(filePath: string): JsonObject[] {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  if (!raw) return [];
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line) as JsonObject);
}

async function requestJson(baseUrl: string, route: string, init?: RequestInit): Promise<HttpResponse> {
  const response = await fetch(`${baseUrl}${route}`, init);
  const text = await response.text();
  let json: JsonObject = {};
  if (text.length > 0) {
    try {
      json = JSON.parse(text) as JsonObject;
    } catch {
      json = { raw: text };
    }
  }
  return {
    status: response.status,
    json,
    text,
  };
}

async function waitForHealth(baseUrl: string, maxAttempts = 60): Promise<void> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`${baseUrl}/health`);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`Bridge server did not become healthy at ${baseUrl}`);
}

function startBridge(port: number, auditLogPath: string): ChildProcess {
  if (!TSX_CLI) {
    throw new Error('Unable to locate tsx CLI binary for bridge subprocess');
  }

  const child = spawn(process.execPath, [TSX_CLI, 'src/index.ts'], {
    cwd: BRIDGE_DIR,
    env: {
      ...process.env,
      PORT: String(port),
      OMC_AUDIT_LOG: auditLogPath,
      QDRANT_URL: 'http://127.0.0.1:0',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  child.stdout?.on('data', (chunk: Buffer) => {
    process.stdout.write(`[bridge] ${chunk.toString()}`);
  });

  child.stderr?.on('data', (chunk: Buffer) => {
    process.stderr.write(`[bridge:err] ${chunk.toString()}`);
  });

  child.on('error', (error) => {
    process.stderr.write(`[bridge:spawn-error] ${error.message}\n`);
  });

  return child;
}

async function stopBridge(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null || child.killed) return;
  child.kill('SIGTERM');
  await new Promise<void>((resolve) => {
    const timeout = setTimeout(() => {
      if (child.exitCode === null) child.kill('SIGKILL');
      resolve();
    }, 3000);
    child.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

async function runGovernanceChecks(): Promise<void> {
  const gate = new GovernanceGate();
  const gatePatch = gate as unknown as {
    spectra: {
      vectorize: (code: string) => Promise<Float32Array>;
      calculateHeat: (vec: Float32Array) => number;
      calculateShatter: (vec: Float32Array) => number;
    };
    calculateDistance: (vec: Float32Array, anchor: Float32Array) => number;
    querySlopCanon: (vec: Float32Array) => Promise<Array<{ score: number; payload?: { sc_id?: string } }>>;
  };

  const vec = new Float32Array(3072);
  vec[0] = 1;
  gatePatch.spectra = {
    vectorize: async () => vec,
    calculateHeat: () => 0.9,
    calculateShatter: () => 0.1,
  };

  gatePatch.querySlopCanon = async () => [];
  gatePatch.calculateDistance = () => 0;

  const trusted = await gate.validateSovereignty('trusted-module', 'local trusted = true', spectralSignals('t_start', {
    heat: 0.9,
    shatter: 0.1,
    nearestCanonicalScore: 1,
  }));
  assert.equal(trusted.tier, 'TRUSTED');
  assert.equal(trusted.authorized, true);

  gatePatch.calculateDistance = () => 2;
  const staged = await gate.validateSovereignty('staged-module', 'local staged = true', spectralSignals('t_start', {
    heat: 0.9,
    shatter: 0.4,
    nearestCanonicalScore: 0.5,
  }));
  assert.equal(staged.tier, 'STAGED');
  assert.equal(staged.authorized, true);

  const breach = await gate.validateSovereignty('breach-module', 'local breach = true', spectralSignals('t_start', {
    heat: 0.9,
    shatter: 1,
    nearestCanonicalScore: 0,
  }));
  assert.equal(breach.tier, 'BREACH');
  assert.equal(breach.authorized, false);

  gatePatch.calculateDistance = () => 0;
  const vacuity = await gate.validateSovereignty('vacuity-module', 'local vacuity = true', spectralSignals('t_start', {
    heat: 0.1,
    shatter: 0.1,
    nearestCanonicalScore: 1,
  }));
  assert.equal(vacuity.reasonTags.some((tag) => tag.startsWith('vacuity_penalty=')), true);

  gatePatch.calculateDistance = () => 2;
  gatePatch.querySlopCanon = async () => [{ score: 0.93, payload: { sc_id: 'SC-TEST' } }];
  const slopPenalty = await gate.validateSovereignty('slop-module', 'local slop = true', spectralSignals('t_start', {
    heat: 0.9,
    shatter: 0.8,
    nearestCanonicalScore: 0.5,
  }));
  assert.equal(slopPenalty.authorized, false);
  assert.equal(slopPenalty.reasonTags.some((tag) => tag.startsWith('slop_penalty=')), true);
}

async function run(): Promise<void> {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bridge-verification-'));
  const auditLogPath = path.join(tempDir, 'audit.jsonl');
  const port = 19000 + Math.floor(Math.random() * 1000);
  const baseUrl = `http://127.0.0.1:${port}`;
  let bridge: ChildProcess | null = null;

  try {
    // Contract-level validation
    const validEnvelope = buildEscrowPayload();
    const validationOk = validateEscrowRequest(validEnvelope);
    assert.equal(validationOk.valid, true, `Expected valid escrow envelope, got: ${validationOk.errors.join('; ')}`);

    const invalidEnvelope = { ...validEnvelope };
    delete (invalidEnvelope as { capability_tags?: unknown }).capability_tags;
    const validationFail = validateEscrowRequest(invalidEnvelope);
    assert.equal(validationFail.valid, false, 'Expected missing capability_tags to fail schema validation');

    // Governance logic checks with deterministic internals
    await runGovernanceChecks();

    // API + integration replay checks
    bridge = startBridge(port, auditLogPath);
    await waitForHealth(baseUrl);

    const latestEmpty = await requestJson(baseUrl, '/escrow/latest');
    assert.equal(latestEmpty.status, 200);
    assert.equal(latestEmpty.json.ready, false);
    assert.equal(latestEmpty.json.session_id, null);
    assert.equal(latestEmpty.json.token, null);

    const badBase64Payload = buildEscrowPayload({
      code: "print('bad base64 check')",
      content: '%%%%',
    });
    const badBase64Res = await requestJson(baseUrl, '/escrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badBase64Payload),
    });
    assert.equal(badBase64Res.status, 400);
    assert.equal(badBase64Res.json.code, 'VALIDATION_ERROR');

    const badShaPayload = buildEscrowPayload({
      code: "print('bad sha check')",
      sha: '0'.repeat(64),
    });
    const badShaRes = await requestJson(baseUrl, '/escrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(badShaPayload),
    });
    assert.equal(badShaRes.status, 400);
    assert.equal(badShaRes.json.code, 'VALIDATION_ERROR');

    const goodCode = "local SafeFire = true\nprint('good escrow payload', SafeFire)\n";
    const goodPayload = buildEscrowPayload({
      code: goodCode,
      tFrame: 't_start',
    });
    const escrowRes = await requestJson(baseUrl, '/escrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goodPayload),
    });
    assert.equal(escrowRes.status, 201, `Expected escrow success. Body: ${escrowRes.text}`);

    const sessionId = String(escrowRes.json.session_id ?? '');
    const token = String(escrowRes.json.token ?? '');
    assert.equal(sessionId.length > 0, true);
    assert.equal(token.length > 0, true);

    const latestReady = await requestJson(baseUrl, '/escrow/latest');
    assert.equal(latestReady.status, 200);
    assert.equal(latestReady.json.ready, true);
    assert.equal(latestReady.json.session_id, sessionId);
    assert.equal(latestReady.json.token, token);

    const modulesRes = await requestJson(
      baseUrl,
      `/escrow/${sessionId}/modules?token=${encodeURIComponent(token)}`
    );
    assert.equal(modulesRes.status, 200);
    assert.equal(Array.isArray(modulesRes.json.modules), true);

    const telemetryBase = {
      session_id: sessionId,
      module_id: 'architect-01',
      gate_decision: 'TRUSTED',
      repair_applied: null,
      post_outcome: {
        status: 'pass',
        latency_ms: 24,
        notes: 'bridge verification',
      },
    };

    const telemetryStart = await requestJson(baseUrl, '/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...telemetryBase,
        tFrame: 't_start',
        spectral: spectralSignals('t_start'),
      }),
    });
    assert.equal(telemetryStart.status, 200);
    assert.equal(telemetryStart.json.event_type, 'TELEMETRY_TRAJECTORY');

    await requestJson(baseUrl, '/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...telemetryBase,
        tFrame: 't_minus_1',
        spectral: spectralSignals('t_minus_1', { shatter: 0.15 }),
      }),
    });

    await requestJson(baseUrl, '/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...telemetryBase,
        tFrame: 't',
        spectral: spectralSignals('t', { shatter: 0.2 }),
      }),
    });

    const consumeRes = await requestJson(baseUrl, `/escrow/${sessionId}/consume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    assert.equal(consumeRes.status, 200);
    assert.equal(consumeRes.json.consumed, true);

    const latestAfterConsume = await requestJson(baseUrl, '/escrow/latest');
    assert.equal(latestAfterConsume.status, 200);
    assert.equal(latestAfterConsume.json.ready, false);
    assert.equal(latestAfterConsume.json.session_id, null);

    await new Promise((resolve) => setTimeout(resolve, 150));
    const auditRecords = parseJsonLines(auditLogPath);
    assert.equal(auditRecords.length > 0, true, 'Expected audit records to be written');

    const hasShaFailure = auditRecords.some(
      (entry) => entry.event_type === 'validation.failed' && String(entry.detail ?? '').includes('SHA mismatch')
    );
    assert.equal(hasShaFailure, true, 'Expected SHA mismatch validation failure in audit log');

    const hasSessionCreated = auditRecords.some((entry) => entry.event_type === 'session.created');
    assert.equal(hasSessionCreated, true, 'Expected session.created audit record');

    const telemetryRecords = auditRecords.filter((entry) => entry.event_type === 'TELEMETRY_TRAJECTORY');
    assert.equal(telemetryRecords.length >= 3, true, 'Expected at least 3 TELEMETRY_TRAJECTORY records');
    assert.equal(
      telemetryRecords.every(
        (entry) => entry.session_id === sessionId && typeof entry.tFrame === 'string' && entry.spectral !== undefined
      ),
      true,
      'Telemetry records missing expected trajectory fields'
    );

    console.log('\n[bridge-verification] PASS');
    console.log(`[bridge-verification] audited_records=${auditRecords.length}`);
    console.log(`[bridge-verification] telemetry_records=${telemetryRecords.length}`);
  } finally {
    if (bridge) {
      await stopBridge(bridge);
    }
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

run().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  console.error(`\n[bridge-verification] FAIL\n${message}`);
  process.exit(1);
});
