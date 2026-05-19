# omc-bridge

Sovereign escrow, governance gate, and telemetry server for the Open Model Contracts (OMC) pipeline.

Handles Phase 2 of the Intelligence → Escrow → Manifestation flow: receives signed code bundles from a specialist agent, validates them against the OMC schema contract, runs the governance gate, and holds the session until the runtime consumes it.

---

## Install

```bash
git clone https://github.com/Metatronsdoob369/omc-bridge.git
cd omc-bridge
npm install
cp .env.example .env
# edit .env as needed — defaults work for local development
```

## Quick demo

```bash
# 1. Start
npm start

# 2. Health check
curl http://localhost:3099/health
# {"status":"ok"}

# 3. Submit a code bundle — governance gate fires, session opened
curl -X POST http://localhost:3099/escrow \
  -H "Content-Type: application/json" \
  -d @test/fixtures/good-escrow.json
# {"session_id":"...","token":"...","expires_at":"...","created_at":"..."}

# 4. Retrieve the modules (runtime side)
curl "http://localhost:3099/escrow/<session_id>/modules?token=<token>"

# 5. Inspect the audit trail
cat bridge.log
```

---

## Boot

```bash
npm run dev    # development, hot-reload
npm start      # production
```

Default port: `3099`. Override with `PORT=XXXX npm start`.

---

## HTTP API

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/health` | Liveness — returns `{ status: "ok" }` |
| `POST` | `/escrow` | Submit an escrow envelope. Returns `{ session_id, token }` |
| `GET` | `/escrow/:id/modules` | Retrieve modules for a session (requires `?token=`) |
| `POST` | `/escrow/:id/consume` | Consume a session. Body: `{ token }` |
| `POST` | `/telemetry` | Log a trajectory telemetry record |
| `POST` | `/submit` | Authenticated git-free code submit (creates branch + PR) |
| `GET` | `/submit/status` | Current repo branch and last commit |

### POST /escrow — payload shape

```json
{
  "schema_version": "1.0",
  "pipeline_id": "<uuid>",
  "manifest_hash": "<sha256>",
  "manifest": { ... },
  "ttl_seconds": 120,
  "modules": [
    {
      "module_id": "architect-01",
      "name": "StructureGenerator.luau",
      "content": "<base64-encoded source>",
      "sha256": "<sha256 of decoded source>",
      "capability_tags": ["capability:client.install"],
      "spectral": {
        "heat": 0.9,
        "shatter": 0.1,
        "shatterMap": [0.1, 0.11, 0.12],
        "nearestCanonicalId": "CANON:bootstrap",
        "nearestCanonicalScore": 0.95,
        "room": "sandbox://my-project",
        "embeddingModel": "mxbai-embed-large",
        "vectorDim": 3072,
        "tFrame": "t_start"
      }
    }
  ],
  "capability_tags": ["capability:client.install"],
  "pack_id": "roblox-game-automator",
  "pack_version": "1.0.0"
}
```

Full schema: [`schemas/escrow-envelope.schema.json`](schemas/escrow-envelope.schema.json)

### POST /submit — authenticated code submit

Requires `OMC_SUBMIT_KEY` and `OMC_SUBMIT_HMAC` to be set. Creates a feature branch, commits the provided files, and pushes — returning a PR link.

```json
{
  "author": "joe wales",
  "intent": "add structure generator module",
  "files": [
    { "path": "generated/StructureGenerator.luau", "content": "-- source here" }
  ]
}
```

Files must be under `src/server/`, `src/client/`, or `generated/` — any other path is rejected with `403 UNSAFE_PATH`.

---

## Governance Gate

Every submitted module is evaluated by the governance gate before the session is accepted:

| Tier | Condition | Authorized |
|------|-----------|------------|
| `TRUSTED` | Resonance score ≤ 0.65 | Yes |
| `STAGED` | Score ≤ 0.95 | Yes (requires staged review) |
| `BREACH` | Score > 0.95 | No |

Score is influenced by spectral signals (`heat`, `shatter`, `nearestCanonicalScore`), slop-canon matches, and vacuity penalties. Reason tags are logged to the audit trail.

---

## Verification

```bash
npm run verify
```

Runs a headless harness against a live bridge subprocess — no Roblox Studio, no external services required. Asserts:

- Schema contract: valid and invalid envelope payloads
- Governance: TRUSTED / STAGED / BREACH / vacuity / slop-penalty paths
- API: bad base64 → 400, SHA mismatch → 400, good escrow → 201
- Telemetry: `t_start` / `t_minus_1` / `t` frames logged
- Audit log: `session.created` and `validation.failed` records present

---

## Release

```bash
# Validate locally first
npm run release   # typecheck → verify → build

# Tag and push — CI creates the GitHub Release automatically
git tag v1.0.1
git push origin v1.0.1
```

CI runs `typecheck + verify` on every push. The `release` job runs on `vX.Y.Z` tags and publishes a GitHub Release only after both gates pass.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3099` | HTTP listen port |
| `OMC_AUDIT_LOG` | `./bridge.log` | Append-only JSONL audit log path |
| `QDRANT_URL` | `http://127.0.0.1:6333` | Qdrant vector store for governance gate. Empty = disabled |
| `OMC_BRIDGE_REPO_URL` | `https://github.com/Metatronsdoob369/omc-bridge` | GitHub repo URL used to construct PR links from `/submit` |
| `OMC_SUBMIT_KEY` | — | API key for `/submit` authentication |
| `OMC_SUBMIT_HMAC` | — | HMAC secret for `/submit` payload signing |

---

## Audit Log

Every significant event is appended to `OMC_AUDIT_LOG` as newline-delimited JSON:

| `event_type` | Trigger |
|---|---|
| `session.created` | Escrow accepted |
| `session.consumed` | Token consumed by runtime |
| `validation.failed` | Schema or SHA check failed |
| `TELEMETRY_TRAJECTORY` | Telemetry frame received |
| `submit.success` | Code submit accepted and pushed |
| `submit.error` | Code submit failed |

---

## Schemas

Bundled in [`schemas/`](schemas/) — no external dependency at runtime:

- `escrow-envelope.schema.json` — validates `POST /escrow` payloads
- `omc.manifest.schema.json` — validates manifest objects embedded in envelopes

Schema `$id` values use the `open-model-contracts.dev` namespace as a stable contract identity. This is intentional — the namespace identifies the contract version, not the server repo.
