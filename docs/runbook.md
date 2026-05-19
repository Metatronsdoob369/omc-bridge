# omc-bridge — Runbook

Sovereign escrow, governance gate, and telemetry server for the Open Model Contracts pipeline.

---

## Install

```bash
git clone https://github.com/Metatronsdoob369/omc-bridge.git
cd omc-bridge
npm install
cp .env.example .env
# edit .env — set PORT, OMC_AUDIT_LOG, QDRANT_URL as needed
```

---

## Boot

```bash
# Development (hot-reload)
npm run dev

# Production
npm start
```

Default port: `3099`. Override with `PORT=XXXX npm start`.

---

## Verify

Run the full headless harness (no Roblox Studio required):

```bash
npm run verify
```

What it asserts:
- Schema contract validation (valid and invalid escrow envelopes)
- Governance gate logic: TRUSTED / STAGED / BREACH / vacuity / slop-penalty
- API replay: bad base64 → 400, SHA mismatch → 400, good escrow → 201
- Telemetry trajectory: t_start / t_minus_1 / t frames received and logged
- Audit log: `session.created` and `validation.failed` records present

---

## Release

```bash
# Run typecheck + verify + build locally before tagging
npm run release

# Tag and push — CI creates the GitHub Release automatically
git tag v1.0.1
git push origin v1.0.1
```

---

## HTTP Surface

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/health` | Liveness check — returns `{ status: "ok" }` |
| `POST` | `/escrow` | Submit a new escrow envelope. Returns `{ session_id, token }` |
| `GET` | `/escrow/:id/modules` | Retrieve modules for a session (requires `?token=`) |
| `POST` | `/escrow/:id/consume` | Mark a session consumed. Requires `{ token }` body |
| `POST` | `/telemetry` | Log a trajectory-shaped telemetry record |
| `POST` | `/submit` | Submit-auth endpoint |
| `POST` | `/arb` | Arbitration endpoint |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3099` | HTTP listen port |
| `OMC_AUDIT_LOG` | `./bridge.log` | Append-only JSONL audit log path |
| `QDRANT_URL` | `http://127.0.0.1:6333` | Qdrant vector store (governance gate). Empty = disabled |

---

## Schemas

Bundled in `schemas/`:

- `escrow-envelope.schema.json` — validates `POST /escrow` payloads, including `module.spectral` and `tFrame`
- `omc.manifest.schema.json` — validates manifest objects embedded in escrow envelopes

These are the sole external contract surface. Consumers must conform to these schemas.

---

## Audit Log Format

Every significant event is appended to `OMC_AUDIT_LOG` as a JSONL record. Key event types:

| `event_type` | When |
|---|---|
| `session.created` | Escrow accepted, session opened |
| `session.consumed` | Session token consumed |
| `validation.failed` | Schema or SHA check failed |
| `TELEMETRY_TRAJECTORY` | Telemetry frame received |

---

## Versioning

`MAJOR.MINOR.PATCH` — semver. Tag `vX.Y.Z` on `main` to trigger a GitHub Release. The release job runs `typecheck + verify + build` before publishing.
