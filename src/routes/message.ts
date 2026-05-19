/**
 * OMC Bridge — Message Route
 *
 * POST /message — push a message into the shared log + fire Telegram
 * GET  /message — poll recent messages (supports ?limit=N, ?for=<agent>)
 *
 * Body shape (POST):
 *   { "from": "marsh-agent", "to": "preston-agent", "body": "...", "type": "message|review|question", "topic": "optional" }
 */

import { Router, type Request, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { writeAuditRecord } from '../audit-logger';
import { requireApiKey, verifyHmac } from '../submit-auth';

const router = Router();

router.use(requireApiKey);

const BOT_TOKEN = process.env['TELEGRAM_BOT_TOKEN'] ?? '';
const CHAT_ID = process.env['TELEGRAM_CHAT_ID'] ?? '';

// Append-only message log — lives next to the bridge
const MSG_LOG = path.resolve(__dirname, '../../message-log.json');

interface BridgeMessage {
  id: string;
  timestamp: string;
  from: string;
  to: string;
  body: string;
  type: string;
  topic?: string;
}

function readLog(): BridgeMessage[] {
  try {
    return JSON.parse(fs.readFileSync(MSG_LOG, 'utf-8'));
  } catch {
    return [];
  }
}

function appendLog(msg: BridgeMessage): void {
  const log = readLog();
  log.push(msg);
  fs.writeFileSync(MSG_LOG, JSON.stringify(log, null, 2), 'utf-8');
}

async function sendTelegram(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) return false;
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'Markdown' }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ── POST /message ────────────────────────────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  const ip = req.ip ?? 'unknown';
  const { from, to, body, type, topic } = req.body as {
    from?: string;
    to?: string;
    body?: string;
    type?: string;
    topic?: string;
  };

  if (!from || !body) {
    res.status(400).json({ error: 'Missing required fields: from, body', code: 'VALIDATION_ERROR' });
    return;
  }

  const msgType = type ?? 'message';
  const recipient = to ?? 'preston-agent';
  const emoji = msgType === 'review' ? '👀' : msgType === 'question' ? '❓' : '💬';

  const msg: BridgeMessage = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    from,
    to: recipient,
    body,
    type: msgType,
    ...(topic ? { topic } : {}),
  };

  appendLog(msg);

  const telegramText = `${emoji} *OMC — ${from}* → *${recipient}*${topic ? ` \`[${topic}]\`` : ''}\n\n${body}`;
  const delivered = await sendTelegram(telegramText);

  writeAuditRecord({
    timestamp: msg.timestamp,
    event_type: 'message.received',
    ip_address: ip,
    detail: `from=${from} to=${recipient} type=${msgType} telegram=${delivered} body=${body.slice(0, 100)}`,
  });

  console.log(`[OMC Message] ${from} → ${recipient} | type=${msgType} | telegram=${delivered}`);

  res.status(200).json({ ok: true, id: msg.id, delivered_via_telegram: delivered });
});

// ── GET /message ─────────────────────────────────────────────────────────────
router.get('/', (req: Request, res: Response) => {
  const limit = Math.min(parseInt((req.query['limit'] as string) ?? '20', 10), 100);
  const forAgent = req.query['for'] as string | undefined;

  let log = readLog();

  if (forAgent) {
    log = log.filter((m) => m.to === forAgent || m.from === forAgent);
  }

  const recent = log.slice(-limit);

  res.json({ ok: true, count: recent.length, messages: recent });
});

export default router;
