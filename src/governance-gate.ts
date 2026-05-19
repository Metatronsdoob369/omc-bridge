
import fs from 'fs';
import path from 'path';
import { SpectraMappingService } from './core/spectra-mapping';
import type { ModuleSpectralSignals } from './types';

export type SovereigntyTier = 'TRUSTED' | 'STAGED' | 'BREACH';
interface SlopHit {
    score: number;
    payload?: {
        sc_id?: string;
        title?: string;
    };
}

interface SovereigntyReport {
    authorized: boolean;
    tier: SovereigntyTier;
    resonanceScore: number;
    status?: string;
    reason: string;
    reasonTags: string[];
}

export class GovernanceGate {
    private spectra = new SpectraMappingService();
    private anchorTS: Float32Array;
    private anchorLua: Float32Array;
    private readonly QDRANT_URL = process.env['QDRANT_URL'] ?? 'http://127.0.0.1:6340';
    private readonly SLOP_COLLECTION = 'slop-canon';
    private readonly SLOP_MATCH_THRESHOLD = 0.88;

    constructor() {
        // __dirname at runtime = server/bridge/dist; anchors live at server/bridge/
        this.anchorTS = new Float32Array(JSON.parse(fs.readFileSync(path.join(__dirname, '../anchor_ts.json'), 'utf-8')));
        this.anchorLua = new Float32Array(JSON.parse(fs.readFileSync(path.join(__dirname, '../anchor_lua.json'), 'utf-8')));
    }

    private calculateDistance(vec: Float32Array, anchor: Float32Array): number {
        let distSq = 0;
        for (let i = 0; i < vec.length; i++) distSq += (vec[i] - anchor[i]) ** 2;
        return Math.sqrt(distSq);
    }

    private clamp01(value: number): number {
        return Math.min(1, Math.max(0, value));
    }

    private async querySlopCanon(vec: Float32Array): Promise<SlopHit[]> {
        try {
            // slop-canon is 1024-D in this repo's ingest pipeline.
            const projected = Array.from(vec.slice(0, 1024));
            const res = await fetch(`${this.QDRANT_URL}/collections/${this.SLOP_COLLECTION}/points/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    vector: projected,
                    limit: 3,
                    with_payload: true,
                }),
            });
            if (!res.ok) return [];
            const json = await res.json() as { result?: SlopHit[] };
            return json.result ?? [];
        } catch {
            return [];
        }
    }

    async initialize() {
        // Initialize spectra if needed
    }

    /**
     * Tiered Resonance Audit (Sovereign Implementation)
     */
    async validateSovereignty(fileId: string, code: string, spectral?: ModuleSpectralSignals): Promise<SovereigntyReport> {
        // Loyalty Protocol (Canonical Context Bonus)
        const getLoyalty = (code: string) => {
            const markers = ['SafeFire', 'OMC_Bridge_', 'WaitForChild', 'capability:', 'REFRAG_SIGNATURE'];
            for (const marker of markers) {
                if (code.includes(marker)) return 0.30; // Upgraded 0.30 loyalty credit
            }
            return 0;
        };

        try {
            const vec = await this.spectra.vectorize(code);
            const distTS = this.calculateDistance(vec, this.anchorTS);
            const distLua = this.calculateDistance(vec, this.anchorLua);
            const localHeat = this.spectra.calculateHeat(vec);
            const localShatter = this.spectra.calculateShatter(vec);
            const effectiveHeat = spectral?.heat ?? localHeat;
            const effectiveShatter = spectral?.shatter ?? this.clamp01(localShatter / 1.5);
            const loyalty = getLoyalty(code);

            // Normalize anchor drift to 0..1
            const anchorRaw = (distTS * 0.4) + (distLua * 0.4) + (1.0 - localHeat) * 0.2;
            const anchorScore = this.clamp01(anchorRaw / 1.2);
            const shatterScore = this.clamp01(effectiveShatter);
            const canonicalMissScore = this.clamp01(1 - (spectral?.nearestCanonicalScore ?? 0));

            // Blended sovereignty score:
            // 0.45 anchor score + 0.35 shatter score + 0.20 canonical miss score.
            let score = (anchorScore * 0.45) + (shatterScore * 0.35) + (canonicalMissScore * 0.20);

            const reasonTags: string[] = [
                `anchor=${anchorScore.toFixed(3)}`,
                `shatter=${shatterScore.toFixed(3)}`,
                `canonicalMiss=${canonicalMissScore.toFixed(3)}`
            ];
            
            // Apply Complexity Floor (Vacuity Penalty)
            if (effectiveHeat < 0.15) {
                score += 0.30; // 0.30v penalty for low-complexity noise
                reasonTags.push('vacuity_penalty=0.300');
            }

            // SLOP_AVOIDANCE: if similar to known slop-canon failure entries, penalize.
            const slopHits = await this.querySlopCanon(vec);
            const matchedSlop = slopHits.filter(hit => hit.score >= this.SLOP_MATCH_THRESHOLD);
            if (matchedSlop.length > 0) {
                score += 0.20;
                const slopTags = matchedSlop.map((hit) => hit.payload?.sc_id ?? 'unknown_slop');
                reasonTags.push(`slop_penalty=0.200`);
                reasonTags.push(`slop_hits=${slopTags.join(',')}`);
            }

            score = Math.max(0, score - loyalty);
            reasonTags.push(`loyalty_credit=${loyalty.toFixed(3)}`);

            const reason = reasonTags.join(' | ');

            if (score <= 0.65) {
                return {
                    authorized: true,
                    tier: 'TRUSTED',
                    resonanceScore: score,
                    status: 'TRUSTED',
                    reason,
                    reasonTags
                };
            } 
            
            if (score <= 0.95) {
                return {
                    authorized: true,
                    tier: 'STAGED',
                    resonanceScore: score,
                    status: 'STAGED',
                    reason,
                    reasonTags
                };
            }

            return { 
                authorized: false, 
                tier: 'BREACH', 
                resonanceScore: score, 
                status: 'BREACH',
                reason,
                reasonTags
            };

        } catch {
            return {
                authorized: false,
                tier: 'BREACH',
                resonanceScore: 999,
                status: 'OFFLINE',
                reason: 'Governance gate offline',
                reasonTags: ['governance_offline']
            };
        }
    }
}
