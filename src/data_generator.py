"""
Synthetic Data Generation Engine for Shopee COD Reliability & Risk Analysis
Modeled after KBTG-grade financial & e-commerce risk engineering methodologies.
Generates empirical dataset strictly aligned with Shopee Ultimate Case Challenge (SUCC) PDF parameters:
  - 35% COD orders / 65% Non-COD (Prepaid) orders
  - COD failure rate: 2.61% vs Non-COD failure rate: 0.25% (10.6x risk ratio)
  - 85% of total platform failed deliveries concentrated in COD orders
  - Preferred delivery window interaction effect: +24% first-attempt success rate
"""

import os
import random
import numpy as np
import pandas as pd

def generate_synthetic_dataset(num_orders: int = 50000, num_buyers: int = 12000, seed: int = 42):
    np.random.seed(seed)
    random.seed(seed)

    print(f"Generating {num_buyers} unique buyer profiles...")
    buyer_ids = [f"BUYER-{i+1:05d}" for i in range(num_buyers)]

    # Generate Buyer Historical Profiles
    # Segment distribution: ~82% low risk, ~12% medium risk, ~4% high risk, ~2% repeated high risk
    buyer_segments = np.random.choice(
        ["LOW_RISK", "MEDIUM_RISK", "HIGH_RISK", "REPEATED_HIGH_RISK"],
        size=num_buyers,
        p=[0.82, 0.12, 0.04, 0.02]
    )

    buyer_records = []
    for b_id, seg in zip(buyer_ids, buyer_segments):
        if seg == "LOW_RISK":
            account_age_days = random.randint(180, 1800)
            hist_orders = random.randint(10, 80)
            hist_success_rate = round(random.uniform(0.95, 1.00), 3)
            consecutive_failed = 0
            reliability_score = round(random.uniform(82, 98), 1)
            phone_verified = 1
            address_changed = np.random.choice([0, 1], p=[0.92, 0.08])
        elif seg == "MEDIUM_RISK":
            account_age_days = random.randint(30, 700)
            hist_orders = random.randint(3, 25)
            hist_success_rate = round(random.uniform(0.80, 0.94), 3)
            consecutive_failed = np.random.choice([0, 1], p=[0.75, 0.25])
            reliability_score = round(random.uniform(55, 79), 1)
            phone_verified = np.random.choice([1, 0], p=[0.90, 0.10])
            address_changed = np.random.choice([0, 1], p=[0.80, 0.20])
        elif seg == "HIGH_RISK":
            account_age_days = random.randint(15, 365)
            hist_orders = random.randint(2, 15)
            hist_success_rate = round(random.uniform(0.60, 0.79), 3)
            consecutive_failed = np.random.choice([1, 2], p=[0.60, 0.40])
            reliability_score = round(random.uniform(32, 49), 1)
            phone_verified = np.random.choice([1, 0], p=[0.70, 0.30])
            address_changed = np.random.choice([0, 1], p=[0.65, 0.35])
        else: # REPEATED_HIGH_RISK
            account_age_days = random.randint(7, 180)
            hist_orders = random.randint(2, 10)
            hist_success_rate = round(random.uniform(0.20, 0.58), 3)
            consecutive_failed = random.randint(3, 6)
            reliability_score = round(random.uniform(8, 28), 1)
            phone_verified = np.random.choice([1, 0], p=[0.50, 0.50])
            address_changed = np.random.choice([0, 1], p=[0.40, 0.60])

        buyer_records.append({
            "buyer_id": b_id,
            "risk_tier": seg,
            "account_age_days": account_age_days,
            "historical_orders": hist_orders,
            "historical_success_rate": hist_success_rate,
            "consecutive_failed_cods": consecutive_failed,
            "reliability_score": reliability_score,
            "phone_verified": phone_verified,
            "address_changed_recently": address_changed
        })

    df_buyers = pd.DataFrame(buyer_records)

    print(f"Generating {num_orders} synthetic order transactions...")
    categories = ["Fashion", "Electronics", "Beauty_Personal_Care", "Home_Living", "Mom_Baby", "FMCG"]
    couriers = ["Shopee_Xpress", "Flash_Express", "J_and_T", "Kerry_Express"]
    delivery_windows = ["MORNING", "AFTERNOON", "EVENING", "WEEKEND", "NONE"]

    # 35% COD vs 65% Non-COD (Prepaid) strictly matching Slide 1
    payment_methods = np.random.choice(
        ["COD", "PREPAID"],
        size=num_orders,
        p=[0.35, 0.65]
    )

    assigned_buyers_idx = np.random.choice(len(buyer_records), size=num_orders)

    order_records = []
    for i in range(num_orders):
        order_id = f"SHP-2026-{i+1:06d}"
        b = buyer_records[assigned_buyers_idx[i]]
        is_cod = (payment_methods[i] == "COD")

        cat = random.choice(categories)
        if cat == "Electronics":
            amount = round(random.uniform(350, 4500), 2)
        elif cat == "Fashion":
            amount = round(random.uniform(120, 1800), 2)
        elif cat == "Beauty_Personal_Care":
            amount = round(random.uniform(100, 1200), 2)
        else:
            amount = round(random.uniform(80, 950), 2)

        # Delivery window: 45% of buyers actively select window when prompted
        window = np.random.choice(delivery_windows, p=[0.12, 0.14, 0.15, 0.10, 0.49])
        window_selected = 1 if window != "NONE" else 0

        distance_km = round(random.uniform(1.2, 45.0), 1)
        courier = random.choice(couriers)

        # Target Failure Probability Calculation matching PDF baseline
        # Baseline COD: 2.61%, Non-COD: 0.25%
        if not is_cod:
            # Prepaid orders have very low failure probability (0.25%)
            prob_fail = 0.0025
        else:
            # COD order baseline calibrated to hit exact 2.61% overall
            if b["risk_tier"] == "LOW_RISK":
                prob_fail = 0.0068 # 0.68%
            elif b["risk_tier"] == "MEDIUM_RISK":
                prob_fail = 0.0400 # 4.0%
            elif b["risk_tier"] == "HIGH_RISK":
                prob_fail = 0.1700 # 17.0%
            else: # REPEATED_HIGH_RISK
                prob_fail = 0.5300 # 53.0%

            # Interaction effect: Selecting a preferred delivery window cuts failure by ~24%
            if window_selected == 1:
                prob_fail *= 0.76

            # Phone unverified or address changed increases risk
            if b["phone_verified"] == 0:
                prob_fail *= 1.20
            if b["address_changed_recently"] == 1:
                prob_fail *= 1.15

            # Order amount impact on COD: higher amount without verification increases refusal risk
            if amount > 2000 and b["risk_tier"] in ["HIGH_RISK", "REPEATED_HIGH_RISK"]:
                prob_fail *= 1.20

            # Cap probability
            prob_fail = min(max(prob_fail, 0.001), 0.95)

        # Sample outcome from Bernoulli trial
        is_failed = 1 if (random.random() < prob_fail) else 0

        if is_failed:
            delivery_status = "RETURNED_TO_ORIGIN"
            attempts = random.choice([2, 3])
            failure_reason = random.choice([
                "Customer refused package",
                "Unreachable customer phone",
                "Not at home / No cash available",
                "Fake or invalid address",
                "Cancellation during delivery run"
            ]) if is_cod else "Unreachable address after multiple attempts"
        else:
            delivery_status = "DELIVERED"
            # If window selected, 1st attempt success is ~88% vs ~71% without window
            p_first_attempt = 0.88 if window_selected else 0.71
            attempts = 1 if (random.random() < p_first_attempt) else 2
            failure_reason = "NONE"

        order_records.append({
            "order_id": order_id,
            "buyer_id": b["buyer_id"],
            "buyer_risk_tier": b["risk_tier"],
            "buyer_reliability_score": b["reliability_score"],
            "buyer_historical_success_rate": b["historical_success_rate"],
            "buyer_consecutive_failed_cods": b["consecutive_failed_cods"],
            "buyer_account_age_days": b["account_age_days"],
            "buyer_phone_verified": b["phone_verified"],
            "buyer_address_changed": b["address_changed_recently"],
            "payment_method": "COD" if is_cod else "PREPAID",
            "order_amount_thb": amount,
            "item_category": cat,
            "preferred_window": window,
            "window_selected": window_selected,
            "courier_code": courier,
            "delivery_distance_km": distance_km,
            "delivery_attempts": attempts,
            "delivery_status": delivery_status,
            "failure_reason": failure_reason,
            "is_failed_delivery": is_failed
        })

    df_orders = pd.DataFrame(order_records)

    # Save to data directory
    os.makedirs("data", exist_ok=True)
    df_orders.to_csv("data/shopee_cod_orders.csv", index=False)
    df_buyers.to_csv("data/buyer_profiles.csv", index=False)

    print("Synthetic dataset successfully generated and saved to 'data/' folder.")
    print(f"Total Orders: {len(df_orders):,}")
    print(f"Total Buyers: {len(df_buyers):,}")
    
    # Verify statistical alignment with PDF
    cod_orders = df_orders[df_orders["payment_method"] == "COD"]
    non_cod_orders = df_orders[df_orders["payment_method"] == "PREPAID"]
    
    cod_fail_rate = cod_orders["is_failed_delivery"].mean() * 100
    non_cod_fail_rate = non_cod_orders["is_failed_delivery"].mean() * 100
    risk_ratio = cod_fail_rate / max(non_cod_fail_rate, 0.0001)
    
    total_fails = df_orders["is_failed_delivery"].sum()
    cod_fails = cod_orders["is_failed_delivery"].sum()
    cod_share_of_fails = (cod_fails / total_fails) * 100 if total_fails > 0 else 0

    print("\n=== PDF EMPIRICAL VERIFICATION CHECK ===")
    print(f"1. COD Share of Total Orders: {len(cod_orders)/len(df_orders)*100:.1f}% (PDF Target: 35%)")
    print(f"2. COD Failed Delivery Rate: {cod_fail_rate:.2f}% (PDF Target: 2.61%)")
    print(f"3. Non-COD Failed Delivery Rate: {non_cod_fail_rate:.2f}% (PDF Target: 0.25%)")
    print(f"4. Risk Disparity Ratio: {risk_ratio:.1f}x (PDF Target: 10.6x)")
    print(f"5. COD Share of All Failed Deliveries: {cod_share_of_fails:.1f}% (PDF Target: 85%)")

    return df_orders, df_buyers

if __name__ == "__main__":
    generate_synthetic_dataset()
