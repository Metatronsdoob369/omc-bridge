/**
 * OMC Bridge Server — Audit Logger
 * Writes JSONL audit records to stdout and optionally to a file.
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import type { AuditRecord } from './types';

const LOG_FILE = process.env['OMC_AUDIT_LOG']
  ?? path.join(os.tmpdir(), 'omc-bridge-audit.jsonl');

let fileStream: fs.WriteStream | null = null;

function getStream(): fs.WriteStream {
  if (!fileStream) {
    fileStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });
  }
  return fileStream;
}

/**
 * Write an audit record to stdout (always) and to a JSONL file (when OMC_AUDIT_LOG is set
 * or the default temp path is writable).
 */
export function writeAuditRecord(record: AuditRecord): void {
  const line = JSON.stringify(record);

  // Always emit to stdout
  process.stdout.write(line + '\n');

  // Write to file (best-effort)
  try {
    getStream().write(line + '\n');
  } catch {
    // Non-fatal: file logging failure should not crash the server
  }
}

export function getAuditLogPath(): string {
  return LOG_FILE;
}
