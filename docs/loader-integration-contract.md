# Loader Integration Contract (OMC Bridge)

This document defines the stable HTTP contract required by Studio auto-loaders.

## Required Endpoints

1. `GET /health`
- Purpose: liveness
- Success: `200` with `{ "ok": true }`

2. `GET /escrow/latest`
- Purpose: discover newest active session
- Empty state:
```json
{
  "ready": false,
  "session_id": null,
  "token": null,
  "created_at": null,
  "expires_at": null,
  "pipeline_id": null,
  "pack_id": null,
  "pack_version": null
}
```
- Ready state:
```json
{
  "ready": true,
  "session_id": "<uuid>",
  "token": "<opaque token>",
  "created_at": "<iso>",
  "expires_at": "<iso>",
  "pipeline_id": "<uuid>",
  "pack_id": "<string|null>",
  "pack_version": "<string|null>"
}
```

3. `GET /escrow/:sessionId/modules?token=...`
- Purpose: pull module bundle
- Requirements:
  - valid `sessionId`
  - matching one-time `token`
- Errors:
  - `401 INVALID_TOKEN`
  - `404 SESSION_NOT_FOUND`
  - `409 SESSION_CONSUMED`

4. `POST /escrow/:sessionId/consume`
- Purpose: close replay window after successful install
- Body:
```json
{ "token": "<opaque token>" }
```
- Success:
```json
{
  "session_id": "<uuid>",
  "consumed": true,
  "consumed_at": "<iso>"
}
```

## Lifecycle Invariant

For a single session run:
1. `/escrow/latest` is empty (`ready=false`) before create.
2. After successful `POST /escrow`, `/escrow/latest` returns created `session_id` and `token`.
3. After successful consume, `/escrow/latest` returns empty (`ready=false`) again.

This invariant is enforced by `npm run verify` in `src/verification/bridge-verification.ts`.

## Non-Goals

- Bridge does not execute Roblox code.
- Bridge does not control spawn/playability; loader/runtime owns that.
- Bridge guarantees escrow integrity, governance adjudication, telemetry capture, and auditability.
