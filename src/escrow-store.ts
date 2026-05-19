/**
 * OMC Bridge Server — In-Memory Escrow Store
 * Stores escrow sessions with TTL enforcement.
 */

import type { EscrowSession } from './types';

const sessions = new Map<string, EscrowSession>();

/**
 * Store a new escrow session.
 */
export function createSession(session: EscrowSession): void {
  sessions.set(session.session_id, session);
}

/**
 * Retrieve a session. Returns undefined if not found or expired.
 * Expired sessions are deleted on access.
 */
export function getSession(sessionId: string): EscrowSession | undefined {
  const session = sessions.get(sessionId);
  if (!session) return undefined;

  if (new Date() > session.expires_at) {
    sessions.delete(sessionId);
    return undefined;
  }

  return session;
}

/**
 * Mark a session as consumed.
 */
export function consumeSession(sessionId: string): EscrowSession | undefined {
  const session = getSession(sessionId);
  if (!session) return undefined;

  session.consumed = true;
  session.consumed_at = new Date();
  sessions.set(sessionId, session);
  return session;
}

/**
 * Delete a session by id. Used for cleanup.
 */
export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId);
}

/**
 * Return the current number of active (non-expired) sessions.
 */
export function activeSessions(): number {
  const now = new Date();
  let count = 0;
  for (const [id, session] of sessions) {
    if (now > session.expires_at) {
      sessions.delete(id);
    } else {
      count++;
    }
  }
  return count;
}
