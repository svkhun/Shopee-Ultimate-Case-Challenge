/**
 * Pure Domain Business Policy: Reliability Scoring & Tier Calculation
 * Standard: Deterministic, Auditable & Side-effect Free
 */

import { RiskTier } from "./models";

export const SCORING_THRESHOLDS = {
  LOW_RISK_MIN: 80.0,
  MEDIUM_RISK_MIN: 50.0,
  HIGH_RISK_MIN: 30.0,
} as const;

export const SCORE_DELTAS = {
  DELIVERY_SUCCESS: +8.0,
  DELIVERY_FAILURE: -25.0,
  MAX_SCORE: 100.0,
  MIN_SCORE: 0.0,
} as const;

/**
 * Calculates the Risk Tier strictly based on the buyer's Reliability Score
 * Deterministic mapping complying with Slide 2 & 3 of Shopee Case Specification
 */
export function calculateRiskTier(score: number): RiskTier {
  const clampedScore = clampScore(score);

  if (clampedScore >= SCORING_THRESHOLDS.LOW_RISK_MIN) {
    return RiskTier.LOW_RISK;
  }
  if (clampedScore >= SCORING_THRESHOLDS.MEDIUM_RISK_MIN) {
    return RiskTier.MEDIUM_RISK;
  }
  if (clampedScore >= SCORING_THRESHOLDS.HIGH_RISK_MIN) {
    return RiskTier.HIGH_RISK;
  }
  return RiskTier.REPEATED_HIGH_RISK;
}

/**
 * Computes updated score, delta, and new tier upon delivery resolution
 */
export function evaluateScoreAdjustment(
  currentScore: number,
  status: "DELIVERED" | "RETURNED_TO_ORIGIN"
): {
  scoreDelta: number;
  newScore: number;
  newTier: RiskTier;
} {
  const delta =
    status === "DELIVERED"
      ? SCORE_DELTAS.DELIVERY_SUCCESS
      : SCORE_DELTAS.DELIVERY_FAILURE;

  const newScore = clampScore(currentScore + delta);
  const newTier = calculateRiskTier(newScore);

  return {
    scoreDelta: delta,
    newScore,
    newTier,
  };
}

/**
 * Ensures score remains within 0.00 - 100.00 boundaries
 */
export function clampScore(score: number): number {
  if (Number.isNaN(score)) return 50.0; // fallback neutral
  return Math.max(SCORE_DELTAS.MIN_SCORE, Math.min(SCORE_DELTAS.MAX_SCORE, Number(score.toFixed(2))));
}
