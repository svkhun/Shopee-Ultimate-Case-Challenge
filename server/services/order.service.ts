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
        `คำสั่งซื้อถูกปฏิเสธ: บัญชีของคุณมีประวัติพัสดุตีกลับซ้ำซาก (${buyer.consecutiveFailedCodCount} ครั้ง) ไม่สามารถใช้ COD ได้ กรุณาเลือกชำระล่วงหน้าผ่าน ShopeePay หรือ PromptPay`
      );
    }

    // 3. Risk Verification: OTP Enforcement for High Risk
    let isOtpVerified = false;
    let initialStatus = OrderStatus.CONFIRMED;

    if (policy.requiresOtp) {
      if (!request.otpCode || request.otpCode.length !== 6) {
        throw new Error("คำสั่งซื้อนี้ต้องการรหัสยืนยัน OTP 6 หลัก เพื่อยืนยันการรับพัสดุ COD");
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

    let message = "คำสั่งซื้อได้รับการยืนยันเรียบร้อยแล้ว";
    let nextAction = null;

    if (policy.requiresDeposit && !depositPaid) {
      message = `กรุณาชำระมัดจำค่าจัดส่ง ฿${policy.depositAmount} เพื่อให้ผู้ขายจัดส่งพัสดุ`;
      nextAction = "PROCEED_TO_DEPOSIT_GATEWAY";
    } else if (request.paymentMethod === PaymentMethod.COD) {
      message = `คำสั่งซื้อ COD ได้รับการยืนยัน พร้อมจัดส่งตามช่วงเวลา: ${request.preferredDeliveryWindow}`;
      nextAction = "AWAIT_COURIER_SCHEDULE";
    }

    return {
      order,
      message,
      nextAction,
    };
  }
}
