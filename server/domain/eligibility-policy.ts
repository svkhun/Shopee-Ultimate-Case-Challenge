/**
 * Pure Domain Business Policy: COD Checkout Eligibility & Intervention Engine
 * Maps buyer risk profiles to progressive, targeted barriers
 */

import { RiskTier, PaymentMethod, InterventionAction } from "./models";

export interface CheckoutEligibilityResult {
  isEligible: boolean;
  paymentMethod: PaymentMethod;
  buyerScore: number;
  riskTier: RiskTier;
  intervention: InterventionAction;
  frictionLevel: "ZERO_FRICTION" | "GENTLE_NUDGE" | "ACTIVE_CONFIRMATION" | "DEPOSIT_REQUIRED";
  requiresOtp: boolean;
  requiresDeposit: boolean;
  depositAmount: number;
  noticeBanner: {
    title: string;
    description: string;
    level: "INFO" | "WARNING" | "CRITICAL";
  } | null;
  incentiveOffer: {
    title: string;
    voucherDiscount: number;
    recommendedMethod: PaymentMethod.SHOPEEPAY | PaymentMethod.PROMPTPAY;
  } | null;
}

export const DEPOSIT_CONFIG = {
  DEFAULT_SHIPPING_DEPOSIT_THB: 40.0,
  PROMPTPAY_CONVERSION_DISCOUNT_THB: 20.0,
};

/**
 * Evaluates whether an order can proceed with COD and what constraints apply
 */
export function validateCheckoutEligibility(
  buyerScore: number,
  buyerRiskTier: RiskTier,
  paymentMethod: PaymentMethod,
  orderTotal: number,
  consecutiveFailures: number = 0
): CheckoutEligibilityResult {
  // Non-COD methods (Prepaid) carry zero credit/RTO delivery risk
  if (paymentMethod !== PaymentMethod.COD) {
    return {
      isEligible: true,
      paymentMethod,
      buyerScore,
      riskTier: buyerRiskTier,
      intervention: InterventionAction.NONE,
      frictionLevel: "ZERO_FRICTION",
      requiresOtp: false,
      requiresDeposit: false,
      depositAmount: 0.0,
      noticeBanner: null,
      incentiveOffer: null,
    };
  }

  // COD Tier-Specific Business Rules
  switch (buyerRiskTier) {
    case RiskTier.LOW_RISK:
      return {
        isEligible: true,
        paymentMethod: PaymentMethod.COD,
        buyerScore,
        riskTier: buyerRiskTier,
        intervention: InterventionAction.NONE,
        frictionLevel: "ZERO_FRICTION",
        requiresOtp: false,
        requiresDeposit: false,
        depositAmount: 0.0,
        noticeBanner: null,
        incentiveOffer: null,
      };

    case RiskTier.MEDIUM_RISK:
      return {
        isEligible: true,
        paymentMethod: PaymentMethod.COD,
        buyerScore,
        riskTier: buyerRiskTier,
        intervention: InterventionAction.PRE_DELIVERY_REMINDER,
        frictionLevel: "GENTLE_NUDGE",
        requiresOtp: false,
        requiresDeposit: false,
        depositAmount: 0.0,
        noticeBanner: {
          title: "Pre-delivery Notification Active",
          description: "An automated reminder will be dispatched 2-3 hours prior to delivery so you can have exact cash ready at your doorstep.",
          level: "INFO",
        },
        incentiveOffer: null,
      };

    case RiskTier.HIGH_RISK:
      return {
        isEligible: true,
        paymentMethod: PaymentMethod.COD,
        buyerScore,
        riskTier: buyerRiskTier,
        intervention: InterventionAction.MANDATORY_OTP_CONFIRMATION,
        frictionLevel: "ACTIVE_CONFIRMATION",
        requiresOtp: true,
        requiresDeposit: false,
        depositAmount: 0.0,
        noticeBanner: {
          title: "Order Requires Mandatory OTP Authentication",
          description: `Delivery refusal history detected. Please authenticate via SMS OTP confirming intent to accept delivery and prepare ฿${orderTotal.toLocaleString()} cash. Continued refusal will permanently suspend COD privileges.`,
          level: "WARNING",
        },
        incentiveOffer: {
          title: "Switch to ShopeePay now and save ฿20 instantly",
          voucherDiscount: DEPOSIT_CONFIG.PROMPTPAY_CONVERSION_DISCOUNT_THB,
          recommendedMethod: PaymentMethod.SHOPEEPAY,
        },
      };

    case RiskTier.REPEATED_HIGH_RISK:
    default:
      // Hard gate or Deposit Prepayment required
      const deposit = Math.min(orderTotal, DEPOSIT_CONFIG.DEFAULT_SHIPPING_DEPOSIT_THB);
      const isPureCodAllowed = consecutiveFailures < 4;

      return {
        isEligible: isPureCodAllowed, // If failures >= 4, locked completely
        paymentMethod: PaymentMethod.COD,
        buyerScore,
        riskTier: RiskTier.REPEATED_HIGH_RISK,
        intervention: InterventionAction.DEPOSIT_OR_PREPAYMENT,
        frictionLevel: "DEPOSIT_REQUIRED",
        requiresOtp: true,
        requiresDeposit: true,
        depositAmount: deposit,
        noticeBanner: {
          title: "Shipping Deposit Required (COD Protection Policy)",
          description: `Due to chronic repeated delivery failures (${consecutiveFailures} consecutive times), an upfront shipping deposit of ฿${deposit} is required prior to dispatch, or pay in full online.`,
          level: "CRITICAL",
        },
        incentiveOffer: {
          title: "Switch to upfront digital payment (ShopeePay / PromptPay) with zero deposit and get ฿20 off",
          voucherDiscount: DEPOSIT_CONFIG.PROMPTPAY_CONVERSION_DISCOUNT_THB,
          recommendedMethod: PaymentMethod.SHOPEEPAY,
        },
      };
  }
}
