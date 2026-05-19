/**
 * Spectra-Mapping Service: A-MEM 3072-D Topological Analytics
 * Architectures: Manhattan Resonance (Heat) & Euclidean Variance (Shatter)
 *
 * SOVEREIGN ENGINE: All embeddings run LOCAL via Ollama (mxbai-embed-large).
 * Nothing leaves the box. Derived from refrag3072.ts architecture.
 */
export interface SpectraPoint3072 {
    id: string;
    source: string;
    heat: number;
    shatter: number;
    coordinates: [number, number, number];
    stable: boolean;
}
export declare class SpectraMappingService {
    private readonly DIMENSIONS;
    private readonly OLLAMA_URL;
    private readonly OLLAMA_MODEL;
    private readonly STABLE_CENTROID;
    /**
     * Check if Ollama is alive on 127.0.0.1.
     */
    private getPrimaryEngine;
    /**
     * Generates a normalized 3072-D vector for a code block.
     * SOVEREIGN: Ollama local-only. Nothing leaves the box.
     * UPGRADE: Handles massive files via Recursive Resonance Chunking.
     */
    vectorize(code: string): Promise<Float32Array>;
    private normalize;
    private localHoldPattern;
    calculateHeat(vec: Float32Array): number;
    calculateShatter(vec: Float32Array): number;
    mapBatch(scripts: {
        id: string;
        code: string;
    }[]): Promise<any[]>;
}
//# sourceMappingURL=spectra-mapping.d.ts.map