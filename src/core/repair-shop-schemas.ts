import { z } from 'zod';

/**
 * METROPOLIS REPAIR SHOP SCHEMAS (Diamond-Stable)
 * Aligned with Open Model Contracts (OMC) Governance.
 */

// OMC Provenance Base (All Schemas Extend)
export const OMCProvenanceSchema = z.object({
  intentSignature: z.string(), // BLAKE2b hash of agent intent
  gate: z.enum(['SAFE', 'ARMED']),
  disclaimer: z.literal('Fictional sim artifact—OMC governed, no real-world application'),
  humanReviewRequired: z.boolean().default(false),
});

// Shatter Map Schema (3 Layers, Extend OMC)
export const SpatialMapSchema = OMCProvenanceSchema.extend({
  domain: z.literal('spatial'),
  layoutVectors: z.array(z.number().min(-1).max(1)).length(3072), // L2-norm unit sphere, REFRAG compressed
  shatterVariance: z.number().min(0).max(100), // Expanded for Deep Shatter
  hotspots: z.array(z.object({
    pos: z.tuple([z.number(), z.number()]), // x,y in game space
    lagMs: z.number().min(0),
    provenance: z.string(), // Source game ID
  })).max(100), // Limit for efficiency
});

export const StructuralMapSchema = OMCProvenanceSchema.extend({
  domain: z.literal('structural'),
  graphNodes: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(['core', 'ui', 'asset', 'logic']),
    integralScore: z.number().min(0).max(10), // Resonance priority
  })),
  dependencies: z.array(z.tuple([z.string().uuid(), z.string().uuid()])), // Directed edges
  glitches: z.array(z.object({
    id: z.string().uuid(),
    type: z.enum(['1-shot', 'flow-break', 'dependency-cycle']),
    severity: z.number().min(0).max(10),
    repairGuidance: z.string(), // Map-derived rationale
  })).max(50),
});

export const ResearchMapSchema = OMCProvenanceSchema.extend({
  domain: z.literal('research'),
  embeddedDocs: z.array(z.number().min(-1).max(1)).length(3072), // Feedback/patterns, L2-norm
  resonanceScores: z.record(z.string(), z.number().min(0).max(100)), // Viral mechanics freq
  patterns: z.array(z.string()).max(20), // e.g., 'superbullet exploit'
  sourceProvenance: z.array(z.string().url()), // Forum/IGN links
});

export const ShatterReportSchema = OMCProvenanceSchema.extend({
  domain: z.literal('shatter-report'),
  spatial: SpatialMapSchema,
  structural: StructuralMapSchema,
  research: ResearchMapSchema,
  overallShatter: z.number().min(0).max(100),
  parentModuleSig: z.string().optional(), // Link to architectural root
  subEventSigs: z.array(z.string()).optional(), // Link to surgical details
  diamondStable: z.boolean().default(true), // Sentry validation
});

// Repair Cycle Schema (Per Stage, OMC-Aligned)
export const RepairCycleSchema = OMCProvenanceSchema.extend({
  domain: z.literal('repair-cycle'),
  stage: z.enum(['core', 'ui', 'assets', 'logic', 'iteration']),
  inputPrototype: z.object({
    url: z.string().url(), // Luau/project
    version: z.string(), // Git hash
    initialShatter: z.number().min(0).max(100),
  }),
  guidanceMap: ShatterReportSchema,
  edits: z.array(z.object({
    file: z.string(), // Luau path
    diff: z.string(), // Git diff snippet
    rationale: z.string(), // Map-derived
    intentSig: z.string(), // BLAKE2b
  })).min(1).max(20),
  evalMetrics: z.object({
    resonance: z.number().min(-100).max(100),
    shatterReduction: z.number().min(-100).max(100), // % drop
    playability: z.number().min(0).max(100), // Completion %
    concurrentPlayers: z.number().optional(), // Roblox-specific
  }),
  output: z.object({
    url: z.string().url(), // Repaired
    version: z.string(),
    finalShatter: z.number().min(0).max(100),
  }),
  cycleCount: z.number().min(1).max(3), // Fast convergence
  humanReviewRequired: z.boolean(), // ARMED if shatter >0.2 post-repair
});

// Full Pipeline Schema (OMC Governed)
export const TrainingPipelineSchema = OMCProvenanceSchema.extend({
  domain: z.literal('training-pipeline'),
  sourceGame: z.object({
    name: z.string(),
    popularity: z.number().min(0.01).max(1), // 1% threshold
    daysSustained: z.number().min(1),
    url: z.string().url(), // Marketplace/repo
    provenance: z.string(), // Open-source license
  }),
  maps: ShatterReportSchema,
  cycles: z.array(RepairCycleSchema).min(1).max(4),
  isCanonicalStandard: z.boolean().default(false), // MARKER: The standard painted on the wall
  canonicalArchiveUrl: z.string().optional(), // Sovereign ground truth (.lua.gz)
  diamondStable: z.boolean(), // Full pipeline integrity
  finalEval: z.object({
    playability: z.number().gt(90),
    latencyMs: z.number().lt(500),
    shatterReductionTotal: z.number().gt(0.7),
    disclaimer: z.literal('Fictional sim artifact—OMC SAFE/ARMED enforced'),
  }),
});
