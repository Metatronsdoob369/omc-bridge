# omc-bridge Release Checklist

Run this for every release. Check each item before pushing the tag.

---

## Pre-release

- [ ] **Fresh clone verify** — automated by the `fresh-install` CI job (no cache, `npm install`, `npm run release`). Confirm it is green before tagging. To run locally:
  ```bash
  tmp=$(mktemp -d) && git clone https://github.com/Metatronsdoob369/omc-bridge "$tmp/omc-bridge" \
    && cd "$tmp/omc-bridge" && npm install && npm run release
  ```
- [ ] **Offline verify** — `npm run verify` passes with no external services running (Qdrant, Roblox Studio, Docker all stopped).
- [ ] **Zero monorepo references in src/** — `grep -r "open-model-contracts" src/` returns nothing.
- [ ] **Schema $id namespace check** — `schemas/*.json` use `open-model-contracts.dev` namespace (intentional contract identity — not a leak).
- [ ] **Env vars documented** — every `process.env.*` reference in `src/` has a corresponding entry in `.env.example`.
- [ ] **README matches reality** — API routes, env vars, and verify/release commands in README are accurate for this version.

---

## Tag and push

- [ ] **Bump version** in `package.json` to the target version (e.g. `1.0.1`).
- [ ] **Commit the bump** — `git commit -am "chore: bump version to v1.0.1"`.
- [ ] **Tag the exact release commit**:
  ```bash
  git tag v1.0.1
  git push origin v1.0.1
  ```
- [ ] **CI gate passes** — confirm the tag push triggers CI and both `typecheck` and `verify` jobs go green.

---

## Post-release

- [ ] **GitHub Release published** — CI `release` job created the release at `github.com/Metatronsdoob369/omc-bridge/releases`.
- [ ] **Release notes accurate** — title is `omc-bridge vX.Y.Z`, body confirms typecheck + verify passed.
- [ ] **Landing page check** — README on `main` matches the tag: no monorepo paths, correct env var table, correct repo URLs.
- [ ] **Runbook updated** — add release entry to the table below.

---

## Lessons learned

These failures have happened in real releases. They are preflight items because of that, not despite it.

| Version | What failed | Why it was silent | Fix |
|---------|-------------|-------------------|-----|
| v1.0.1 | `zod` missing from `package.json` | Monorepo's hoisted `node_modules` covered it locally — typecheck passed in-tree, failed on fresh clone | Added `zod` as an explicit dependency. Fresh-clone step in pre-release is the only reliable catch for this class of failure. |

**The rule:** If a package is imported in `src/`, it must be in `dependencies` or `devDependencies`. Hoisted deps from a parent workspace are invisible to consumers. The `fresh-install` CI job enforces this automatically — it runs `npm install` with no cache on every push, which is the only environment that behaves like a real consumer.

---

## Release log

| Version | Date | Commit SHA | Notes |
|---------|------|-----------|-------|
| v1.0.0 | 2026-05-19 | 36cd61b | Initial standalone extraction from open-model-contracts monorepo |
| v1.0.1 | 2026-05-19 | 3402d9f | Add zod dep, release checklist, submit.ts monorepo fixes |
