import { Router } from 'express';
import fs from 'fs';
import { getAuditLogPath } from '../audit-logger';

const router = Router();

interface TelemetrySpectral {
    heat?: number;
    shatter?: number;
    shatterMap?: number[];
    nearestCanonicalId?: string | null;
    nearestCanonicalScore?: number | null;
    room?: string;
    embeddingModel?: string;
    vectorDim?: number;
    tFrame?: 't_start' | 't_minus_1' | 't';
}

interface TrajectoryPayload {
    session_id?: string;
    module_id?: string;
    tFrame?: 't_start' | 't_minus_1' | 't';
    spectral?: TelemetrySpectral;
    gate_decision?: 'TRUSTED' | 'STAGED' | 'BREACH' | 'OFFLINE';
    repair_applied?: string | null;
    post_outcome?: {
        status?: 'pass' | 'fail' | 'degraded';
        latency_ms?: number;
        notes?: string;
    };
    [key: string]: unknown;
}

router.post('/', (req, res) => {
    const payload = req.body as TrajectoryPayload;
    const trajectory = {
        session_id: payload.session_id ?? null,
        module_id: payload.module_id ?? null,
        tFrame: payload.tFrame ?? payload.spectral?.tFrame ?? null,
        spectral: payload.spectral ?? null,
        gate_decision: payload.gate_decision ?? null,
        repair_applied: payload.repair_applied ?? null,
        post_outcome: payload.post_outcome ?? null,
    };

    const logEntry = {
        timestamp: new Date().toISOString(),
        event_type: 'TELEMETRY_TRAJECTORY',
        ...trajectory,
        raw_payload: payload,
    };

    // Persist trajectory records for state-transition adjudication.
    fs.appendFileSync(getAuditLogPath(), JSON.stringify(logEntry) + '\n');
    
    console.log(
        `[OMC Telemetry] Trajectory session=${trajectory.session_id ?? 'n/a'} module=${trajectory.module_id ?? 'n/a'} gate=${trajectory.gate_decision ?? 'n/a'}`
    );
    res.json({ success: true, event_type: logEntry.event_type });
});

export default router;
