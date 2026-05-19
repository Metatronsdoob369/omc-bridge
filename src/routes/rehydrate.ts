import { Router } from 'express';

const rehydrateRouter = Router();

// ── Part F: The Manifest Vault ─────────────────────────────────────────────
interface ManifestEscrow {
    id: string;
    timestamp: number;
    hash: string;
    content: any;
}

let manifestVault: ManifestEscrow[] = [];

rehydrateRouter.post('/', (req, res) => {
  const manifest = req.body;
  
  if (!manifest || !manifest.metadata || !manifest.metadata.hash) {
    return res.status(400).json({ error: 'Invalid manifest: missing metadata or integrity hash', code: 'INVALID_MANIFEST' });
  }

  const escrow: ManifestEscrow = {
    id: manifest.metadata.id,
    timestamp: Date.now(),
    hash: manifest.metadata.hash,
    content: manifest
  };

  console.log(`🏮 [BRIDGE-VAULT] Escrowing Manifest: ${manifest.metadata.name} (Hash: ${escrow.hash.substring(0,8)}...)`);
  
  // Keep the history capped at 10 for prototype
  manifestVault.unshift(escrow);
  if (manifestVault.length > 10) manifestVault.pop();

  res.json({ status: 'ok', id: escrow.id, hash: escrow.hash });
});

rehydrateRouter.get('/latest', (_req, res) => {
  if (manifestVault.length === 0) {
    return res.status(404).json({ error: 'No manifest found', code: 'NO_MANIFEST' });
  }

  res.json(manifestVault[0].content);
});

rehydrateRouter.get('/history', (_req, res) => {
  res.json(manifestVault.map(m => ({ id: m.id, timestamp: m.timestamp, hash: m.hash })));
});

// ── Part G: The Inspector (Audit) Artery ──────────────────────────────────
let latestAudit: any = null;

rehydrateRouter.post('/audit', (req, res) => {
  const audit = req.body;
  
  if (!audit || !audit.actualHash) {
    return res.status(400).json({ error: 'Invalid audit: missing actualHash', code: 'INVALID_AUDIT' });
  }

  console.log(`🔍 [BRIDGE-INSPECTOR] Receiving Audit for Hash: ${audit.actualHash.substring(0,8)}...`);
  
  const expected = manifestVault.find(m => m.hash === audit.expectedHash);
  if (expected) {
      if (audit.actualHash === audit.expectedHash) {
          console.log("✅ [BRIDGE-INSPECTOR] 1:1 MATCH CONFIRMED. No drift detected.");
          audit.status = "Diamond-Stable";
      } else {
          console.warn("⚠️ [BRIDGE-INSPECTOR] SHATTER VARIANCE DETECTED. Studio state has drifted.");
          audit.status = "Drift-Detected";
      }
  }

  latestAudit = audit;
  res.json({ status: 'ok', auditStatus: audit.status });
});

rehydrateRouter.get('/audit/latest', (_req, res) => {
    if (!latestAudit) return res.status(404).json({ error: 'No audit found' });
    res.json(latestAudit);
});

rehydrateRouter.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Sovereign Bridge', timestamp: Date.now() });
});

export default rehydrateRouter;
