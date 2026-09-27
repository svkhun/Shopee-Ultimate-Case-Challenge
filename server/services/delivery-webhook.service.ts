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
      throw new Error(`Order with reference ${payload.orderNumber} not found`);
    }

    // 2. Idempotency Check: Prevent duplicate status processing
    if (order.status === OrderStatus.DELIVERED || order.status === OrderStatus.RETURNED_TO_ORIGIN) {
      return {
        success: true,
        orderNumber: order.orderNumber,
        previousStatus: order.status,
        newStatus: order.status,
        scoreAdjustment: null,
        notes: "Webhook idempotent: Order already in terminal status. Skipped duplicate score adjustment.",
      };
    }

    // 3. Fetch Buyer
    const buyer = await db.findBuyerByIdOrExternal(order.buyerId);
    if (!buyer) {
      throw new Error(`Buyer profile for order ${order.orderNumber} not found`);
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
        reason: `Delivered and collected payment successfully (Courier: ${payload.courierCode}, Tracking: ${payload.trackingNumber})`,
        metadata: { courier: payload.courierCode, tracking: payload.trackingNumber },
      });

      notes = `Delivered successfully: Buyer score increased by +${delta} points (${previousScore} -> ${updatedScore})`;
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
        reason: `Returned to origin / Package refused (Reason: ${payload.failureReasonCode || "UNKNOWN"}, Courier: ${payload.courierCode})`,
        metadata: {
          courier: payload.courierCode,
          tracking: payload.trackingNumber,
          reasonCode: payload.failureReasonCode,
        },
      });

      notes = `Returned to origin: Buyer score deducted by ${delta} points (${previousScore} -> ${updatedScore}), total streak ${buyer.consecutiveFailedCodCount} failures`;
    } else if (payload.deliveryStatus === "FAILED_ATTEMPT") {
      // First attempt failed (e.g. buyer not at home), no score penalty yet
      notes = `First delivery attempt failed (Reason: ${payload.failureReasonCode || "Customer not at home"}); no penalty applied, rescheduling alert sent`;
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
