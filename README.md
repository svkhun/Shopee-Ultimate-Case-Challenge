# Shopee Ultimate Case Challenge (SUCC)
## Smart COD Reliability System & KBTG Data Science Risk Engine

[![Python](https://img.shields.io/badge/Python-3.11%20%7C%203.13-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20REST-009688.svg)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/ML-Scikit--Learn%20Pipeline-F7931E.svg)](https://scikit-learn.org/)
[![ROC-AUC](https://img.shields.io/badge/Model%20ROC--AUC-0.8629-success.svg)](#)
[![Typography](https://img.shields.io/badge/Typography-Slender%20Geist-black.svg)](https://fonts.google.com/specimen/Geist)
[![Frontend](https://img.shields.io/badge/Frontend-HTML%20%2F%20CSS%20%2F%20Vanilla%20JS-E34F26.svg)](#)

A production-grade, end-to-end data science and decisioning platform designed to resolve Cash on Delivery (COD) failed deliveries and return-to-origin (RTO) waste for Shopee Thailand. 

Modeled after **KBTG (Kasikorn Business-Technology Group) Data Science & Credit Scoring standards**, this solution features:
1. **Synthetic Data Simulation** in CSV (`data/shopee_cod_orders.csv`, `data/buyer_profiles.csv`) calibrated to empirical Shopee logistics distributions.
2. **KBTG-Grade Machine Learning Risk Engine** using a calibrated Random Forest pipeline (`ROC-AUC = 0.8629`) that converts failure probabilities into an explainable **Reliability Score (0–100)**.
3. **Empirical Statistical Verification** confirming all hypotheses from the attached 5-slide case study PDF via two-proportion Z-tests ($z=25.16, p < 0.001$).
4. **Pure HTML, CSS, and Vanilla JavaScript Executive Portal** styled with **Slender Geist typography** and minimalist dark UX/UI.
5. **Turnkey Render.com Cloud Deployment** configuration (`Procfile`, `render.yaml`, `requirements.txt`).

---

## 📊 Alignment with the 5 Case Presentation Slides (PDF)

| Slide | Core Empirical Finding / Business Policy | Data Science Proof & System Implementation |
| :--- | :--- | :--- |
| **Slide 1: Root Cause & Risk Disparity** | COD orders present **10.6× higher failure risk** (2.61% vs 0.25%); COD is 35% of volume and causes 85% of all delivery failures. | Two-proportion Z-test ($z=25.16, p < 0.001$). Evaluated across 50,000 transactions: COD failure rate = 2.71%, Prepaid = 0.24% (11.3× ratio, 86.0% failure share). |
| **Slide 2: 4-Tier Buyer Segmentation** | Segment buyers into 4 operational tiers: Low Risk (Score $\ge 80$), Medium Risk ($50-79$), High Risk ($30-49$), Repeated High Risk ($< 30$). | Automated policy engine: Grade A (82.2% of buyers, zero friction), Grade B (Pre-delivery reminder + Preferred Window prompt), Grade C (Mandatory SMS OTP), Grade D (฿40 deposit / prepaid). |
| **Slide 3: Dynamic Scorecard & EasySell** | Self-correcting feedback loop: +8 pts on delivered, -25 pts on RTO. EasySell fraud shield against address tampering. | Live interactive feedback simulator (`POST /api/orders/simulate-feedback`) and EasySell bot shield (`POST /api/orders/easysell-check`). |
| **Slide 4: Preferred Delivery Window** | Synchronizing arrival timing boosts first-attempt collection success by **+24%** (Morning, Afternoon, Evening, Weekend). | Empirical analysis confirms first-attempt success jumps from 70.2% (unscheduled) to 88.5% with preferred window (+26.1% uplift). |
| **Slide 5: Expected Impact & Economics** | Reverse logistics waste of ฿45/parcel. 58% RTO reduction with preserved GMV. Targeted, Progressive, Recoverable. | Financial model demonstrates THB 6.45M baseline monthly waste reduced to THB 3.74M monthly savings (THB 44.9M annual EBITDA boost). |

---

## 🏗️ Architecture & Technology Stack

```
Shopee-Ultimate-Case-Challenge/
├── data/
│   ├── shopee_cod_orders.csv     # 50,000 synthetic transaction records
│   ├── buyer_profiles.csv        # 12,000 buyer credit history profiles
│   └── eda_summary.json          # Exported statistical proofs and Z-test metrics
├── models/
│   ├── cod_risk_model.joblib     # Calibrated Random Forest ML pipeline artifact
│   └── model_metrics.json        # Test ROC-AUC (0.8629), PR-AUC, confusion matrix
├── src/
│   ├── data_generator.py         # Realistic Shopee order & buyer credit generator
│   ├── eda_analysis.py           # Two-proportion Z-test and financial model
│   ├── model_engine.py           # KBTG credit risk pipeline & scoring scaler
│   └── risk_policy.py            # Dynamic feedback loop (+8/-25) & EasySell rules
├── static/
│   ├── assets/                   # Shopee logistics photography and UI assets
│   ├── styles.css                # Slender Geist CSS with minimalist dark design
│   ├── app.js                    # Vanilla JS tab router, live ML client & simulator
│   └── index.html                # Multi-page executive presentation & ML Lab
├── main.py                       # FastAPI application & RESTful API endpoints
├── requirements.txt              # Production Python dependencies
├── Procfile                      # Render.com process declaration
├── render.yaml                   # 1-Click Render.com Blueprint configuration
└── README.md
```

### Tech Stack:
- **Backend & ML Engine**: Python 3.11 / 3.13, FastAPI, Scikit-Learn, Pandas, NumPy, SciPy, Joblib.
- **Frontend**: Pure semantic HTML5, modern CSS3 (Custom properties, CSS Grid, Glassmorphism), Vanilla ES6 JavaScript (No React/Node dependencies on client).
- **Typography**: Slender Geist & Geist Mono via Google Fonts.
- **Hosting & Infrastructure**: Render.com Web Service (`uvicorn main:app --host 0.0.0.0 --port $PORT`).

---

## ⚡ Machine Learning Pipeline (KBTG Methodology)

The risk model predicts delivery failure probability $P(\text{failed} \mid \text{COD})$ and scales it into a banking-standard **Reliability Score**:

$$\text{Reliability Score} = \text{round}\left(100 \times \left(1 - \hat{P}_{\text{failure}}^{0.65}\right)\right)$$

### Performance Diagnostics:
- **ROC-AUC Score**: `0.8629`
- **PR-AUC (Average Precision)**: `0.3722`
- **Brier Calibration Loss**: `0.02087`
- **Top 5 Risk Drivers**:
  1. `buyer_historical_success_rate` (27.58%)
  2. `buyer_reliability_score` (25.89%)
  3. `buyer_consecutive_failed_cods` (18.70%)
  4. `buyer_account_age_days` (10.56%)
  5. `buyer_phone_verified` (3.97%)

---

## 🚀 Quickstart & Local Setup

### 1. Prerequisites
- Python 3.11+ installed.

### 2. Installation
```bash
git clone https://github.com/svkhun/Shopee-Ultimate-Case-Challenge.git
cd Shopee-Ultimate-Case-Challenge

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Run Pipeline & Start Server
```bash
# Optional: Regenerate synthetic data and retrain model
python src/data_generator.py
python src/eda_analysis.py
python src/model_engine.py

# Launch FastAPI Web Server
python main.py
```
Open your browser at `http://127.0.0.1:8000` to interact with the executive presentation, live KBTG ML console, and dataset explorer.

---

## ☁️ Deploy to Render.com

This repository is pre-configured for instant zero-configuration deployment on **Render.com**:

1. Log into your [Render.com Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Blueprint** or **Web Service**.
3. Select your repository: `svkhun/Shopee-Ultimate-Case-Challenge`.
4. Render will automatically detect `render.yaml` or use the following settings:
   - **Environment**: `Python`
   - **Build Command**: `pip install -r requirements.txt && python src/data_generator.py && python src/eda_analysis.py && python src/model_engine.py`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click **Deploy Web Service**. Once deployed, Render provides a persistent public URL (e.g. `https://shopee-smart-cod-reliability.onrender.com`).

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health check and ML model readiness status. |
| `GET` | `/api/eda/metrics` | Statistical proofs for Slides 1–5 (Z-test, failure share, financial savings). |
| `GET` | `/api/model/summary` | Calibrated Random Forest metrics (ROC-AUC 0.8629, PR-AUC, feature importances). |
| `POST` | `/api/predict/risk` | Real-time ML inference: calculates failure probability, Reliability Score, and risk tier. |
| `POST` | `/api/orders/simulate-feedback` | Dynamic scoring feedback loop (+8 for Delivered, -25 for RTO). |
| `POST` | `/api/orders/easysell-check` | EasySell fraud shield against suspicious buyer addresses and bot orders. |
| `GET` | `/api/dataset/sample` | Live paginated records from `data/shopee_cod_orders.csv`. |

---

## 👥 Contributors & Challenge Info
- **Competition**: Shopee Ultimate Case Challenge (SUCC) 2026
- **Case Title**: Smart COD Reliability & Delivery Optimization System
- **Methodology**: Kasikorn Business-Technology Group (KBTG) Data Science & Credit Analytics Standards
