"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideNavigation from "@/components/SlideNavigation";
import { 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight, 
  RotateCcw, 
  CheckCircle2, 
  Activity
} from "lucide-react";

export default function ReliabilitySystemPage() {
  const [score, setScore] = useState<number>(72);
  const [deliveryLog, setDeliveryLog] = useState<Array<{ type: "success" | "fail"; date: string; delta: number; text: string }>>([
    { type: "success", date: "Order #SHP-9102", delta: +8, text: "Delivered and paid successfully at doorstep" },
    { type: "success", date: "Order #SHP-8831", delta: +8, text: "Delivered and paid successfully at doorstep" },
    { type: "fail", date: "Order #SHP-8104", delta: -25, text: "Unreachable / Refused package at doorstep" },
  ]);

  const handleDelivery = (type: "success" | "fail") => {
    if (type === "success") {
      const newScore = Math.min(100, score + 8);
      setScore(newScore);
      setDeliveryLog([
        {
          type: "success",
          date: `Order #SHP-${Math.floor(1000 + Math.random() * 9000)}`,
          delta: +8,
          text: "Delivered & collected cash successfully",
        },
        ...deliveryLog.slice(0, 4),
      ]);
    } else {
      const newScore = Math.max(0, score - 25);
      setScore(newScore);
      setDeliveryLog([
        {
          type: "fail",
          date: `Order #SHP-${Math.floor(1000 + Math.random() * 9000)}`,
          delta: -25,
          text: "Delivery failed / Customer refused parcel",
        },
        ...deliveryLog.slice(0, 4),
      ]);
    }
  };

  const handleReset = () => {
    setScore(72);
    setDeliveryLog([
      { type: "success", date: "Order #SHP-9102", delta: +8, text: "Delivered and paid successfully at doorstep" },
      { type: "fail", date: "Order #SHP-8104", delta: -25, text: "Unreachable / Refused package at doorstep" },
    ]);
  };

  const getTier = (s: number) => {
    if (s >= 80) {
      return {
        label: "Low-Risk Tier (Safe)",
        subtitle: "Low Risk - Verified Customer",
        color: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        barColor: "bg-emerald-500",
        action: "Unrestricted COD enabled (Zero Friction), immediate fulfillment.",
        intervention: "No extra verification required",
        otpRequired: false,
        depositRequired: false
      };
    }
    if (s >= 50) {
      return {
        label: "Medium-Risk Tier (Watchlist)",
        subtitle: "Medium Risk - Proactive Watchlist",
        color: "text-amber-400",
        badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        barColor: "bg-amber-500",
        action: "Pre-delivery SMS reminder sent & time slot window unlocked.",
        intervention: "Push Notification sent 2-3 hrs prior",
        otpRequired: false,
        depositRequired: false
      };
    }
    if (s >= 30) {
      return {
        label: "High-Risk Tier (Warning)",
        subtitle: "High Risk - Mandatory Action",
        color: "text-[#ff6f52]",
        badgeBg: "bg-[#ee4d2d]/10 border-[#ee4d2d]/30 text-[#ff6f52]",
        barColor: "bg-[#ee4d2d]",
        action: "Mandatory OTP authentication required before order dispatch.",
        intervention: "Order on hold pending OTP submission",
        otpRequired: true,
        depositRequired: false
      };
    }
    return {
      label: "Repeated High-Risk (Restricted)",
      subtitle: "Chronic Risk - COD Suspended",
      color: "text-rose-500",
      badgeBg: "bg-rose-500/10 border-rose-500/30 text-rose-500",
      barColor: "bg-rose-500",
      action: "COD suspended or requires ฿40 shipping deposit.",
      intervention: "Encourage conversion to ShopeePay / PromptPay",
      otpRequired: true,
      depositRequired: true
    };
  };

  const currentTier = getTier(score);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
              <Cpu className="w-3.5 h-3.5" />
              Slide 3 of 5 • Dynamic Scoring Engine
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Smart COD <span className="font-semibold text-[#ee4d2d]">Reliability System</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              How it works? Every buyer receives a dynamic Reliability Score calculated after every delivery event: incrementing upon successful receipt (+8) and heavily penalizing frivolous refusals (-25).
            </p>
          </div>

          {/* Interactive Simulator Section */}
          <div id="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
            {/* Left: Dynamic Meter */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-mono text-[#ff6f52] uppercase tracking-wider">
                      Live Dynamic Meter
                    </span>
                    <h2 className="text-lg font-medium text-white mt-0.5">
                      Buyer Reliability Gauge &amp; Dynamic Policies
                    </h2>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Score display */}
                <div className="p-6 rounded-xl bg-slate-950/80 border border-slate-800/80 text-center mb-6">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    Current Reliability Score
                  </span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-6xl sm:text-7xl font-light tracking-tight ${currentTier.color}`}>
                      {score}
                    </span>
                    <span className="text-sm font-mono text-slate-400">/ 100</span>
                  </div>

                  {/* Meter bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full mt-4 overflow-hidden p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${currentTier.barColor}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                    <span className="text-rose-400">&lt;30 Repeated</span>
                    <span className="text-[#ff6f52]">30 High</span>
                    <span className="text-amber-400">50 Medium</span>
                    <span className="text-emerald-400">80+ Safe</span>
                  </div>
                </div>

                {/* Active policy preview */}
                <div className={`p-4 rounded-xl border ${currentTier.badgeBg} text-xs mb-6`}>
                  <div className="flex items-center justify-between font-mono mb-1">
                    <span className="font-semibold">{currentTier.label}</span>
                    <span className="text-[11px] opacity-80">{currentTier.subtitle}</span>
                  </div>
                  <p className="text-slate-300 font-light mt-1">
                    {currentTier.action}
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap gap-2 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-black/40">
                      {currentTier.intervention}
                    </span>
                    {currentTier.otpRequired && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-medium">
                        OTP Verification
                      </span>
                    )}
                    {currentTier.depositRequired && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium">
                        ฿40 Shipping Deposit
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase block mb-2">
                  Click to simulate real-time delivery outcomes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleDelivery("success")}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium text-xs transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Delivery Success (+8)</span>
                  </button>
                  <button
                    onClick={() => handleDelivery("fail")}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-medium text-xs transition-colors"
                  >
                    <ArrowDownRight className="w-4 h-4" />
                    <span>Refusal / Failed Delivery (-25)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: History Log & EasySell Integration */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Delivery Log */}
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 flex-1">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#ff6f52]" />
                    <h3 className="text-xs font-semibold text-white">Dynamic Delivery Audit Log</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Recent Audit Events</span>
                </div>

                <div className="space-y-2 text-xs">
                  {deliveryLog.map((item, index) => (
                    <div
                      key={index}
                      className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono text-white text-[11px]">{item.date}</div>
                        <div className="text-[10px] text-slate-400 font-light">{item.text}</div>
                      </div>
                      <span
                        className={`text-[11px] font-mono px-1.5 py-0.5 rounded ${
                          item.type === "success"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {item.delta > 0 ? `+${item.delta}` : item.delta}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* EasySell Architecture Card */}
              <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#ee4d2d] flex items-center justify-center text-white text-[10px] font-bold">
                      ES
                    </div>
                    <h3 className="font-semibold text-white">EasySell &amp; Fraud Risk System</h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Slide 3 Architecture
                  </span>
                </div>

                <div className="space-y-2.5 text-slate-300 text-[11px] font-light leading-relaxed">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white font-medium">Pre-Shipment Risk Scoring:</strong> Evaluates seller-side parcel risk before dispatch.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white font-medium">OTP Verification:</strong> Authenticates recipient contact details on suspicious transactions.
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-white font-medium">Fake Orders Blocked 84%:</strong> Filters malicious spam orders and fake accounts before fulfillment.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Navigation */}
          <SlideNavigation
            currentSlide={3}
            prevHref="/targeting"
            prevLabel="Slide 2: Buyer Targeting"
            nextHref="/scheduling"
            nextLabel="Slide 4: Delivery Window Scheduling"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
