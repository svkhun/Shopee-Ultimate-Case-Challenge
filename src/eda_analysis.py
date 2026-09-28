"""
Exploratory Data Analysis & Empirical PDF Verification
Shopee Ultimate Case Challenge (SUCC) - Data Science & Analytics Standards.
Analyzes the Shopee COD order dataset against the 5 slides of the Shopee Ultimate Case Challenge (SUCC) PDF.
Produces statistical proofs and exports structured insights to 'data/eda_summary.json'.
"""

import json
import os
import numpy as np
import pandas as pd
from scipy import stats

def run_eda_analysis(orders_csv: str = "data/shopee_cod_orders_example.csv", buyers_csv: str = "data/buyer_profiles.csv"):
    if not os.path.exists(orders_csv) and os.path.exists("data/shopee_cod_orders.csv"):
        orders_csv = "data/shopee_cod_orders.csv"
    print("Loading synthetic dataset for empirical statistical validation...")
    df_orders = pd.read_csv(orders_csv)
    df_buyers = pd.read_csv(buyers_csv)

    total_orders = len(df_orders)
    total_buyers = len(df_buyers)

    cod_df = df_orders[df_orders["payment_method"] == "COD"]
    prepaid_df = df_orders[df_orders["payment_method"] == "PREPAID"]

    # 1. Slide 1 Proof: 10.6x Higher COD Risk & 35% Mix & 85% Failure Concentration
    cod_count = len(cod_df)
    prepaid_count = len(prepaid_df)
    cod_order_pct = round((cod_count / total_orders) * 100, 2)
    prepaid_order_pct = round((prepaid_count / total_orders) * 100, 2)

    cod_failed_count = int(cod_df["is_failed_delivery"].sum())
    prepaid_failed_count = int(prepaid_df["is_failed_delivery"].sum())
    total_failed_count = cod_failed_count + prepaid_failed_count

    cod_fail_rate_pct = round((cod_failed_count / cod_count) * 100, 2)
    prepaid_fail_rate_pct = round((prepaid_failed_count / prepaid_count) * 100, 2)
    risk_multiplier = round((cod_failed_count / cod_count) / max(prepaid_failed_count / prepaid_count, 1e-6), 1)

    cod_share_of_all_failures = round((cod_failed_count / total_failed_count) * 100, 1) if total_failed_count > 0 else 0.0

    # Two-proportion Z-test for statistical significance
    count = np.array([cod_failed_count, prepaid_failed_count])
    nobs = np.array([cod_count, prepaid_count])
    # Pooled probability
    p_pool = (cod_failed_count + prepaid_failed_count) / (cod_count + prepaid_count)
    se = np.sqrt(p_pool * (1 - p_pool) * (1/cod_count + 1/prepaid_count))
    z_stat = (cod_fail_rate_pct/100 - prepaid_fail_rate_pct/100) / se
    p_val = 2 * (1 - stats.norm.cdf(abs(z_stat)))

    # 2. Slide 2: Buyer Risk Tier Segmentation Breakdown
    tier_stats = {}
    for tier in ["LOW_RISK", "MEDIUM_RISK", "HIGH_RISK", "REPEATED_HIGH_RISK"]:
        sub_buyers = df_buyers[df_buyers["risk_tier"] == tier]
        sub_orders = df_orders[df_orders["buyer_risk_tier"] == tier]
        sub_cod = sub_orders[sub_orders["payment_method"] == "COD"]
        
        tier_stats[tier] = {
            "buyer_count": len(sub_buyers),
            "buyer_share_pct": round((len(sub_buyers) / total_buyers) * 100, 1),
            "avg_reliability_score": round(float(sub_buyers["reliability_score"].mean()), 1),
            "avg_historical_success_rate": round(float(sub_buyers["historical_success_rate"].mean()) * 100, 1),
            "avg_consecutive_failed_cods": round(float(sub_buyers["consecutive_failed_cods"].mean()), 2),
            "cod_order_count": len(sub_cod),
            "cod_fail_rate_pct": round(float(sub_cod["is_failed_delivery"].mean()) * 100, 2) if len(sub_cod) > 0 else 0.0
        }

    # 3. Slide 4: Delivery Window Scheduling Optimization Impact
    window_selected_df = cod_df[cod_df["window_selected"] == 1]
    no_window_df = cod_df[cod_df["window_selected"] == 0]

    window_fail_rate = round(float(window_selected_df["is_failed_delivery"].mean()) * 100, 2)
    no_window_fail_rate = round(float(no_window_df["is_failed_delivery"].mean()) * 100, 2)
    failure_reduction_pct = round(((no_window_fail_rate - window_fail_rate) / no_window_fail_rate) * 100, 1)

    # First attempt success rate on delivered parcels
    delivered_cod = cod_df[cod_df["delivery_status"] == "DELIVERED"]
    first_attempt_window = round((delivered_cod[delivered_cod["window_selected"] == 1]["delivery_attempts"] == 1).mean() * 100, 1)
    first_attempt_no_window = round((delivered_cod[delivered_cod["window_selected"] == 0]["delivery_attempts"] == 1).mean() * 100, 1)
    first_attempt_boost = round(((first_attempt_window - first_attempt_no_window) / first_attempt_no_window) * 100, 1)

    # 4. Financial Cost-to-Serve Modeling (Reverse Logistics Waste)
    cost_per_rto_thb = 45.0  # THB reverse shipping fee + handling cost per returned parcel
    simulated_monthly_orders = 15_000_000  # Baseline Shopee monthly scale
    sim_cod_orders = simulated_monthly_orders * (cod_order_pct / 100)
    sim_cod_failures = sim_cod_orders * (cod_fail_rate_pct / 100)
    sim_monthly_loss_thb = sim_cod_failures * cost_per_rto_thb
    
    # Target 58% reduction from K-Sentinel policy interventions
    target_reduction_pct = 58.0
    sim_monthly_savings_thb = sim_monthly_loss_thb * (target_reduction_pct / 100)
    sim_annual_savings_thb = sim_monthly_savings_thb * 12

    # 5. Compile Master EDA Summary Object
    eda_summary = {
        "dataset_metrics": {
            "total_orders_sample": total_orders,
            "total_buyers_sample": total_buyers,
            "cod_order_count": cod_count,
            "prepaid_order_count": prepaid_count
        },
        "slide_1_root_cause": {
            "cod_share_of_orders_pct": cod_order_pct,
            "prepaid_share_of_orders_pct": prepaid_order_pct,
            "cod_failed_delivery_rate_pct": cod_fail_rate_pct,
            "prepaid_failed_delivery_rate_pct": prepaid_fail_rate_pct,
            "risk_multiplier": risk_multiplier,
            "cod_share_of_all_failures_pct": cod_share_of_all_failures,
            "z_statistic": round(float(z_stat), 3),
            "p_value": float(p_val),
            "is_statistically_significant": bool(p_val < 0.001)
        },
        "slide_2_buyer_segmentation": tier_stats,
        "slide_4_scheduling_impact": {
            "with_window_fail_rate_pct": window_fail_rate,
            "without_window_fail_rate_pct": no_window_fail_rate,
            "failure_reduction_from_window_pct": failure_reduction_pct,
            "first_attempt_success_with_window_pct": first_attempt_window,
            "first_attempt_success_without_window_pct": first_attempt_no_window,
            "first_attempt_relative_boost_pct": first_attempt_boost
        },
        "slide_5_financial_impact": {
            "cost_per_rto_parcel_thb": cost_per_rto_thb,
            "simulated_monthly_orders": simulated_monthly_orders,
            "monthly_reverse_logistics_waste_thb": round(sim_monthly_loss_thb, 2),
            "target_reduction_pct": target_reduction_pct,
            "estimated_monthly_savings_thb": round(sim_monthly_savings_thb, 2),
            "estimated_annual_savings_thb": round(sim_annual_savings_thb, 2)
        }
    }

    with open("data/eda_summary.json", "w", encoding="utf-8") as f:
        json.dump(eda_summary, f, indent=2, ensure_ascii=False)

    print("\n=== DATA SCIENCE EDA VALIDATION COMPLETE ===")
    print(f"Empirical Metric 1 (10.6x Risk): COD {cod_fail_rate_pct}% vs Non-COD {prepaid_fail_rate_pct}% (Ratio: {risk_multiplier}x, p-value: {p_val:.2e})")
    print(f"Empirical Metric 2 (35% Mix): COD volume is {cod_order_pct}% of total")
    print(f"Empirical Metric 3 (85% Failures): COD accounts for {cod_share_of_all_failures}% of all return parcels")
    print(f"Preferred Window Uplift: 1st-Attempt Success jumped from {first_attempt_no_window}% to {first_attempt_window}% (+{first_attempt_boost}%)")
    print(f"Financial Waste: THB {sim_monthly_loss_thb/1e6:.2f}M / month -> Potential Savings: THB {sim_monthly_savings_thb/1e6:.2f}M / month")
    print("Saved results to 'data/eda_summary.json'")

    return eda_summary

if __name__ == "__main__":
    run_eda_analysis()
