"""
Shopee Ultimate Case Challenge (SUCC) - Smart COD Reliability System
FastAPI Backend Application
Serves RESTful APIs for Machine Learning Risk Scoring, Empirical EDA Metrics,
and hosts the modern pure HTML/CSS/JavaScript Executive Presentation & Analytics Portal.
"""

import json
import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel, Field
import pandas as pd

from src.model_engine import CODScoringEngine, calculate_risk_tier
from src.risk_policy import RiskPolicyEngine

app = FastAPI(
    title="Shopee Smart COD Reliability Intelligence API",
    description="Backend service for COD risk scoring, empirical data science analytics, and policy automation.",
    version="2.0.0",
)

# Enable CORS for cross-origin integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML Engine
ml_engine = CODScoringEngine.get_instance()

# Pydantic Schemas
class RiskPredictionRequest(BaseModel):
    order_id: Optional[str] = "ORD-LIVE-001"
    buyer_reliability_score: float = Field(default=85.0, ge=0.0, le=100.0)
    buyer_historical_success_rate: float = Field(default=0.95, ge=0.0, le=1.0)
    buyer_consecutive_failed_cods: int = Field(default=0, ge=0, le=10)
    buyer_account_age_days: int = Field(default=365, ge=1)
    buyer_phone_verified: int = Field(default=1, ge=0, le=1)
    buyer_address_changed: int = Field(default=0, ge=0, le=1)
    order_amount_thb: float = Field(default=450.0, ge=10.0)
    window_selected: int = Field(default=0, ge=0, le=1)
    delivery_distance_km: float = Field(default=12.0, ge=0.5)
    item_category: str = Field(default="Fashion")
    courier_code: str = Field(default="Shopee_Xpress")

class DeliveryFeedbackRequest(BaseModel):
    current_score: float = Field(default=75.0, ge=0.0, le=100.0)
    current_consecutive_failed: int = Field(default=0, ge=0)
    delivery_event: str = Field(default="DELIVERED")  # "DELIVERED" or "RETURNED_TO_ORIGIN"
    reason: Optional[str] = "Buyer accepted delivery"

class EasySellCheckRequest(BaseModel):
    order_amount_thb: float = Field(default=1200.0)
    buyer_score: float = Field(default=85.0)
    address_changed: bool = Field(default=False)
    phone_verified: bool = Field(default=True)

# -------------------------------------------------------------
# REST API Endpoints
# -------------------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "HEALTHY",
        "service": "Shopee Smart COD Reliability System",
        "ml_model_loaded": ml_engine.model is not None,
        "runtime": "Python 3.13 FastAPI"
    }

@app.get("/api/eda/metrics")
def get_eda_metrics():
    """Returns empirical statistical findings directly verifying the 5 slides of the PDF."""
    summary_path = "data/eda_summary.json"
    if not os.path.exists(summary_path):
        raise HTTPException(status_code=404, detail="EDA summary data not found. Please run src/eda_analysis.py")
    with open(summary_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data

@app.get("/api/model/summary")
def get_model_summary():
    """Returns model metrics, ROC-AUC, PR-AUC, confusion matrix, and feature rankings."""
    metrics_path = "models/model_metrics.json"
    if not os.path.exists(metrics_path):
        raise HTTPException(status_code=404, detail="Model metrics artifact not found.")
    with open(metrics_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data

@app.post("/api/predict/risk")
def predict_cod_risk(req: RiskPredictionRequest):
    """
    Executes real-time ML risk scoring.
    Computes calibrated failure probability, maps to Reliability Score (0-100),
    and assigns Shopee risk intervention tier.
    """
    try:
        result = ml_engine.score_transaction(req.model_dump())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/orders/simulate-feedback")
def simulate_order_feedback(req: DeliveryFeedbackRequest):
    """
    Simulates dynamic scoring feedback loop (+8 for DELIVERED, -25 for RETURNED_TO_ORIGIN).
    Demonstrates self-correcting buyer credit tier transitions.
    """
    return RiskPolicyEngine.apply_delivery_feedback(
        current_score=req.current_score,
        current_consecutive_failed=req.current_consecutive_failed,
        delivery_event=req.delivery_event,
        reason=req.reason
    )

@app.post("/api/orders/easysell-check")
def check_easysell(req: EasySellCheckRequest):
    """
    Evaluates EasySell fraud protection rules against high-risk anomalies.
    """
    return RiskPolicyEngine.evaluate_easysell_shield(
        order_amount_thb=req.order_amount_thb,
        buyer_score=req.buyer_score,
        address_changed=req.address_changed,
        phone_verified=req.phone_verified
    )

@app.get("/api/dataset/sample")
def get_dataset_sample(limit: int = 15, payment_method: Optional[str] = None):
    """
    Returns a sample of synthetic Shopee orders from the CSV for live exploration.
    """
    csv_path = "data/shopee_cod_orders.csv"
    if not os.path.exists(csv_path):
        raise HTTPException(status_code=404, detail="Dataset CSV not found.")
    
    df = pd.read_csv(csv_path)
    if payment_method:
        df = df[df["payment_method"] == payment_method.upper()]
    
    sample = df.sample(min(limit, len(df)), random_state=42).to_dict(orient="records")
    return {
        "total_records_in_dataset": len(df),
        "sample_size": len(sample),
        "records": sample
    }

# Mount static files directory
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def serve_index():
    return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting Shopee Smart COD Reliability Portal on http://127.0.0.1:{port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
