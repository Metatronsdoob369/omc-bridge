/**
 * OMC Bridge Server — Schema Validator
 * Validates request payloads against the OMC JSON schemas using AJV.
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'fs';
import path from 'path';

// Resolve schema paths: src/schema-validator.ts → ../schemas/
const SCHEMAS_DIR = path.resolve(__dirname, '../schemas');

const ajv = new Ajv({ strict: false });
addFormats(ajv);

function loadSchema(filename: string): Record<string, unknown> {
  const raw = readFileSync(path.join(SCHEMAS_DIR, filename), 'utf-8');
  return JSON.parse(raw) as Record<string, unknown>;
}

// Load and compile schemas once at startup
const escrowEnvelopeSchema = loadSchema('escrow-envelope.schema.json');
const manifestSchema = loadSchema('omc.manifest.schema.json');

const validateEscrowEnvelope = ajv.compile(escrowEnvelopeSchema);
const validateManifest = ajv.compile(manifestSchema);

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate a POST /escrow request body against the escrow-envelope schema.
 * Note: session_id, token, expires_at, created_at, and consumed are server-assigned
 * and not required in the incoming request.
 */
export function validateEscrowRequest(data: unknown): ValidationResult {
  const valid = validateEscrowEnvelope(data);
  return {
    valid: !!valid,
    errors: validateEscrowEnvelope.errors
      ? validateEscrowEnvelope.errors.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e: any) => `${e.instancePath || '(root)'} ${e.message ?? 'invalid'}`
        )
      : [],
  };
}

/**
 * Validate a manifest object against the omc.manifest schema.
 */
export function validateManifestObject(data: unknown): ValidationResult {
  const valid = validateManifest(data);
  return {
    valid: !!valid,
    errors: validateManifest.errors
      ? validateManifest.errors.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (e: any) => `${e.instancePath || '(root)'} ${e.message ?? 'invalid'}`
        )
      : [],
  };
}
