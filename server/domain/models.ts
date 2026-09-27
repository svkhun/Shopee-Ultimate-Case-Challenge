/**
 * Domain Models & Enums for Smart COD Reliability System
 * Architecture Standard: K-Sentinel Enterprise Risk Engine
 */

export enum RiskTier {
  LOW_RISK = "LOW_RISK",
  MEDIUM_RISK = "MEDIUM_RISK",
  HIGH_RISK = "HIGH_RISK",
  REPEATED_HIGH_RISK = "REPEATED_HIGH_RISK",
}

export enum PaymentMethod {
  COD = "COD",
  SHOPEEPAY = "SHOPEEPAY",
  CREDIT_CARD = "CREDIT_CARD",
  PROMPTPAY = "PROMPTPAY",
}

export enum PreferredDeliveryWindow {
  MORNING = "MORNING",       // 09:00 - 12:00
  AFTERNOON = "AFTERNOON",   // 13:00 - 17:00
  EVENING = "EVENING",       // 17:00 - 20:00 (Post-work peak)
  WEEKEND = "WEEKEND",       // Saturday / Sunday flexible
}

export enum OrderStatus {
  PENDING_VALIDATION = "PENDING_VALIDATION",
  AWAITING_OTP = "AWAITING_OTP",
  AWAITING_DEPOSIT = "AWAITING_DEPOSIT",
  CONFIRMED = "CONFIRMED",
  DISPATCHED = "DISPATCHED",
  DELIVERED = "DELIVERED",
  RETURNED_TO_ORIGIN = "RETURNED_TO_ORIGIN",
  CANCELLED = "CANCELLED",
}

export enum InterventionAction {
  NONE = "NONE",                                           // Low risk: zero friction
  PRE_DELIVERY_REMINDER = "PRE_DELIVERY_REMINDER",         // Medium risk: app/SMS confirmation
  MANDATORY_OTP_CONFIRMATION = "MANDATORY_OTP_CONFIRMATION", // High risk: OTP + strong warning
  DEPOSIT_OR_PREPAYMENT = "DEPOSIT_OR_PREPAYMENT",         // Repeated high risk: deposit / switch to prepaid
}

export interface Buyer {
  id: string;
  externalBuyerId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  currentReliabilityScore: number; // 0.00 to 100.00
  riskTier: RiskTier;
  consecutiveFailedCodCount: number;
  totalCompletedOrders: number;
  totalFailedOrders: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  preferredDeliveryWindow: PreferredDeliveryWindow;
  status: OrderStatus;
  depositRequired: boolean;
  depositAmount: number;
  depositPaid: boolean;
  isOtpVerified: boolean;
  buyerScoreAtCheckout: number;
  buyerTierAtCheckout: RiskTier;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScoreLog {
  id: string;
  buyerId: string;
  orderId?: string;
  eventType: "DELIVERY_SUCCESS" | "DELIVERY_FAILURE" | "MANUAL_ADJUSTMENT" | "SYSTEM_RECOVERY";
  previousScore: number;
  newScore: number;
  scoreDelta: number;
  previousTier: RiskTier;
  newTier: RiskTier;
  reason: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}
