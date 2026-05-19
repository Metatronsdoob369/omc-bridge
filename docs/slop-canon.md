# Slop Canon (Bridge Product)

Purpose: preserve failure lessons as enforceable product guardrails.

## SC-BRIDGE-001 — Hoisted Dependency Masking
- Failure: fresh clone failed because dependency was available only via upstream workspace.
- Guardrail: CI includes uncached fresh install + `npm run release`.
- Enforcement: `fresh-install` job in workflow.

## SC-BRIDGE-002 — Manifest Hash Integrity Gap
- Failure: payload acceptance without strict manifest hash integrity would allow drift.
- Guardrail: `/escrow` rejects manifest hash mismatch with `VALIDATION_ERROR` and audit record.
- Enforcement: `npm run verify` includes bad-hash replay test.

## SC-BRIDGE-003 — Base64 + SHA Replay Validation
- Failure: bad base64 or module SHA mismatch can silently poison install path.
- Guardrail: strict validation on inbound envelope and module content.
- Enforcement: `npm run verify` includes bad-base64 and bad-SHA cases.

## SC-BRIDGE-004 — Latest Session Contract Drift
- Failure: loader integration breaks when `/escrow/latest` semantics drift.
- Guardrail: latest lifecycle invariant (empty -> ready -> empty after consume).
- Enforcement: `npm run verify` asserts lifecycle contract.

## SC-BRIDGE-005 — Product Boundary Drift
- Failure: runtime paths or repo links leaking monorepo assumptions.
- Guardrail: standalone root paths + configurable repo URL.
- Enforcement: integration tests + docs + release checklist checks.

## Operational Rule

Any new production incident that reaches users must produce:
1. a new slop-canon entry,
2. a deterministic verify assertion,
3. and (if needed) a runbook update.
