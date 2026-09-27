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
          description: "ระบบจะส่งข้อความแจ้งเตือน 2-3 ชั่วโมงก่อนพนักงานขนส่งออกนำจ่าย เพื่อให้ท่านเตรียมเงินสดพร้อมรับสินค้า",
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
          title: "คำสั่งซื้อต้องยืนยันตัวตนด้วยรหัส OTP",
          description: `พบประวัติพัสดุตีกลับ กรุณายืนยันรหัส OTP เพื่อรับรองการรับพัสดุและเตรียมเงินสด ฿${orderTotal.toLocaleString()} ในวันส่งมอบ หากปฏิเสธการรับสินค้า สิทธิ์ COD จะถูกระงับทันที`,
          level: "WARNING",
        },
        incentiveOffer: {
          title: "เปลี่ยนมาจ่ายผ่าน ShopeePay ตอนนี้ รับส่วนลดทันที ฿20",
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
          title: "จำเป็นต้องวางมัดจำค่าจัดส่ง (COD Protection Policy)",
          description: `เนื่องจากมีประวัติพัสดุตีกลับซ้ำซากต่อเนื่อง (${consecutiveFailures} ครั้ง) กรุณาชำระมัดจำค่าส่ง ฿${deposit} ก่อนจัดส่ง หรือเปลี่ยนช่องทางชำระเงินเต็มจำนวน`,
          level: "CRITICAL",
        },
        incentiveOffer: {
          title: "เปลี่ยนเป็นชำระเงินล่วงหน้า (ShopeePay / PromptPay) ไม่ต้องวางมัดจำ พร้อมรับส่วนลด ฿20",
          voucherDiscount: DEPOSIT_CONFIG.PROMPTPAY_CONVERSION_DISCOUNT_THB,
          recommendedMethod: PaymentMethod.SHOPEEPAY,
        },
      };
  }
}
