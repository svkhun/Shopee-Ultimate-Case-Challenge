/**
 * Application Service: 3PL Delivery Webhook Processor & Reliability Feedback Loop
 * Architecture Standard: K-Sentinel Enterprise Event Ledger
 */

import { db } from "../db/database";
import { DeliveryWebhookRequest } from "../dto/schemas";
import { evaluateScoreAdjustment } from "../domain/scoring-policy";
import { OrderStatus, ScoreLog, RiskTier } from "../domain/models";

export interface WebhookProcessResult {
  success: boolean;
  orderNumber: string;
  previousStatus: OrderStatus;
  newStatus: OrderStatus;
  scoreAdjustment: {
    applied: boolean;
    previousScore: number;
    newScore: number;
    delta: number;
    previousTier: RiskTier;
    newTier: RiskTier;
  } | null;
  auditLogId?: string;
  notes: string;
}

export class DeliveryWebhookService {
  public static async processWebhook(payload: DeliveryWebhookRequest): Promise<WebhookProcessResult> {
    // 1. Fetch Order by Reference
    const order = await db.findOrderByIdOrNumber(payload.orderNumber);
    if (!order) {
      throw new Error(`ไม่พบคำสั่งซื้อหมายเลข ${payload.orderNumber}`);
    }

    // 2. Idempotency Check: Prevent duplicate status processing
    if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.RETURNED_TO_ORIGIN) {
      return {
        success: true,
        orderNumber: order.orderNumber,
        previousStatus: order.status,
        newStatus: order.status,
        scoreAdjustment: null,
        notes: "Webhook idempotent: ออเดอร์นี้ได้รับสถานะสิ้นสุดแล้ว ระบบข้ามการปรับคะแนนซ้ำ",
      };
    }

    // 3. Fetch Buyer
    const buyer = await db.findBuyerByIdOrExternal(order.buyerId);
    if (!buyer) {
      throw new Error(`ไม่พบข้อมูลผู้ซื้อของออเดอร์ ${order.orderNumber}`);
    }

    const previousStatus = order.status;
    const previousScore = buyer.currentReliabilityScore;
    const previousTier = buyer.riskTier;

    let newStatus: OrderStatus = order.status;
    let scoreApplied = false;
    let delta = 0;
    let updatedScore = previousScore;
    let updatedTier = previousTier;
    let auditLog: ScoreLog | undefined;
    let notes = "";

    // 4. Branch by Delivery Resolution
    if (payload.deliveryStatus === "DELIVERED") {
      newStatus = OrderStatus.DELIVERED;
      const evaluation = evaluateScoreAdjustment(previousScore, "DELIVERED");

      delta = evaluation.scoreDelta;
      updatedScore = evaluation.newScore;
      updatedTier = evaluation.newTier;
      scoreApplied = true;

      // Update Buyer Aggregates
      buyer.currentReliabilityScore = updatedScore;
      buyer.riskTier = updatedTier;
      buyer.consecutiveFailedCodCount = 0; // Reset streak
      buyer.totalCompletedOrders += 1;
      await db.saveBuyer(buyer);

      // Audit Log Entry
      auditLog = await db.appendScoreLog({
        buyerId: buyer.id,
        orderId: order.id,
        eventType: "DELIVERY_SUCCESS",
        previousScore,
        newScore: updatedScore,
        scoreDelta: delta,
        previousTier,
        newTier: updatedTier,
        reason: `จัดส่งพัสดุสำเร็จและชำระเงินเรียบร้อย (Courier: ${payload.courierCode}, Tracking: ${payload.trackingNumber})`,
        metadata: { courier: payload.courierCode, tracking: payload.trackingNumber },
      });

      notes = `จัดส่งสำเร็จ: คะแนนผู้ซื้อเพิ่มขึ้น +${delta} คะแนน (${previousScore} -> ${updatedScore})`;
    } else if (payload.deliveryStatus === "RETURNED_TO_ORIGIN") {
      newStatus = OrderStatus.RETURNED_TO_ORIGIN;
      const evaluation = evaluateScoreAdjustment(previousScore, "RETURNED_TO_ORIGIN");

      delta = evaluation.scoreDelta;
      updatedScore = evaluation.newScore;
      updatedTier = evaluation.newTier;
      scoreApplied = true;

      // Update Buyer Aggregates
      buyer.currentReliabilityScore = updatedScore;
      buyer.riskTier = updatedTier;
      buyer.consecutiveFailedCodCount += 1; // Increment failed streak
      buyer.totalFailedOrders += 1;
      await db.saveBuyer(buyer);

      // Audit Log Entry
      auditLog = await db.appendScoreLog({
        buyerId: buyer.id,
        orderId: order.id,
        eventType: "DELIVERY_FAILURE",
        previousScore,
        newScore: updatedScore,
        scoreDelta: delta,
        previousTier,
        newTier: updatedTier,
        reason: `พัสดุตีกลับ/ปฏิเสธรับสินค้า (Reason: ${payload.failureReasonCode || "UNKNOWN"}, Courier: ${payload.courierCode})`,
        metadata: {
          courier: payload.courierCode,
          tracking: payload.trackingNumber,
          reasonCode: payload.failureReasonCode,
        },
      });

      notes = `พัสดุตีกลับ: คะแนนผู้ซื้อลดลง ${delta} คะแนน (${previousScore} -> ${updatedScore}), สะสมล้มเหลว ${buyer.consecutiveFailedCodCount} ครั้ง`;
    } else if (payload.deliveryStatus === "FAILED_ATTEMPT") {
      // First attempt failed (e.g. buyer not at home), no score penalty yet
      notes = `พยายามจัดส่งครั้งแรกไม่สำเร็จ (เหตุผล: ${payload.failureReasonCode || "ไม่อยู่บ้าน"}), ยังไม่หักคะแนน ระบบส่งแจ้งเตือนนัดหมายใหม่`;
    }

    // 5. Update Order
    order.status = newStatus;
    await db.saveOrder(order);

    return {
      success: true,
      orderNumber: order.orderNumber,
      previousStatus,
      newStatus,
      scoreAdjustment: scoreApplied
        ? {
            applied: true,
            previousScore,
            newScore: updatedScore,
            delta,
            previousTier,
            newTier: updatedTier,
          }
        : null,
      auditLogId: auditLog?.id,
      notes,
    };
  }
}
