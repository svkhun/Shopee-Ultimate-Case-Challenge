/**
 * Application Service: Checkout Validation & Pre-Shipment Interventions
 * Architecture Standard: K-Sentinel Risk Engine
 */

import { db } from "../db/database";
import { CheckoutValidationRequest } from "../dto/schemas";
import { validateCheckoutEligibility, CheckoutEligibilityResult } from "../domain/eligibility-policy";
import { PreferredDeliveryWindow } from "../domain/models";

export interface CheckoutValidationResponse {
  allowed: boolean;
  buyer: {
    id: string;
    externalId: string;
    name: string;
    reliabilityScore: number;
    riskTier: string;
  };
  policy: CheckoutEligibilityResult;
  deliveryWindowOptions: Array<{
    slot: PreferredDeliveryWindow;
    time: string;
    label: string;
    isRecommended: boolean;
  }>;
}

export class CheckoutService {
  public static async validate(request: CheckoutValidationRequest): Promise<CheckoutValidationResponse> {
    // 1. Fetch Buyer by ID or external reference
    let buyer = await db.findBuyerByIdOrExternal(request.buyerId);

    // If new buyer, auto-seed with neutral safe tier
    if (!buyer) {
      buyer = await db.createBuyer({
        externalBuyerId: request.buyerId,
        fullName: `New Shopee Buyer (${request.buyerId})`,
        phoneNumber: "+66800000000",
        email: `${request.buyerId.toLowerCase()}@shopee-buyer.th`,
        initialScore: 80.0,
      });
    }

    // 2. Evaluate Pure Domain Policy
    const policyResult = validateCheckoutEligibility(
      buyer.currentReliabilityScore,
      buyer.riskTier,
      request.paymentMethod,
      request.orderTotal,
      buyer.consecutiveFailedCodCount
    );

    // 3. Recommended Delivery Windows
    const deliveryWindowOptions = [
      {
        slot: PreferredDeliveryWindow.MORNING,
        time: "09:00 - 12:00",
        label: "ช่วงเช้า (Morning)",
        isRecommended: false,
      },
      {
        slot: PreferredDeliveryWindow.AFTERNOON,
        time: "13:00 - 17:00",
        label: "ช่วงบ่าย (Afternoon)",
        isRecommended: false,
      },
      {
        slot: PreferredDeliveryWindow.EVENING,
        time: "17:00 - 20:00",
        label: "ช่วงค่ำ (Evening - เลิกงาน)",
        isRecommended: true, // highest first-attempt rate
      },
      {
        slot: PreferredDeliveryWindow.WEEKEND,
        time: "เสาร์-อาทิตย์ (10:00 - 16:00)",
        label: "วันหยุดสุดสัปดาห์ (Weekend)",
        isRecommended: false,
      },
    ];

    return {
      allowed: policyResult.isEligible,
      buyer: {
        id: buyer.id,
        externalId: buyer.externalBuyerId,
        name: buyer.fullName,
        reliabilityScore: buyer.currentReliabilityScore,
        riskTier: buyer.riskTier,
      },
      policy: policyResult,
      deliveryWindowOptions,
    };
  }
}
