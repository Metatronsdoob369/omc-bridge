/**
 * OMC Bridge Server — Entry Point
 */

import express from 'express';
import escrowRouter from './routes/escrow';
import telemetryRouter from './routes/telemetry';
import submitRouter from './routes/submit';
import { getAuditLogPath } from './audit-logger';

const PORT = parseInt(process.env['PORT'] ?? '8080', 10);

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use((req, _res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.path}`);
  next();
});

app.set('trust proxy', 1);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'omc-bridge', version: '1.0.0' });
});

app.use('/escrow', escrowRouter);
app.use('/telemetry', telemetryRouter);
app.use('/submit', submitRouter);

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found', code: 'NOT_FOUND' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[OMC Bridge] listening on http://localhost:${PORT}`);
  console.log(`[OMC Bridge] audit log → ${getAuditLogPath()}`);
  console.log(`[OMC Bridge] POST /escrow          — create escrow session`);
  console.log(`[OMC Bridge] POST /telemetry       — receive telemetry pulse`);
  console.log(`[OMC Bridge] GET  /escrow/:id/manifest  — retrieve manifest`);
  console.log(`[OMC Bridge] GET  /escrow/:id/modules   — retrieve module bundle`);
  console.log(`[OMC Bridge] POST /escrow/:id/consume   — consume session`);
  console.log(`[OMC Bridge] POST /submit               — Marsh git-free submit`);
  console.log(`[OMC Bridge] GET  /submit/status        — repo status`);
});

export default app;
