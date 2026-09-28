"""
Synthetic Data Generation Engine for Shopee COD Reliability & Risk Analysis
Modeled after production e-commerce credit risk engineering methodologies.
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

    # 35% COD (17,500) vs 65% Non-COD (Prepaid 32,500) strictly matching Slide 1
    num_cod = int(num_orders * 0.35)
    num_prepaid = num_orders - num_cod
    payment_methods = ["COD"] * num_cod + ["PREPAID"] * num_prepaid
    random.shuffle(payment_methods)

    assigned_buyers_idx = np.random.choice(len(buyer_records), size=num_orders)

    order_records = []
    cod_indices = []
    prepaid_indices = []
    prob_fails = []

    for i in range(num_orders):
        order_id = f"SHP-2026-{i+1:06d}"
        b = buyer_records[assigned_buyers_idx[i]]
        is_cod = (payment_methods[i] == "COD")
        if is_cod:
            cod_indices.append(i)
        else:
            prepaid_indices.append(i)

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

        # Calibrated risk weight based on behavioral tier
        if not is_cod:
            prob_fail = 0.0025
            if b["phone_verified"] == 0:
                prob_fail *= 1.3
            if b["address_changed_recently"] == 1:
                prob_fail *= 1.2
        else:
            if b["risk_tier"] == "LOW_RISK":
                prob_fail = 0.0065
            elif b["risk_tier"] == "MEDIUM_RISK":
                prob_fail = 0.0380
            elif b["risk_tier"] == "HIGH_RISK":
                prob_fail = 0.1650
            else: # REPEATED_HIGH_RISK
                prob_fail = 0.5400

            if window_selected == 1:
                prob_fail *= 0.76

            if b["phone_verified"] == 0:
                prob_fail *= 1.25
            if b["address_changed_recently"] == 1:
                prob_fail *= 1.20

            if amount > 2000 and b["risk_tier"] in ["HIGH_RISK", "REPEATED_HIGH_RISK"]:
                prob_fail *= 1.25

        prob_fails.append(prob_fail)

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
            "delivery_attempts": 1,
            "delivery_status": "DELIVERED",
            "failure_reason": "NONE",
            "is_failed_delivery": 0
        })

    # Exact calibration matching Slide 1:
    # 457 failed COD orders out of 17,500 = 2.61%
    # 80 failed Prepaid orders out of 32,500 = 0.25%
    # Risk ratio = 2.61 / 0.246 = 10.6x
    # COD share of all failures = 457 / 537 = 85.1%
    cod_probs = np.array([prob_fails[idx] for idx in cod_indices])
    cod_probs /= cod_probs.sum()
    failed_cod_set = set(np.random.choice(cod_indices, size=457, replace=False, p=cod_probs))

    prepaid_probs = np.array([prob_fails[idx] for idx in prepaid_indices])
    prepaid_probs /= prepaid_probs.sum()
    failed_prepaid_set = set(np.random.choice(prepaid_indices, size=80, replace=False, p=prepaid_probs))

    failed_all_set = failed_cod_set.union(failed_prepaid_set)

    # Exact delivery attempt calibration for delivered COD orders
    delivered_cod_w1 = [idx for idx in cod_indices if idx not in failed_all_set and order_records[idx]["window_selected"] == 1]
    delivered_cod_w0 = [idx for idx in cod_indices if idx not in failed_all_set and order_records[idx]["window_selected"] == 0]

    w1_att1_count = int(round(len(delivered_cod_w1) * 0.8804))
    w0_att1_count = int(round(len(delivered_cod_w0) * 0.7100))

    w1_att1_set = set(random.sample(delivered_cod_w1, w1_att1_count))
    w0_att1_set = set(random.sample(delivered_cod_w0, w0_att1_count))

    for i in range(num_orders):
        rec = order_records[i]
        is_cod = (rec["payment_method"] == "COD")
        w_sel = rec["window_selected"]

        if i in failed_all_set:
            rec["is_failed_delivery"] = 1
            rec["delivery_status"] = "RETURNED_TO_ORIGIN"
            rec["delivery_attempts"] = random.choice([2, 3])
            rec["failure_reason"] = random.choice([
                "Customer refused package",
                "Unreachable customer phone",
                "Not at home / No cash available",
                "Fake or invalid address",
                "Cancellation during delivery run"
            ]) if is_cod else "Unreachable address after multiple attempts"
        else:
            rec["is_failed_delivery"] = 0
            rec["delivery_status"] = "DELIVERED"
            if is_cod:
                if w_sel == 1:
                    rec["delivery_attempts"] = 1 if i in w1_att1_set else 2
                else:
                    rec["delivery_attempts"] = 1 if i in w0_att1_set else 2
            else:
                rec["delivery_attempts"] = 1 if (random.random() < 0.95) else 2
            rec["failure_reason"] = "NONE"

    df_orders = pd.DataFrame(order_records)

    # Save to data directory
    os.makedirs("data", exist_ok=True)
    df_orders.to_csv("data/shopee_cod_orders_example.csv", index=False)
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
