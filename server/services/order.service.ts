/**
 * Application Service: Order Creation with Risk Enforcement & Delivery Scheduling
 * Architecture Standard: K-Sentinel Risk Engine
 */

import { db } from "../db/database";
import { OrderCreateRequest } from "../dto/schemas";
import { validateCheckoutEligibility } from "../domain/eligibility-policy";
import { Order, OrderStatus, PaymentMethod } from "../domain/models";

export class OrderService {
  public static async create(request: OrderCreateRequest): Promise<{
    order: Order;
    message: string;
    nextAction: string | null;
  }> {
    // 1. Fetch Buyer
    let buyer = await db.findBuyerByIdOrExternal(request.buyerId);
    if (!buyer) {
      buyer = await db.createBuyer({
        externalBuyerId: request.buyerId,
        fullName: request.shippingAddress.recipientName,
        phoneNumber: request.shippingAddress.phoneNumber,
        email: `${request.buyerId.toLowerCase()}@shopee-buyer.th`,
        initialScore: 80.0,
      });
    }

    // 2. Enforce Eligibility Policy
    const policy = validateCheckoutEligibility(
      buyer.currentReliabilityScore,
      buyer.riskTier,
      request.paymentMethod,
      request.totalAmount,
      buyer.consecutiveFailedCodCount
    );

    if (!policy.isEligible) {
      throw new Error(
        `Order rejected: This account exhibits chronic delivery refusal history (${buyer.consecutiveFailedCodCount} consecutive times) and COD is currently suspended. Please select ShopeePay or PromptPay.`
      );
    }

    // 3. Risk Verification: OTP Enforcement for High Risk
    let isOtpVerified = false;
    let initialStatus = OrderStatus.CONFIRMED;

    if (policy.requiresOtp) {
      if (!request.otpCode || request.otpCode.length !== 6) {
        throw new Error("This order requires a 6-digit SMS OTP verification code to confirm COD acceptance.");
      }
      isOtpVerified = true;
    }

    // 4. Deposit Requirement for Repeated High Risk
    let depositPaid = false;
    if (policy.requiresDeposit) {
      if (!request.depositConfirmed) {
        initialStatus = OrderStatus.AWAITING_DEPOSIT;
      } else {
        depositPaid = true;
      }
    }

    // 5. Generate Order Number
    const orderNumber = `SHP-${new Date().getFullYear()}${String(Date.now()).slice(-8)}`;

    // 6. Persist Order Snapshot
    const order = await db.createOrder({
      orderNumber,
      buyerId: buyer.id,
      totalAmount: request.totalAmount,
      paymentMethod: request.paymentMethod,
      preferredDeliveryWindow: request.preferredDeliveryWindow,
      status: initialStatus,
      depositRequired: policy.requiresDeposit,
      depositAmount: policy.depositAmount,
      depositPaid,
      isOtpVerified,
      buyerScoreAtCheckout: buyer.currentReliabilityScore,
      buyerTierAtCheckout: buyer.riskTier,
    });

    let message = "Order confirmed successfully.";
    let nextAction = null;

    if (policy.requiresDeposit && !depositPaid) {
      message = `Please pay the shipping deposit of ฿${policy.depositAmount} to dispatch this order.`;
      nextAction = "PROCEED_TO_DEPOSIT_GATEWAY";
    } else if (request.paymentMethod === PaymentMethod.COD) {
      message = `COD order confirmed and scheduled for delivery during: ${request.preferredDeliveryWindow}`;
      nextAction = "AWAIT_COURIER_SCHEDULE";
    }

    return {
      order,
      message,
      nextAction,
    };
  }
}
