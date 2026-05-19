/**
 * OMC Bridge Server — Types
 * Shared TypeScript interfaces for the escrow pipeline.
 */

// ─── Module Entry ────────────────────────────────────────────────────────────

export type TemporalFrame = 't_start' | 't_minus_1' | 't';

export interface ModuleSpectralSignals {
  heat: number;
  shatter: number;
  shatterMap: number[];
  nearestCanonicalId: string | null;
  nearestCanonicalScore: number | null;
  room: string;
  embeddingModel: string;
  vectorDim: number;
  tFrame: TemporalFrame;
}

export interface ModuleEntry {
  module_id: string;
  name: string;
  /** Base64-encoded Luau source content */
  content: string;
  /** Hex SHA-256 of decoded content */
  sha256: string;
  capability_tags: string[];
  spectral?: ModuleSpectralSignals;
  target_path?: string;
  description?: string;
}

// ─── Escrow Session ──────────────────────────────────────────────────────────

export interface EscrowSession {
  session_id: string;
  token: string;
  pipeline_id: string;
  manifest_hash: string;
  ttl_seconds: number;
  expires_at: Date;
  created_at: Date;
  pack_id?: string;
  pack_version?: string;
  capability_tags: string[];
  modules: ModuleEntry[];
  manifest: Record<string, unknown>;
  metadata?: Record<string, string | number | boolean>;
  consumed: boolean;
  consumed_at?: Date;
}

// ─── POST /escrow Request Body ───────────────────────────────────────────────

export interface CreateEscrowRequest {
  schema_version: string;
  pipeline_id: string;
  manifest_hash: string;
  manifest: Record<string, unknown>;
  ttl_seconds: number;
  modules: ModuleEntry[];
  capability_tags: string[];
  pack_id?: string;
  pack_version?: string;
  metadata?: Record<string, string | number | boolean>;
}

// ─── API Responses ───────────────────────────────────────────────────────────

export interface CreateEscrowResponse {
  session_id: string;
  token: string;
  expires_at: string;
  created_at: string;
}

export interface ManifestResponse {
  session_id: string;
  manifest: Record<string, unknown>;
  manifest_hash: string;
  expires_at: string;
  consumed: boolean;
}

export interface ModulesResponse {
  session_id: string;
  modules: ModuleEntry[];
  retrieved_at: string;
}

export interface ConsumeResponse {
  session_id: string;
  consumed: boolean;
  consumed_at: string;
}

export interface ErrorResponse {
  error: string;
  code: string;
}

// ─── Audit Events ────────────────────────────────────────────────────────────

export type AuditEventType =
  | 'session.created'
  | 'session.manifest_retrieved'
  | 'session.modules_retrieved'
  | 'session.consumed'
  | 'session.expired'
  | 'session.not_found'
  | 'session.already_consumed'
  | 'governance.violation'
  | 'validation.failed'
  | 'message.received'
  | 'submit.success'
  | 'submit.error';

export interface AuditRecord {
  session_id?: string;
  timestamp: string;
  event_type: AuditEventType;
  manifest_hash?: string;
  pipeline_id?: string;
  pack_id?: string;
  ip_address?: string;
  detail?: string;
}
