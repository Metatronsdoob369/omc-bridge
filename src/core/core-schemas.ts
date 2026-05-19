import { z } from 'zod';

/**
 * CORE SCHEMAS — The stable foundation of the @popsim/contract SDK.
 * These are game-agnostic and handle the "Physics" of the contract.
 */

export const GateSchema = z.enum(['SAFE', 'ARMED']);

export const PlatformEconomicContextSchema = z.object({
  platformFeePercentage: z.number().min(0).max(1).default(0.70),
  developerRevenueShare: z.number().min(0).max(1).default(0.30),
  payoutConversionRate: z.number().default(0.0038), // DevEx rate
  currencyName: z.string().default('Robux'),
  fiatCurrency: z.string().default('USD'),
  minPayoutThreshold: z.number().int().default(30000),
});

export const AuditEventSchema = z.object({
  timestamp: z.string().datetime(),
  contract: z.string(),
  gate: GateSchema,
  success: z.boolean(),
  duration_ms: z.number(),
  error: z.string().optional(),
});

/**
 * Common headers / metadata for all contracts
 */
export const ContractMetadataSchema = z.object({
  contractId: z.string().uuid(),
  version: z.string().default('1.0'),
  openModelContractRef: z.string().url(),
  domicile: z.string().default('State of Delaware, USA'),
  signedBy: z.string(),
  effectiveDate: z.string().datetime(),
  gate: GateSchema,
});
