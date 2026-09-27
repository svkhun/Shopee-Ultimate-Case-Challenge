"use client";

import React, { useState } from "react";
import { 
  AlertTriangle, 
  FileText, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  Package, 
  ShieldAlert
} from "lucide-react";

export default function ProblemSection() {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(15); // in millions
  const returnCostPerOrder = 45; // THB

  // Mathematical calculation based on Slide 1:
  // COD Share = 35%
  // COD Fail Rate = 2.61%
  // Non-COD Share = 65%
  // Non-COD Fail Rate = 0.25%
  const totalOrdersCount = monthlyOrders * 1_000_000;
  const codOrders = totalOrdersCount * 0.35;
  const nonCodOrders = totalOrdersCount * 0.65;
  
  const codFailedOrders = codOrders * 0.0261;
  const nonCodFailedOrders = nonCodOrders * 0.0025;
  const totalFailedOrders = codFailedOrders + nonCodFailedOrders;
  
  const codShareOfFailures = (codFailedOrders / totalFailedOrders) * 100;
  const monthlyCostWasteTHB = codFailedOrders * returnCostPerOrder;
  const potentialSavingsTHB = monthlyCostWasteTHB * 0.52; // target ~52% reduction

  return (
    <section id="problem" className="py-20 bg-[#090d16] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#ee4d2d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            Slide 1 Analysis • Root Cause Discovery
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Where The Problem <span className="text-[#ee4d2d]">Really Is</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Three key metrics reveal where the failed delivery problem is concentrated.
            Instead of a systemic delivery breakdown, the bottleneck lies heavily in Cash on Delivery (COD).
          </p>
        </div>

        {/* 3 Metric Cards matching Slide 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: 10.6x Higher COD Risk */}
          <div className="relative group bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-800 hover:border-[#ee4d2d]/50 transition-all duration-300 shadow-xl hover:shadow-[#ee4d2d]/10">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="text-5xl sm:text-6xl font-black text-amber-400 tracking-tight mb-2">
              10.6<span className="text-3xl text-amber-500 font-bold">x</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Higher COD Risk
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              COD failed delivery rate is <strong className="text-amber-300">2.61%</strong> versus just <strong className="text-emerald-400">0.25%</strong> for non-COD — an alarming <span className="text-white font-semibold">10.6× difference</span>.
            </p>
            {/* Mini Visualizer */}
            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Non-COD (Prepaid)</span>
                <span className="font-semibold text-emerald-400">0.25%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: "9.5%" }} />
              </div>
              <div className="flex justify-between text-slate-400 pt-1">
                <span>COD (Cash on Delivery)</span>
                <span className="font-semibold text-amber-400">2.61%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          </div>

          {/* Card 2: 35% Share of Total Orders */}
          <div className="relative group bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-800 hover:border-[#ee4d2d]/50 transition-all duration-300 shadow-xl hover:shadow-[#ee4d2d]/10">
            <div className="w-14 h-14 rounded-2xl bg-[#ee4d2d]/10 border border-[#ee4d2d]/30 flex items-center justify-center text-[#ff6f52] mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <div className="text-5xl sm:text-6xl font-black text-[#ee4d2d] tracking-tight mb-2">
              35<span className="text-3xl text-[#ff6f52] font-bold">%</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Share of Total Orders
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Over <strong className="text-[#ff7a59]">one-third</strong> of all Shopee orders are COD, greatly amplifying its severe impact on overall marketplace logistics failure rates.
            </p>
            {/* Donut / Ratio Bar */}
            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Order Volume Mix</span>
                <span className="text-white font-medium">35% COD / 65% Prepaid</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-[#ee4d2d]" style={{ width: "35%" }} title="COD Orders: 35%" />
                <div className="h-full bg-blue-500" style={{ width: "65%" }} title="Prepaid Orders: 65%" />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#ee4d2d]" /> COD (1 in 3 orders)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" /> Prepaid</span>
              </div>
            </div>
          </div>

          {/* Card 3: 85% Of Failed Deliveries */}
          <div className="relative group bg-slate-900/60 backdrop-blur-md rounded-2xl p-8 border border-slate-800 hover:border-red-500/50 transition-all duration-300 shadow-xl hover:shadow-red-500/10">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
              <XCircle className="w-8 h-8" />
            </div>
            <div className="text-5xl sm:text-6xl font-black text-red-500 tracking-tight mb-2">
              85<span className="text-3xl text-red-400 font-bold">%</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Of Failed Deliveries
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Estimated share of <strong className="text-red-400">all failed deliveries</strong> attributable to COD orders, calculated directly from order share and respective failure rates.
            </p>
            {/* Impact indicator */}
            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Concentration of Delivery Failures</span>
                <span className="text-red-400 font-bold">~{codShareOfFailures.toFixed(0)}% from COD</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-red-500" style={{ width: "85%" }} />
                <div className="h-full bg-slate-600" style={{ width: "15%" }} />
              </div>
              <p className="text-[11px] text-slate-400">
                Solving COD delivery failure fixes 85% of all Shopee fulfillment failures!
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Impact Calculator */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-800/80 rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ee4d2d]/20 text-[#ff6f52] text-xs font-bold uppercase tracking-wider mb-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Live Scale & Cost Simulator
              </div>
              <h4 className="text-2xl font-bold text-white">
                Monthly Shopee Volume & Cost-to-Serve Impact
              </h4>
              <p className="text-sm text-slate-400 mt-1">
                Simulate how the 2.61% COD failure rate impacts Shopee platform operations at scale.
              </p>
            </div>

            {/* Slider control */}
            <div className="w-full lg:w-80 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-slate-300">
                  Total Monthly Orders:
                </label>
                <span className="text-sm font-bold text-[#ff6f52]">
                  {monthlyOrders} Million Orders
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={monthlyOrders}
                onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ee4d2d]"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5M</span>
                <span>25M</span>
                <span>50M orders/mo</span>
              </div>
            </div>
          </div>

          {/* Computed Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <Package className="w-3.5 h-3.5 text-[#ff6f52]" />
                COD Order Volume (35%)
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white">
                {(codOrders / 1_000_000).toFixed(2)}M
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Active monthly COD parcels
              </div>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <XCircle className="w-3.5 h-3.5 text-red-400" />
                COD Failed Deliveries
              </div>
              <div className="text-xl sm:text-2xl font-bold text-red-400">
                {Math.round(codFailedOrders).toLocaleString()}
              </div>
              <div className="text-[11px] text-red-300/70 mt-1">
                Failed delivery attempts @ 2.61%
              </div>
            </div>

            <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                Return Logistics Waste
              </div>
              <div className="text-xl sm:text-2xl font-bold text-amber-400">
                ฿{(monthlyCostWasteTHB / 1_000_000).toFixed(2)}M
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Courier reverse shipping & restocking
              </div>
            </div>

            <div className="bg-[#ee4d2d]/10 p-4 rounded-xl border border-[#ee4d2d]/30">
              <div className="text-xs text-[#ff7a59] flex items-center gap-1.5 mb-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                Target Recoverable Value
              </div>
              <div className="text-xl sm:text-2xl font-black text-white">
                ฿{(potentialSavingsTHB / 1_000_000).toFixed(2)}M
              </div>
              <div className="text-[11px] text-[#ff7a59] mt-1 font-medium">
                Annualized ~฿{((potentialSavingsTHB * 12) / 1_000_000).toFixed(1)}M saved
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
