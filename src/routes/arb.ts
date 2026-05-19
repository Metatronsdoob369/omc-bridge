/**
 * server/bridge/src/routes/arb.ts
 *
 * Receives processed arb results from Broseidon's arb_handler.py.
 * Logs flagged/monitor records and stores them for downstream use.
 */

import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

interface ArbResult {
  status: 'flagged' | 'monitor' | 'discard';
  heat: number;
  fragility: 'low' | 'medium' | 'high';
  brief: string;
  source?: string;
  nearestCanonicalId?: string;
}

const ARB_LOG_PATH = path.join(process.cwd(), 'arb-results.jsonl');

router.post('/', (req: Request, res: Response) => {
  const result = req.body as ArbResult;

  if (!result.status || typeof result.heat !== 'number' || !result.brief) {
    res.status(400).json({ error: 'Missing required fields: status, heat, brief' });
    return;
  }

  const entry = { ...result, receivedAt: Date.now() };

  if (result.status !== 'discard') {
    fs.appendFileSync(ARB_LOG_PATH, JSON.stringify(entry) + '\n');
    console.log(`[arb] ${result.status.toUpperCase()} heat=${result.heat.toFixed(3)} fragility=${result.fragility} — ${result.brief.substring(0, 80)}`);
  }

  res.json({ ok: true, logged: result.status !== 'discard' });
});

router.get('/results', (_req: Request, res: Response) => {
  if (!fs.existsSync(ARB_LOG_PATH)) {
    res.json({ results: [] });
    return;
  }
  const lines = fs.readFileSync(ARB_LOG_PATH, 'utf-8')
    .split('\n')
    .filter(l => l.trim())
    .map(l => JSON.parse(l));
  res.json({ results: lines, count: lines.length });
});

export default router;
