"""
Domain Risk Policy & Dynamic Feedback Engine
Implements the rules from the Shopee Ultimate Case Challenge (SUCC) PDF:
- Slide 2: 4-Tier Buyer Risk Intervention Policy
- Slide 3: Dynamic Score Feedback Loop (+8 Delivered, -20 RTO) & EasySell Fraud Shield
- Slide 4: Preferred Delivery Window Boost (+24% first-attempt success)
- Slide 5: Strategic Pillars (Targeted, Progressive, Recoverable) & Reverse Logistics Shield
"""

from typing import Dict, Any, List
from src.model_engine import calculate_risk_tier

class RiskPolicyEngine:
    @staticmethod
    def apply_delivery_feedback(
        current_score: float,
        current_consecutive_failed: int,
        delivery_event: str,
        reason: str = "DELIVERED"
    ) -> Dict[str, Any]:
        """
        Dynamic Feedback Loop:
        - Successful delivery: +8 score points, resets consecutive failures to 0
        - Failed / Returned To Origin (RTO): -20 score points, increments consecutive failures +1
        """
        old_score = current_score
        old_consecutive = current_consecutive_failed
        old_tier = calculate_risk_tier(old_score)

        if delivery_event.upper() == "DELIVERED":
            score_delta = +8.0
            new_score = min(100.0, old_score + score_delta)
            new_consecutive = 0
            event_type = "DELIVERED_SUCCESS"
            event_message = "Parcel successfully accepted and collected by buyer. Awarded +8 Reliability Score points."
        elif delivery_event.upper() in ["FAILED", "RETURNED_TO_ORIGIN", "RTO", "BUYER_REJECTED"]:
            score_delta = -20.0
            new_score = max(0.0, old_score + score_delta)
            new_consecutive = old_consecutive + 1
            event_type = "RETURNED_TO_ORIGIN"
            event_message = f"Parcel delivery failed ({reason}). Deducted -20 Reliability Score points. Consecutive failures: {new_consecutive}."
        else:
            score_delta = 0.0
            new_score = old_score
            new_consecutive = old_consecutive
            event_type = "NO_CHANGE"
            event_message = "Delivery event pending or neutral. No score modification applied."

        new_tier = calculate_risk_tier(new_score)
        tier_changed = (old_tier["tier"] != new_tier["tier"])

        return {
            "event_type": event_type,
            "old_score": round(old_score, 1),
            "new_score": round(new_score, 1),
            "score_delta": score_delta,
            "old_consecutive_failures": old_consecutive,
            "new_consecutive_failures": new_consecutive,
            "old_tier": old_tier["tier_display"],
            "new_tier": new_tier["tier_display"],
            "badge_color": new_tier["badge_color"],
            "tier_changed": tier_changed,
            "current_policy_action": new_tier["action"],
            "message": event_message
        }

    @staticmethod
    def evaluate_easysell_shield(
        order_amount_thb: float,
        buyer_score: float,
        address_changed: bool,
        phone_verified: bool
    ) -> Dict[str, Any]:
        """
        EasySell Seller Protection (Slide 3):
        Protects merchants against fake buyers, burner accounts, and address hijacking.
        """
        flags: List[str] = []
        is_suspicious = False

        if address_changed and not phone_verified:
            flags.append("Address altered within 48h on unverified phone account (High Risk of Hijacking)")
            is_suspicious = True

        if order_amount_thb > 3000 and buyer_score < 40:
            flags.append(f"High-value parcel (THB {order_amount_thb:,.0f}) ordered by low-reliability account ({buyer_score})")
            is_suspicious = True

        return {
            "seller_protection_active": True,
            "is_suspicious_order": is_suspicious,
            "fraud_flags": flags if flags else ["Clean order footprint; safe for automated merchant fulfillment"],
            "insurance_coverage": "Eligible for Shopee EasySell Reverse Logistics Subsidy" if not is_suspicious else "Pending Buyer Verification Hold"
        }
