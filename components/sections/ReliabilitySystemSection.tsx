"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  ArrowUpRight, 
  ArrowDownRight, 
  RotateCcw, 
  CheckCircle2, 
  Activity
} from "lucide-react";

export default function ReliabilitySystemSection() {
  const [score, setScore] = useState<number>(72);
  const [deliveryLog, setDeliveryLog] = useState<Array<{ type: "success" | "fail"; date: string; delta: number; text: string }>>([
    { type: "success", date: "Order #SHP-9102", delta: +8, text: "Delivered & Paid on doorstep" },
    { type: "success", date: "Order #SHP-8831", delta: +8, text: "Delivered & Paid on doorstep" },
    { type: "fail", date: "Order #SHP-8104", delta: -25, text: "Customer unreachable / rejected parcel" },
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
          text: "Parcel received & paid successfully",
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
      { type: "success", date: "Order #SHP-9102", delta: +8, text: "Delivered & Paid on doorstep" },
      { type: "fail", date: "Order #SHP-8104", delta: -25, text: "Customer unreachable / rejected parcel" },
    ]);
  };

  // Determine current tier from score
  const getTier = (s: number) => {
    if (s >= 80) {
      return {
        label: "Low-Risk Tier (Safe)",
        labelTh: "ความเสี่ยงต่ำ - ลูกค้าชั้นดี",
        color: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
        barColor: "bg-emerald-500",
        action: "Normal frictionless COD enabled. Full buyer autonomy.",
        intervention: "None required. Immediate warehouse dispatch.",
        otpRequired: false,
        depositRequired: false
      };
    }
    if (s >= 50) {
      return {
        label: "Medium-Risk Tier (Watchlist)",
        labelTh: "ความเสี่ยงปานกลาง - เฝ้าระวัง",
        color: "text-amber-400",
        badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
        barColor: "bg-amber-500",
        action: "Pre-delivery SMS / App availability check before dispatch.",
        intervention: "Buyer receives confirmation prompt 4 hours before delivery.",
        otpRequired: false,
        depositRequired: false
      };
    }
    if (s >= 30) {
      return {
        label: "High-Risk Tier (Warning)",
        labelTh: "ความเสี่ยงสูง - แจ้งเตือนเข้มงวด",
        color: "text-[#ff6f52]",
        badgeBg: "bg-[#ee4d2d]/10 border-[#ee4d2d]/30 text-[#ff6f52]",
        barColor: "bg-[#ee4d2d]",
        action: "Mandatory OTP confirmation and in-app reminder of COD terms.",
        intervention: "Order on hold until buyer confirms willingness to pay.",
        otpRequired: true,
        depositRequired: false
      };
    }
    return {
      label: "Repeated High-Risk Tier (Restricted)",
      labelTh: "ความเสี่ยงสูงซ้ำซ้อน - ระงับ COD ชั่วคราว",
      color: "text-rose-500",
      badgeBg: "bg-rose-500/10 border-rose-500/30 text-rose-500",
      barColor: "bg-rose-500",
      action: "COD locked or Partial Deposit required (฿40 shipping deposit).",
      intervention: "Deposit required or switch to ShopeePay / QR PromptPay.",
      otpRequired: true,
      depositRequired: true
    };
  };

  const currentTier = getTier(score);

  return (
    <section id="reliability-system" className="py-20 bg-[#090d16] relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Slide 3 Architecture • Dynamic Scoring Engine
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Smart COD <span className="text-[#ee4d2d]">Reliability System</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            <strong>How it works?</strong> Every buyer receives a dynamic Reliability Score. The score is updated after every delivery.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
            <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2">
              <span className="font-bold">Successful delivery</span> → Score increases (+8)
            </div>
            <div className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-2">
              <span className="font-bold">Failed delivery</span> → Score decreases (-25)
            </div>
          </div>
        </div>

        {/* Live Interactive Score Simulator Widget */}
        <div id="simulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Dynamic Score Meter (Col 7) */}
          <div className="lg:col-span-7 bg-slate-900/70 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Interactive Simulation
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    Live Buyer Reliability Meter
                  </h3>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Score
                </button>
              </div>

              {/* Score Display & Gauge */}
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-6 text-center relative overflow-hidden">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Current Buyer Reliability Score
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-6xl sm:text-7xl font-black ${currentTier.color} transition-all`}>
                    {score}
                  </span>
                  <span className="text-2xl font-bold text-slate-400">/ 100</span>
                </div>

                {/* Progress Gauge Bar */}
                <div className="w-full h-4 bg-slate-800 rounded-full mt-4 overflow-hidden relative p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${currentTier.barColor}`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                {/* Tier indicator ticks */}
                <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
                  <span className="text-rose-400">&lt;30 Repeated High</span>
                  <span className="text-[#ff6f52]">30 High</span>
                  <span className="text-amber-400">50 Medium</span>
                  <span className="text-emerald-400">80+ Low-Risk</span>
                </div>
              </div>

              {/* Current Policy Impact based on Live Score */}
              <div className={`p-4 rounded-xl border ${currentTier.badgeBg} mb-6`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Assigned Tier: {currentTier.label}
                  </span>
                  <span className="text-xs font-medium opacity-80">
                    {currentTier.labelTh}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {currentTier.action}
                </p>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-black/30">
                    Intervention: {currentTier.intervention}
                  </span>
                  {currentTier.otpRequired && (
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-semibold">
                      OTP Verification Triggered
                    </span>
                  )}
                  {currentTier.depositRequired && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                      ฿40 Deposit Required
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Simulation Action Buttons */}
            <div>
              <div className="text-xs font-semibold text-slate-400 mb-2">
                Simulate Delivery Outcome for this Buyer:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleDelivery("success")}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-emerald-950/20"
                >
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  Successful Delivery (+8)
                </button>
                <button
                  onClick={() => handleDelivery("fail")}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-bold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-rose-950/20"
                >
                  <ArrowDownRight className="w-4 h-4 text-rose-400" />
                  Failed Delivery / Refused (-25)
                </button>
              </div>
            </div>
          </div>

          {/* Right: Dynamic Delivery Audit Log & EasySell Integration (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Audit Log */}
            <div className="bg-slate-900/70 rounded-3xl p-6 border border-slate-800 shadow-xl flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#ff6f52]" />
                  Real-Time Delivery Log
                </h4>
                <span className="text-xs text-slate-400 font-mono">Dynamic History</span>
              </div>

              <div className="space-y-2.5">
                {deliveryLog.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{item.date}</div>
                      <div className="text-[11px] text-slate-400">{item.text}</div>
                    </div>
                    <span
                      className={`font-bold font-mono px-2 py-0.5 rounded ${
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

            {/* EasySell & Slide 3 Feature Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-3xl p-6 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#ee4d2d] flex items-center justify-center text-white text-xs font-black">
                    ES
                  </div>
                  <span className="text-sm font-bold text-white">EasySell &amp; Fraud Risk System</span>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Slide 3 Architecture
                </span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Pre-Shipment Risk Scoring:</strong> Rates orders before seller packages and ships, cutting futile logistics fees.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">OTP Verification for Suspicious Orders:</strong> Requires one-time PIN validation for flagged high-risk addresses.
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Fake Orders Blocked: 84%</strong> Stops malicious competitors and fake bulk COD spam before dispatch.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
