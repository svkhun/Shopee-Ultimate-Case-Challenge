-- =========================================================================
-- Smart COD Reliability System - PostgreSQL Database Schema
-- Production Ready DDL with ACID integrity, Constraints, Indexes & Audit Trail
-- Architecture Standard: K-Sentinel Enterprise Risk Engine
-- =========================================================================

-- Enable pgcrypto / uuid-ossp for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -------------------------------------------------------------------------
-- 1. Buyers Table (Platform Users)
-- Stores dynamic risk status, consecutive counters, and historical totals
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS buyers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_buyer_id VARCHAR(64) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    email VARCHAR(255) NOT NULL,
    current_reliability_score NUMERIC(5, 2) NOT NULL DEFAULT 80.00 
        CHECK (current_reliability_score >= 0.00 AND current_reliability_score <= 100.00),
    risk_tier VARCHAR(32) NOT NULL DEFAULT 'LOW_RISK'
        CHECK (risk_tier IN ('LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK', 'REPEATED_HIGH_RISK')),
    consecutive_failed_cod_count INT NOT NULL DEFAULT 0 
        CHECK (consecutive_failed_cod_count >= 0),
    total_completed_orders INT NOT NULL DEFAULT 0 
        CHECK (total_completed_orders >= 0),
    total_failed_orders INT NOT NULL DEFAULT 0 
        CHECK (total_failed_orders >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes on Buyers
CREATE INDEX IF NOT EXISTS idx_buyers_external_id ON buyers(external_buyer_id);
CREATE INDEX IF NOT EXISTS idx_buyers_score ON buyers(current_reliability_score);
CREATE INDEX IF NOT EXISTS idx_buyers_risk_tier ON buyers(risk_tier);

-- -------------------------------------------------------------------------
-- 2. Orders Table
-- Captures checkout snapshots, preferred delivery window, and deposit policies
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(64) NOT NULL UNIQUE,
    buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE RESTRICT,
    total_amount NUMERIC(12, 2) NOT NULL CHECK (total_amount > 0.00),
    payment_method VARCHAR(32) NOT NULL 
        CHECK (payment_method IN ('COD', 'SHOPEEPAY', 'CREDIT_CARD', 'PROMPTPAY')),
    preferred_delivery_window VARCHAR(32) NOT NULL DEFAULT 'EVENING'
        CHECK (preferred_delivery_window IN ('MORNING', 'AFTERNOON', 'EVENING', 'WEEKEND')),
    status VARCHAR(32) NOT NULL DEFAULT 'CONFIRMED'
        CHECK (status IN (
            'PENDING_VALIDATION', 
            'AWAITING_OTP', 
            'AWAITING_DEPOSIT', 
            'CONFIRMED', 
            'DISPATCHED', 
            'DELIVERED', 
            'RETURNED_TO_ORIGIN', 
            'CANCELLED'
        )),
    deposit_required BOOLEAN NOT NULL DEFAULT FALSE,
    deposit_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (deposit_amount >= 0.00),
    deposit_paid BOOLEAN NOT NULL DEFAULT FALSE,
    is_otp_verified BOOLEAN NOT NULL DEFAULT FALSE,
    buyer_score_at_checkout NUMERIC(5, 2) NOT NULL,
    buyer_tier_at_checkout VARCHAR(32) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes on Orders
CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_delivery_window ON orders(preferred_delivery_window);

-- -------------------------------------------------------------------------
-- 3. Score Logs / Delivery History Table (Immutable Audit Trail)
-- Guaranteed ledger tracking every single reliability change for compliance
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS score_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    event_type VARCHAR(64) NOT NULL 
        CHECK (event_type IN ('DELIVERY_SUCCESS', 'DELIVERY_FAILURE', 'MANUAL_ADJUSTMENT', 'SYSTEM_RECOVERY')),
    previous_score NUMERIC(5, 2) NOT NULL,
    new_score NUMERIC(5, 2) NOT NULL,
    score_delta NUMERIC(5, 2) NOT NULL,
    previous_tier VARCHAR(32) NOT NULL,
    new_tier VARCHAR(32) NOT NULL,
    reason TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indexes on Audit Trail
CREATE INDEX IF NOT EXISTS idx_score_logs_buyer_id ON score_logs(buyer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_score_logs_order_id ON score_logs(order_id);

-- -------------------------------------------------------------------------
-- Trigger: Automatically update updated_at timestamp on row mutation
-- -------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS trg_buyers_updated_at ON buyers;
CREATE TRIGGER trg_buyers_updated_at
    BEFORE UPDATE ON buyers
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_timestamp_column();
