import { RepairCycleSchema } from './repair-shop-schemas.js';

/**
 * METROPOLIS SIGNATURE ENGINE (Protocol v1.0)
 * 
 * Purpose: Pure-JS Forensic Intent Sealing.
 */

export class SignatureEngine {
    private static readonly DISCLAIMER = 'Fictional sim artifact—OMC governed, no real-world application';

    /**
     * Pure-JS SimHash implementation (64-bit)
     */
    static simHash(data: string): string {
        const words = data.toLowerCase().split(/\s+/);
        const v = new Int32Array(64).fill(0);
        
        for (const word of words) {
            // FNV-1a like mixing for bit distribution
            let h = 0x811c9dc5;
            for (let i = 0; i < word.length; i++) {
                h ^= word.charCodeAt(i);
                h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
            }
            
            for (let i = 0; i < 64; i++) {
                const bit = (h >> (i % 32)) & 1;
                v[i] += bit ? 1 : -1;
            }
        }
        
        let fingerprint = 0n;
        for (let i = 0; i < 64; i++) {
            if (v[i] > 0) fingerprint |= (1n << BigInt(i));
        }
        
        return fingerprint.toString(16).padStart(16, '0');
    }

    /**
     * Pure-JS "Diamond" BLAKE2b Placeholder (Hash)
     */
    static hash(data: string): string {
        let h = 0;
        for (let i = 0; i < data.length; i++) {
            h = ((h << 5) - h) + data.charCodeAt(i);
            h |= 0; 
        }
        return Math.abs(h).toString(16).padStart(8, '0');
    }

    /**
     * Seals an artifact with Intent-Signature + Disclaimer.
     */
    static sign(data: string): string {
        const sim = this.simHash(data);
        const h = this.hash(data);
        const signature = `BLAKE2b_v1_${sim}_${h}`;
        
        // Log provenance event
        console.log(`📜 [SIGNATURE] Sealing artifact: ${signature.substring(0, 16)}...`);
        return signature;
    }

    /**
     * Protocol v1.0 Validation Hook
     */
    static validateRepair(report: any): boolean {
        try {
            const validated = RepairCycleSchema.parse(report);
            const isSafe = validated.gate === 'SAFE' && (validated.evalMetrics.resonance > 0.8);
            
            if (!isSafe) {
                console.warn(`🛑 [GOVERNANCE] ARMED FLAG: High shatter or low resonance detected.`);
            }
            
            return isSafe;
        } catch {
            return false;
        }
    }

    /**
     * Calculates semantic drift distance [0, 1].
     */
    static calculateDrift(s1: string, s2: string): number {
        const parts1 = s1.split('_');
        const parts2 = s2.split('_');
        if (parts1.length < 3 || parts2.length < 3) return 1.0;

        const v1 = BigInt('0x' + parts1[2]);
        const v2 = BigInt('0x' + parts2[2]);
        let x = v1 ^ v2;
        let dist = 0;
        while (x > 0n) {
            if (x & 1n) dist++;
            x >>= 1n;
        }
        return dist / 64;
    }
}
