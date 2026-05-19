import { z } from 'zod';
/**
 * METROPOLIS REPAIR SHOP SCHEMAS (Diamond-Stable)
 * Aligned with Open Model Contracts (OMC) Governance.
 */
export declare const OMCProvenanceSchema: z.ZodObject<{
    intentSignature: z.ZodString;
    gate: z.ZodEnum<["SAFE", "ARMED"]>;
    disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
    humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
}, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired?: boolean | undefined;
}>;
export declare const SpatialMapSchema: z.ZodObject<{
    intentSignature: z.ZodString;
    gate: z.ZodEnum<["SAFE", "ARMED"]>;
    disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
    humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
} & {
    domain: z.ZodLiteral<"spatial">;
    layoutVectors: z.ZodArray<z.ZodNumber, "many">;
    shatterVariance: z.ZodNumber;
    hotspots: z.ZodArray<z.ZodObject<{
        pos: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
        lagMs: z.ZodNumber;
        provenance: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pos: [number, number];
        lagMs: number;
        provenance: string;
    }, {
        pos: [number, number];
        lagMs: number;
        provenance: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
    domain: "spatial";
    layoutVectors: number[];
    shatterVariance: number;
    hotspots: {
        pos: [number, number];
        lagMs: number;
        provenance: string;
    }[];
}, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    domain: "spatial";
    layoutVectors: number[];
    shatterVariance: number;
    hotspots: {
        pos: [number, number];
        lagMs: number;
        provenance: string;
    }[];
    humanReviewRequired?: boolean | undefined;
}>;
export declare const StructuralMapSchema: z.ZodObject<{
    intentSignature: z.ZodString;
    gate: z.ZodEnum<["SAFE", "ARMED"]>;
    disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
    humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
} & {
    domain: z.ZodLiteral<"structural">;
    graphNodes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["core", "ui", "asset", "logic"]>;
        integralScore: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "core" | "ui" | "asset" | "logic";
        integralScore: number;
    }, {
        id: string;
        type: "core" | "ui" | "asset" | "logic";
        integralScore: number;
    }>, "many">;
    dependencies: z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodString], null>, "many">;
    glitches: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["1-shot", "flow-break", "dependency-cycle"]>;
        severity: z.ZodNumber;
        repairGuidance: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: "1-shot" | "flow-break" | "dependency-cycle";
        severity: number;
        repairGuidance: string;
    }, {
        id: string;
        type: "1-shot" | "flow-break" | "dependency-cycle";
        severity: number;
        repairGuidance: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
    domain: "structural";
    graphNodes: {
        id: string;
        type: "core" | "ui" | "asset" | "logic";
        integralScore: number;
    }[];
    dependencies: [string, string][];
    glitches: {
        id: string;
        type: "1-shot" | "flow-break" | "dependency-cycle";
        severity: number;
        repairGuidance: string;
    }[];
}, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    domain: "structural";
    graphNodes: {
        id: string;
        type: "core" | "ui" | "asset" | "logic";
        integralScore: number;
    }[];
    dependencies: [string, string][];
    glitches: {
        id: string;
        type: "1-shot" | "flow-break" | "dependency-cycle";
        severity: number;
        repairGuidance: string;
    }[];
    humanReviewRequired?: boolean | undefined;
}>;
export declare const ResearchMapSchema: z.ZodObject<{
    intentSignature: z.ZodString;
    gate: z.ZodEnum<["SAFE", "ARMED"]>;
    disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
    humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
} & {
    domain: z.ZodLiteral<"research">;
    embeddedDocs: z.ZodArray<z.ZodNumber, "many">;
    resonanceScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    patterns: z.ZodArray<z.ZodString, "many">;
    sourceProvenance: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
    domain: "research";
    embeddedDocs: number[];
    resonanceScores: Record<string, number>;
    patterns: string[];
    sourceProvenance: string[];
}, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    domain: "research";
    embeddedDocs: number[];
    resonanceScores: Record<string, number>;
    patterns: string[];
    sourceProvenance: string[];
    humanReviewRequired?: boolean | undefined;
}>;
export declare const ShatterReportSchema: z.ZodObject<{
    intentSignature: z.ZodString;
    gate: z.ZodEnum<["SAFE", "ARMED"]>;
    disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
    humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
} & {
    domain: z.ZodLiteral<"shatter-report">;
    spatial: z.ZodObject<{
        intentSignature: z.ZodString;
        gate: z.ZodEnum<["SAFE", "ARMED"]>;
        disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
        humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
    } & {
        domain: z.ZodLiteral<"spatial">;
        layoutVectors: z.ZodArray<z.ZodNumber, "many">;
        shatterVariance: z.ZodNumber;
        hotspots: z.ZodArray<z.ZodObject<{
            pos: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
            lagMs: z.ZodNumber;
            provenance: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            pos: [number, number];
            lagMs: number;
            provenance: string;
        }, {
            pos: [number, number];
            lagMs: number;
            provenance: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "spatial";
        layoutVectors: number[];
        shatterVariance: number;
        hotspots: {
            pos: [number, number];
            lagMs: number;
            provenance: string;
        }[];
    }, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "spatial";
        layoutVectors: number[];
        shatterVariance: number;
        hotspots: {
            pos: [number, number];
            lagMs: number;
            provenance: string;
        }[];
        humanReviewRequired?: boolean | undefined;
    }>;
    structural: z.ZodObject<{
        intentSignature: z.ZodString;
        gate: z.ZodEnum<["SAFE", "ARMED"]>;
        disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
        humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
    } & {
        domain: z.ZodLiteral<"structural">;
        graphNodes: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["core", "ui", "asset", "logic"]>;
            integralScore: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "core" | "ui" | "asset" | "logic";
            integralScore: number;
        }, {
            id: string;
            type: "core" | "ui" | "asset" | "logic";
            integralScore: number;
        }>, "many">;
        dependencies: z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodString], null>, "many">;
        glitches: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["1-shot", "flow-break", "dependency-cycle"]>;
            severity: z.ZodNumber;
            repairGuidance: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            type: "1-shot" | "flow-break" | "dependency-cycle";
            severity: number;
            repairGuidance: string;
        }, {
            id: string;
            type: "1-shot" | "flow-break" | "dependency-cycle";
            severity: number;
            repairGuidance: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "structural";
        graphNodes: {
            id: string;
            type: "core" | "ui" | "asset" | "logic";
            integralScore: number;
        }[];
        dependencies: [string, string][];
        glitches: {
            id: string;
            type: "1-shot" | "flow-break" | "dependency-cycle";
            severity: number;
            repairGuidance: string;
        }[];
    }, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "structural";
        graphNodes: {
            id: string;
            type: "core" | "ui" | "asset" | "logic";
            integralScore: number;
        }[];
        dependencies: [string, string][];
        glitches: {
            id: string;
            type: "1-shot" | "flow-break" | "dependency-cycle";
            severity: number;
            repairGuidance: string;
        }[];
        humanReviewRequired?: boolean | undefined;
    }>;
    research: z.ZodObject<{
        intentSignature: z.ZodString;
        gate: z.ZodEnum<["SAFE", "ARMED"]>;
        disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
        humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
    } & {
        domain: z.ZodLiteral<"research">;
        embeddedDocs: z.ZodArray<z.ZodNumber, "many">;
        resonanceScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
        patterns: z.ZodArray<z.ZodString, "many">;
        sourceProvenance: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "research";
        embeddedDocs: number[];
        resonanceScores: Record<string, number>;
        patterns: string[];
        sourceProvenance: string[];
    }, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "research";
        embeddedDocs: number[];
        resonanceScores: Record<string, number>;
        patterns: string[];
        sourceProvenance: string[];
        humanReviewRequired?: boolean | undefined;
    }>;
    overallShatter: z.ZodNumber;
    parentModuleSig: z.ZodOptional<z.ZodString>;
    subEventSigs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    diamondStable: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
    domain: "shatter-report";
    spatial: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "spatial";
        layoutVectors: number[];
        shatterVariance: number;
        hotspots: {
            pos: [number, number];
            lagMs: number;
            provenance: string;
        }[];
    };
    structural: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "structural";
        graphNodes: {
            id: string;
            type: "core" | "ui" | "asset" | "logic";
            integralScore: number;
        }[];
        dependencies: [string, string][];
        glitches: {
            id: string;
            type: "1-shot" | "flow-break" | "dependency-cycle";
            severity: number;
            repairGuidance: string;
        }[];
    };
    research: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "research";
        embeddedDocs: number[];
        resonanceScores: Record<string, number>;
        patterns: string[];
        sourceProvenance: string[];
    };
    overallShatter: number;
    diamondStable: boolean;
    parentModuleSig?: string | undefined;
    subEventSigs?: string[] | undefined;
}, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    domain: "shatter-report";
    spatial: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "spatial";
        layoutVectors: number[];
        shatterVariance: number;
        hotspots: {
            pos: [number, number];
            lagMs: number;
            provenance: string;
        }[];
        humanReviewRequired?: boolean | undefined;
    };
    structural: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "structural";
        graphNodes: {
            id: string;
            type: "core" | "ui" | "asset" | "logic";
            integralScore: number;
        }[];
        dependencies: [string, string][];
        glitches: {
            id: string;
            type: "1-shot" | "flow-break" | "dependency-cycle";
            severity: number;
            repairGuidance: string;
        }[];
        humanReviewRequired?: boolean | undefined;
    };
    research: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "research";
        embeddedDocs: number[];
        resonanceScores: Record<string, number>;
        patterns: string[];
        sourceProvenance: string[];
        humanReviewRequired?: boolean | undefined;
    };
    overallShatter: number;
    humanReviewRequired?: boolean | undefined;
    parentModuleSig?: string | undefined;
    subEventSigs?: string[] | undefined;
    diamondStable?: boolean | undefined;
}>;
export declare const RepairCycleSchema: z.ZodObject<{
    intentSignature: z.ZodString;
    gate: z.ZodEnum<["SAFE", "ARMED"]>;
    disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
} & {
    domain: z.ZodLiteral<"repair-cycle">;
    stage: z.ZodEnum<["core", "ui", "assets", "logic", "iteration"]>;
    inputPrototype: z.ZodObject<{
        url: z.ZodString;
        version: z.ZodString;
        initialShatter: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        version: string;
        initialShatter: number;
    }, {
        url: string;
        version: string;
        initialShatter: number;
    }>;
    guidanceMap: z.ZodObject<{
        intentSignature: z.ZodString;
        gate: z.ZodEnum<["SAFE", "ARMED"]>;
        disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
        humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
    } & {
        domain: z.ZodLiteral<"shatter-report">;
        spatial: z.ZodObject<{
            intentSignature: z.ZodString;
            gate: z.ZodEnum<["SAFE", "ARMED"]>;
            disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
            humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
        } & {
            domain: z.ZodLiteral<"spatial">;
            layoutVectors: z.ZodArray<z.ZodNumber, "many">;
            shatterVariance: z.ZodNumber;
            hotspots: z.ZodArray<z.ZodObject<{
                pos: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
                lagMs: z.ZodNumber;
                provenance: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }, {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
        }, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        }>;
        structural: z.ZodObject<{
            intentSignature: z.ZodString;
            gate: z.ZodEnum<["SAFE", "ARMED"]>;
            disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
            humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
        } & {
            domain: z.ZodLiteral<"structural">;
            graphNodes: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                type: z.ZodEnum<["core", "ui", "asset", "logic"]>;
                integralScore: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }, {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }>, "many">;
            dependencies: z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodString], null>, "many">;
            glitches: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                type: z.ZodEnum<["1-shot", "flow-break", "dependency-cycle"]>;
                severity: z.ZodNumber;
                repairGuidance: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }, {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
        }, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        }>;
        research: z.ZodObject<{
            intentSignature: z.ZodString;
            gate: z.ZodEnum<["SAFE", "ARMED"]>;
            disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
            humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
        } & {
            domain: z.ZodLiteral<"research">;
            embeddedDocs: z.ZodArray<z.ZodNumber, "many">;
            resonanceScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
            patterns: z.ZodArray<z.ZodString, "many">;
            sourceProvenance: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
        }, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
            humanReviewRequired?: boolean | undefined;
        }>;
        overallShatter: z.ZodNumber;
        parentModuleSig: z.ZodOptional<z.ZodString>;
        subEventSigs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        diamondStable: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
        };
        overallShatter: number;
        diamondStable: boolean;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
    }, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
            humanReviewRequired?: boolean | undefined;
        };
        overallShatter: number;
        humanReviewRequired?: boolean | undefined;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
        diamondStable?: boolean | undefined;
    }>;
    edits: z.ZodArray<z.ZodObject<{
        file: z.ZodString;
        diff: z.ZodString;
        rationale: z.ZodString;
        intentSig: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        file: string;
        diff: string;
        rationale: string;
        intentSig: string;
    }, {
        file: string;
        diff: string;
        rationale: string;
        intentSig: string;
    }>, "many">;
    evalMetrics: z.ZodObject<{
        resonance: z.ZodNumber;
        shatterReduction: z.ZodNumber;
        playability: z.ZodNumber;
        concurrentPlayers: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        resonance: number;
        shatterReduction: number;
        playability: number;
        concurrentPlayers?: number | undefined;
    }, {
        resonance: number;
        shatterReduction: number;
        playability: number;
        concurrentPlayers?: number | undefined;
    }>;
    output: z.ZodObject<{
        url: z.ZodString;
        version: z.ZodString;
        finalShatter: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        url: string;
        version: string;
        finalShatter: number;
    }, {
        url: string;
        version: string;
        finalShatter: number;
    }>;
    cycleCount: z.ZodNumber;
    humanReviewRequired: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
    domain: "repair-cycle";
    stage: "core" | "ui" | "logic" | "assets" | "iteration";
    inputPrototype: {
        url: string;
        version: string;
        initialShatter: number;
    };
    guidanceMap: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
        };
        overallShatter: number;
        diamondStable: boolean;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
    };
    edits: {
        file: string;
        diff: string;
        rationale: string;
        intentSig: string;
    }[];
    evalMetrics: {
        resonance: number;
        shatterReduction: number;
        playability: number;
        concurrentPlayers?: number | undefined;
    };
    output: {
        url: string;
        version: string;
        finalShatter: number;
    };
    cycleCount: number;
}, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
    domain: "repair-cycle";
    stage: "core" | "ui" | "logic" | "assets" | "iteration";
    inputPrototype: {
        url: string;
        version: string;
        initialShatter: number;
    };
    guidanceMap: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
            humanReviewRequired?: boolean | undefined;
        };
        overallShatter: number;
        humanReviewRequired?: boolean | undefined;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
        diamondStable?: boolean | undefined;
    };
    edits: {
        file: string;
        diff: string;
        rationale: string;
        intentSig: string;
    }[];
    evalMetrics: {
        resonance: number;
        shatterReduction: number;
        playability: number;
        concurrentPlayers?: number | undefined;
    };
    output: {
        url: string;
        version: string;
        finalShatter: number;
    };
    cycleCount: number;
}>;
export declare const TrainingPipelineSchema: z.ZodObject<{
    intentSignature: z.ZodString;
    gate: z.ZodEnum<["SAFE", "ARMED"]>;
    disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
    humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
} & {
    domain: z.ZodLiteral<"training-pipeline">;
    sourceGame: z.ZodObject<{
        name: z.ZodString;
        popularity: z.ZodNumber;
        daysSustained: z.ZodNumber;
        url: z.ZodString;
        provenance: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        provenance: string;
        url: string;
        name: string;
        popularity: number;
        daysSustained: number;
    }, {
        provenance: string;
        url: string;
        name: string;
        popularity: number;
        daysSustained: number;
    }>;
    maps: z.ZodObject<{
        intentSignature: z.ZodString;
        gate: z.ZodEnum<["SAFE", "ARMED"]>;
        disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
        humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
    } & {
        domain: z.ZodLiteral<"shatter-report">;
        spatial: z.ZodObject<{
            intentSignature: z.ZodString;
            gate: z.ZodEnum<["SAFE", "ARMED"]>;
            disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
            humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
        } & {
            domain: z.ZodLiteral<"spatial">;
            layoutVectors: z.ZodArray<z.ZodNumber, "many">;
            shatterVariance: z.ZodNumber;
            hotspots: z.ZodArray<z.ZodObject<{
                pos: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
                lagMs: z.ZodNumber;
                provenance: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }, {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
        }, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        }>;
        structural: z.ZodObject<{
            intentSignature: z.ZodString;
            gate: z.ZodEnum<["SAFE", "ARMED"]>;
            disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
            humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
        } & {
            domain: z.ZodLiteral<"structural">;
            graphNodes: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                type: z.ZodEnum<["core", "ui", "asset", "logic"]>;
                integralScore: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }, {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }>, "many">;
            dependencies: z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodString], null>, "many">;
            glitches: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                type: z.ZodEnum<["1-shot", "flow-break", "dependency-cycle"]>;
                severity: z.ZodNumber;
                repairGuidance: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }, {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
        }, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        }>;
        research: z.ZodObject<{
            intentSignature: z.ZodString;
            gate: z.ZodEnum<["SAFE", "ARMED"]>;
            disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
            humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
        } & {
            domain: z.ZodLiteral<"research">;
            embeddedDocs: z.ZodArray<z.ZodNumber, "many">;
            resonanceScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
            patterns: z.ZodArray<z.ZodString, "many">;
            sourceProvenance: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
        }, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
            humanReviewRequired?: boolean | undefined;
        }>;
        overallShatter: z.ZodNumber;
        parentModuleSig: z.ZodOptional<z.ZodString>;
        subEventSigs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        diamondStable: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
        };
        overallShatter: number;
        diamondStable: boolean;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
    }, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
            humanReviewRequired?: boolean | undefined;
        };
        overallShatter: number;
        humanReviewRequired?: boolean | undefined;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
        diamondStable?: boolean | undefined;
    }>;
    cycles: z.ZodArray<z.ZodObject<{
        intentSignature: z.ZodString;
        gate: z.ZodEnum<["SAFE", "ARMED"]>;
        disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
    } & {
        domain: z.ZodLiteral<"repair-cycle">;
        stage: z.ZodEnum<["core", "ui", "assets", "logic", "iteration"]>;
        inputPrototype: z.ZodObject<{
            url: z.ZodString;
            version: z.ZodString;
            initialShatter: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            version: string;
            initialShatter: number;
        }, {
            url: string;
            version: string;
            initialShatter: number;
        }>;
        guidanceMap: z.ZodObject<{
            intentSignature: z.ZodString;
            gate: z.ZodEnum<["SAFE", "ARMED"]>;
            disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
            humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
        } & {
            domain: z.ZodLiteral<"shatter-report">;
            spatial: z.ZodObject<{
                intentSignature: z.ZodString;
                gate: z.ZodEnum<["SAFE", "ARMED"]>;
                disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
                humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
            } & {
                domain: z.ZodLiteral<"spatial">;
                layoutVectors: z.ZodArray<z.ZodNumber, "many">;
                shatterVariance: z.ZodNumber;
                hotspots: z.ZodArray<z.ZodObject<{
                    pos: z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>;
                    lagMs: z.ZodNumber;
                    provenance: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }, {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
            }, {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            }>;
            structural: z.ZodObject<{
                intentSignature: z.ZodString;
                gate: z.ZodEnum<["SAFE", "ARMED"]>;
                disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
                humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
            } & {
                domain: z.ZodLiteral<"structural">;
                graphNodes: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodEnum<["core", "ui", "asset", "logic"]>;
                    integralScore: z.ZodNumber;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }, {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }>, "many">;
                dependencies: z.ZodArray<z.ZodTuple<[z.ZodString, z.ZodString], null>, "many">;
                glitches: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    type: z.ZodEnum<["1-shot", "flow-break", "dependency-cycle"]>;
                    severity: z.ZodNumber;
                    repairGuidance: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }, {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
            }, {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            }>;
            research: z.ZodObject<{
                intentSignature: z.ZodString;
                gate: z.ZodEnum<["SAFE", "ARMED"]>;
                disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC governed, no real-world application">;
                humanReviewRequired: z.ZodDefault<z.ZodBoolean>;
            } & {
                domain: z.ZodLiteral<"research">;
                embeddedDocs: z.ZodArray<z.ZodNumber, "many">;
                resonanceScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
                patterns: z.ZodArray<z.ZodString, "many">;
                sourceProvenance: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
            }, {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
                humanReviewRequired?: boolean | undefined;
            }>;
            overallShatter: z.ZodNumber;
            parentModuleSig: z.ZodOptional<z.ZodString>;
            subEventSigs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            diamondStable: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "shatter-report";
            spatial: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
            };
            structural: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
            };
            research: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
            };
            overallShatter: number;
            diamondStable: boolean;
            parentModuleSig?: string | undefined;
            subEventSigs?: string[] | undefined;
        }, {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "shatter-report";
            spatial: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            };
            structural: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            };
            research: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
                humanReviewRequired?: boolean | undefined;
            };
            overallShatter: number;
            humanReviewRequired?: boolean | undefined;
            parentModuleSig?: string | undefined;
            subEventSigs?: string[] | undefined;
            diamondStable?: boolean | undefined;
        }>;
        edits: z.ZodArray<z.ZodObject<{
            file: z.ZodString;
            diff: z.ZodString;
            rationale: z.ZodString;
            intentSig: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            file: string;
            diff: string;
            rationale: string;
            intentSig: string;
        }, {
            file: string;
            diff: string;
            rationale: string;
            intentSig: string;
        }>, "many">;
        evalMetrics: z.ZodObject<{
            resonance: z.ZodNumber;
            shatterReduction: z.ZodNumber;
            playability: z.ZodNumber;
            concurrentPlayers: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            resonance: number;
            shatterReduction: number;
            playability: number;
            concurrentPlayers?: number | undefined;
        }, {
            resonance: number;
            shatterReduction: number;
            playability: number;
            concurrentPlayers?: number | undefined;
        }>;
        output: z.ZodObject<{
            url: z.ZodString;
            version: z.ZodString;
            finalShatter: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            url: string;
            version: string;
            finalShatter: number;
        }, {
            url: string;
            version: string;
            finalShatter: number;
        }>;
        cycleCount: z.ZodNumber;
        humanReviewRequired: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "repair-cycle";
        stage: "core" | "ui" | "logic" | "assets" | "iteration";
        inputPrototype: {
            url: string;
            version: string;
            initialShatter: number;
        };
        guidanceMap: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "shatter-report";
            spatial: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
            };
            structural: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
            };
            research: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
            };
            overallShatter: number;
            diamondStable: boolean;
            parentModuleSig?: string | undefined;
            subEventSigs?: string[] | undefined;
        };
        edits: {
            file: string;
            diff: string;
            rationale: string;
            intentSig: string;
        }[];
        evalMetrics: {
            resonance: number;
            shatterReduction: number;
            playability: number;
            concurrentPlayers?: number | undefined;
        };
        output: {
            url: string;
            version: string;
            finalShatter: number;
        };
        cycleCount: number;
    }, {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "repair-cycle";
        stage: "core" | "ui" | "logic" | "assets" | "iteration";
        inputPrototype: {
            url: string;
            version: string;
            initialShatter: number;
        };
        guidanceMap: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "shatter-report";
            spatial: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            };
            structural: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            };
            research: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
                humanReviewRequired?: boolean | undefined;
            };
            overallShatter: number;
            humanReviewRequired?: boolean | undefined;
            parentModuleSig?: string | undefined;
            subEventSigs?: string[] | undefined;
            diamondStable?: boolean | undefined;
        };
        edits: {
            file: string;
            diff: string;
            rationale: string;
            intentSig: string;
        }[];
        evalMetrics: {
            resonance: number;
            shatterReduction: number;
            playability: number;
            concurrentPlayers?: number | undefined;
        };
        output: {
            url: string;
            version: string;
            finalShatter: number;
        };
        cycleCount: number;
    }>, "many">;
    isCanonicalStandard: z.ZodDefault<z.ZodBoolean>;
    canonicalArchiveUrl: z.ZodOptional<z.ZodString>;
    diamondStable: z.ZodBoolean;
    finalEval: z.ZodObject<{
        playability: z.ZodNumber;
        latencyMs: z.ZodNumber;
        shatterReductionTotal: z.ZodNumber;
        disclaimer: z.ZodLiteral<"Fictional sim artifact—OMC SAFE/ARMED enforced">;
    }, "strip", z.ZodTypeAny, {
        disclaimer: "Fictional sim artifact—OMC SAFE/ARMED enforced";
        playability: number;
        latencyMs: number;
        shatterReductionTotal: number;
    }, {
        disclaimer: "Fictional sim artifact—OMC SAFE/ARMED enforced";
        playability: number;
        latencyMs: number;
        shatterReductionTotal: number;
    }>;
}, "strip", z.ZodTypeAny, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    humanReviewRequired: boolean;
    domain: "training-pipeline";
    diamondStable: boolean;
    sourceGame: {
        provenance: string;
        url: string;
        name: string;
        popularity: number;
        daysSustained: number;
    };
    maps: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
        };
        overallShatter: number;
        diamondStable: boolean;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
    };
    cycles: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "repair-cycle";
        stage: "core" | "ui" | "logic" | "assets" | "iteration";
        inputPrototype: {
            url: string;
            version: string;
            initialShatter: number;
        };
        guidanceMap: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            humanReviewRequired: boolean;
            domain: "shatter-report";
            spatial: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
            };
            structural: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
            };
            research: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                humanReviewRequired: boolean;
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
            };
            overallShatter: number;
            diamondStable: boolean;
            parentModuleSig?: string | undefined;
            subEventSigs?: string[] | undefined;
        };
        edits: {
            file: string;
            diff: string;
            rationale: string;
            intentSig: string;
        }[];
        evalMetrics: {
            resonance: number;
            shatterReduction: number;
            playability: number;
            concurrentPlayers?: number | undefined;
        };
        output: {
            url: string;
            version: string;
            finalShatter: number;
        };
        cycleCount: number;
    }[];
    isCanonicalStandard: boolean;
    finalEval: {
        disclaimer: "Fictional sim artifact—OMC SAFE/ARMED enforced";
        playability: number;
        latencyMs: number;
        shatterReductionTotal: number;
    };
    canonicalArchiveUrl?: string | undefined;
}, {
    intentSignature: string;
    gate: "SAFE" | "ARMED";
    disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
    domain: "training-pipeline";
    diamondStable: boolean;
    sourceGame: {
        provenance: string;
        url: string;
        name: string;
        popularity: number;
        daysSustained: number;
    };
    maps: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        domain: "shatter-report";
        spatial: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "spatial";
            layoutVectors: number[];
            shatterVariance: number;
            hotspots: {
                pos: [number, number];
                lagMs: number;
                provenance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        structural: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "structural";
            graphNodes: {
                id: string;
                type: "core" | "ui" | "asset" | "logic";
                integralScore: number;
            }[];
            dependencies: [string, string][];
            glitches: {
                id: string;
                type: "1-shot" | "flow-break" | "dependency-cycle";
                severity: number;
                repairGuidance: string;
            }[];
            humanReviewRequired?: boolean | undefined;
        };
        research: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "research";
            embeddedDocs: number[];
            resonanceScores: Record<string, number>;
            patterns: string[];
            sourceProvenance: string[];
            humanReviewRequired?: boolean | undefined;
        };
        overallShatter: number;
        humanReviewRequired?: boolean | undefined;
        parentModuleSig?: string | undefined;
        subEventSigs?: string[] | undefined;
        diamondStable?: boolean | undefined;
    };
    cycles: {
        intentSignature: string;
        gate: "SAFE" | "ARMED";
        disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
        humanReviewRequired: boolean;
        domain: "repair-cycle";
        stage: "core" | "ui" | "logic" | "assets" | "iteration";
        inputPrototype: {
            url: string;
            version: string;
            initialShatter: number;
        };
        guidanceMap: {
            intentSignature: string;
            gate: "SAFE" | "ARMED";
            disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
            domain: "shatter-report";
            spatial: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "spatial";
                layoutVectors: number[];
                shatterVariance: number;
                hotspots: {
                    pos: [number, number];
                    lagMs: number;
                    provenance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            };
            structural: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "structural";
                graphNodes: {
                    id: string;
                    type: "core" | "ui" | "asset" | "logic";
                    integralScore: number;
                }[];
                dependencies: [string, string][];
                glitches: {
                    id: string;
                    type: "1-shot" | "flow-break" | "dependency-cycle";
                    severity: number;
                    repairGuidance: string;
                }[];
                humanReviewRequired?: boolean | undefined;
            };
            research: {
                intentSignature: string;
                gate: "SAFE" | "ARMED";
                disclaimer: "Fictional sim artifact—OMC governed, no real-world application";
                domain: "research";
                embeddedDocs: number[];
                resonanceScores: Record<string, number>;
                patterns: string[];
                sourceProvenance: string[];
                humanReviewRequired?: boolean | undefined;
            };
            overallShatter: number;
            humanReviewRequired?: boolean | undefined;
            parentModuleSig?: string | undefined;
            subEventSigs?: string[] | undefined;
            diamondStable?: boolean | undefined;
        };
        edits: {
            file: string;
            diff: string;
            rationale: string;
            intentSig: string;
        }[];
        evalMetrics: {
            resonance: number;
            shatterReduction: number;
            playability: number;
            concurrentPlayers?: number | undefined;
        };
        output: {
            url: string;
            version: string;
            finalShatter: number;
        };
        cycleCount: number;
    }[];
    finalEval: {
        disclaimer: "Fictional sim artifact—OMC SAFE/ARMED enforced";
        playability: number;
        latencyMs: number;
        shatterReductionTotal: number;
    };
    humanReviewRequired?: boolean | undefined;
    isCanonicalStandard?: boolean | undefined;
    canonicalArchiveUrl?: string | undefined;
}>;
//# sourceMappingURL=repair-shop-schemas.d.ts.map