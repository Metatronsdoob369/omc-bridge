"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingPipelineSchema = exports.RepairCycleSchema = exports.ShatterReportSchema = exports.ResearchMapSchema = exports.StructuralMapSchema = exports.SpatialMapSchema = exports.OMCProvenanceSchema = void 0;
const zod_1 = require("zod");
/**
 * METROPOLIS REPAIR SHOP SCHEMAS (Diamond-Stable)
 * Aligned with Open Model Contracts (OMC) Governance.
 */
// OMC Provenance Base (All Schemas Extend)
exports.OMCProvenanceSchema = zod_1.z.object({
    intentSignature: zod_1.z.string(), // BLAKE2b hash of agent intent
    gate: zod_1.z.enum(['SAFE', 'ARMED']),
    disclaimer: zod_1.z.literal('Fictional sim artifact—OMC governed, no real-world application'),
    humanReviewRequired: zod_1.z.boolean().default(false),
});
// Shatter Map Schema (3 Layers, Extend OMC)
exports.SpatialMapSchema = exports.OMCProvenanceSchema.extend({
    domain: zod_1.z.literal('spatial'),
    layoutVectors: zod_1.z.array(zod_1.z.number().min(-1).max(1)).length(3072), // L2-norm unit sphere, REFRAG compressed
    shatterVariance: zod_1.z.number().min(0).max(100), // Expanded for Deep Shatter
    hotspots: zod_1.z.array(zod_1.z.object({
        pos: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()]), // x,y in game space
        lagMs: zod_1.z.number().min(0),
        provenance: zod_1.z.string(), // Source game ID
    })).max(100), // Limit for efficiency
});
exports.StructuralMapSchema = exports.OMCProvenanceSchema.extend({
    domain: zod_1.z.literal('structural'),
    graphNodes: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        type: zod_1.z.enum(['core', 'ui', 'asset', 'logic']),
        integralScore: zod_1.z.number().min(0).max(10), // Resonance priority
    })),
    dependencies: zod_1.z.array(zod_1.z.tuple([zod_1.z.string().uuid(), zod_1.z.string().uuid()])), // Directed edges
    glitches: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        type: zod_1.z.enum(['1-shot', 'flow-break', 'dependency-cycle']),
        severity: zod_1.z.number().min(0).max(10),
        repairGuidance: zod_1.z.string(), // Map-derived rationale
    })).max(50),
});
exports.ResearchMapSchema = exports.OMCProvenanceSchema.extend({
    domain: zod_1.z.literal('research'),
    embeddedDocs: zod_1.z.array(zod_1.z.number().min(-1).max(1)).length(3072), // Feedback/patterns, L2-norm
    resonanceScores: zod_1.z.record(zod_1.z.string(), zod_1.z.number().min(0).max(100)), // Viral mechanics freq
    patterns: zod_1.z.array(zod_1.z.string()).max(20), // e.g., 'superbullet exploit'
    sourceProvenance: zod_1.z.array(zod_1.z.string().url()), // Forum/IGN links
});
exports.ShatterReportSchema = exports.OMCProvenanceSchema.extend({
    domain: zod_1.z.literal('shatter-report'),
    spatial: exports.SpatialMapSchema,
    structural: exports.StructuralMapSchema,
    research: exports.ResearchMapSchema,
    overallShatter: zod_1.z.number().min(0).max(100),
    parentModuleSig: zod_1.z.string().optional(), // Link to architectural root
    subEventSigs: zod_1.z.array(zod_1.z.string()).optional(), // Link to surgical details
    diamondStable: zod_1.z.boolean().default(true), // Sentry validation
});
// Repair Cycle Schema (Per Stage, OMC-Aligned)
exports.RepairCycleSchema = exports.OMCProvenanceSchema.extend({
    domain: zod_1.z.literal('repair-cycle'),
    stage: zod_1.z.enum(['core', 'ui', 'assets', 'logic', 'iteration']),
    inputPrototype: zod_1.z.object({
        url: zod_1.z.string().url(), // Luau/project
        version: zod_1.z.string(), // Git hash
        initialShatter: zod_1.z.number().min(0).max(100),
    }),
    guidanceMap: exports.ShatterReportSchema,
    edits: zod_1.z.array(zod_1.z.object({
        file: zod_1.z.string(), // Luau path
        diff: zod_1.z.string(), // Git diff snippet
        rationale: zod_1.z.string(), // Map-derived
        intentSig: zod_1.z.string(), // BLAKE2b
    })).min(1).max(20),
    evalMetrics: zod_1.z.object({
        resonance: zod_1.z.number().min(-100).max(100),
        shatterReduction: zod_1.z.number().min(-100).max(100), // % drop
        playability: zod_1.z.number().min(0).max(100), // Completion %
        concurrentPlayers: zod_1.z.number().optional(), // Roblox-specific
    }),
    output: zod_1.z.object({
        url: zod_1.z.string().url(), // Repaired
        version: zod_1.z.string(),
        finalShatter: zod_1.z.number().min(0).max(100),
    }),
    cycleCount: zod_1.z.number().min(1).max(3), // Fast convergence
    humanReviewRequired: zod_1.z.boolean(), // ARMED if shatter >0.2 post-repair
});
// Full Pipeline Schema (OMC Governed)
exports.TrainingPipelineSchema = exports.OMCProvenanceSchema.extend({
    domain: zod_1.z.literal('training-pipeline'),
    sourceGame: zod_1.z.object({
        name: zod_1.z.string(),
        popularity: zod_1.z.number().min(0.01).max(1), // 1% threshold
        daysSustained: zod_1.z.number().min(1),
        url: zod_1.z.string().url(), // Marketplace/repo
        provenance: zod_1.z.string(), // Open-source license
    }),
    maps: exports.ShatterReportSchema,
    cycles: zod_1.z.array(exports.RepairCycleSchema).min(1).max(4),
    isCanonicalStandard: zod_1.z.boolean().default(false), // MARKER: The standard painted on the wall
    canonicalArchiveUrl: zod_1.z.string().optional(), // Sovereign ground truth (.lua.gz)
    diamondStable: zod_1.z.boolean(), // Full pipeline integrity
    finalEval: zod_1.z.object({
        playability: zod_1.z.number().gt(90),
        latencyMs: zod_1.z.number().lt(500),
        shatterReductionTotal: zod_1.z.number().gt(0.7),
        disclaimer: zod_1.z.literal('Fictional sim artifact—OMC SAFE/ARMED enforced'),
    }),
});
//# sourceMappingURL=repair-shop-schemas.js.map