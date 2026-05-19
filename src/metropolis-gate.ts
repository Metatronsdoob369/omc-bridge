
import fs from 'fs';
import path from 'path';
import { SpectraMappingService } from './core/spectra-mapping';

export type SovereigntyTier = 'TRUSTED' | 'STAGED' | 'BREACH';

export class MetropolisGate {
    private spectra = new SpectraMappingService();
    private anchorTS: Float32Array;
    private anchorLua: Float32Array;

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

    async initialize() {
        // Initialize spectra if needed
    }

    /**
     * Tiered Resonance Audit (Sovereign Implementation)
     * Upgraded with VULN SNIPER detection layer.
     */
    async validateSovereignty(fileId: string, code: string): Promise<{ authorized: boolean; tier: SovereigntyTier; resonanceScore: number; status?: string; reason?: string }> {
        // 4. Loyalty Protocol (Canonical Context Bonus)
        const getLoyalty = (code: string) => {
            const markers = ['SafeFire', 'OMC_Bridge_', 'WaitForChild', 'capability:', 'REFRAG_SIGNATURE'];
            for (const marker of markers) {
                if (code.includes(marker)) return 0.30; // Upgraded 0.30 loyalty credit
            }
            return 0;
        };

        // 🎯 VULN SNIPER CORE (SIGNATURE STRIKE)
        const getSniperLock = (code: string): boolean => {
            // Seeding with Hacker101 canonical exploit markers
            // This will be expanded by the Living-RAG sync loop
            const signatures = [
                'eval(', 'system(', 'exec(', 'strcpy', 'strcat', 
                'os.execute', 'loadstring', 'REFRAG_SABOTAGE',
                '<script>', 'SQL_INJECTION', 'BUFFER_OVERFLOW'
            ];
            for (const sig of signatures) {
                if (code.includes(sig)) return true;
            }
            return false;
        };

        try {
            const vec = await this.spectra.vectorize(code);
            const distTS = this.calculateDistance(vec, this.anchorTS);
            const distLua = this.calculateDistance(vec, this.anchorLua);
            const heat = this.spectra.calculateHeat(vec);
            const loyalty = getLoyalty(code);
            const isSniperLock = getSniperLock(code);

            // (distTS * 0.4) + (distLua * 0.4) + (1.0 - heat) * 0.2
            let score = (distTS * 0.4) + (distLua * 0.4) + (1.0 - heat) * 0.2;
            
            // Apply Complexity Floor (Vacuity Penalty)
            if (heat < 0.15) {
                score += 0.30; // 0.30v penalty for low-complexity noise
            }

            score = Math.max(0, score - loyalty);

            // SNIPER INTERCEPT: If it's a known exploit, it's a BREACH regardless of distance
            if (isSniperLock) {
                return { 
                    authorized: false, 
                    tier: 'BREACH', 
                    resonanceScore: Math.max(score, 0.99), 
                    status: 'VULN_CLUSTER_A',
                    reason: 'Matched vulnerability signature cluster'
                };
            }

            if (score <= 0.65) {
                return { authorized: true, tier: 'TRUSTED', resonanceScore: score, status: 'TRUSTED', reason: 'Within trusted threshold' };
            } 
            
            if (score <= 0.95) {
                return { authorized: true, tier: 'STAGED', resonanceScore: score, status: 'STAGED', reason: 'Requires staged review' };
            }

            return { 
                authorized: false, 
                tier: 'BREACH', 
                resonanceScore: score, 
                status: 'BREACH',
                reason: 'Resonance exceeded breach threshold'
            };

        } catch (e: any) {
            return { authorized: false, tier: 'BREACH', resonanceScore: 999, status: "OFFLINE", reason: 'Gate offline' };
        }
    }
}
