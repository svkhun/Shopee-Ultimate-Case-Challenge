"use client";

import React from "react";
import { 
  Target, 
  Layers, 
  Database, 
  SlidersHorizontal, 
  BrainCircuit, 
  BarChart2, 
  Shield, 
  TrendingDown, 
  Award
} from "lucide-react";

export default function ImpactSection() {

  return (
    <section id="impact" className="py-20 bg-[#090d16] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            Slide 5 Synthesis • Execution &amp; Measurable ROI
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Expected Impact &amp; <span className="text-[#ee4d2d]">Feasibility</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A balanced framework engineered to dramatically reduce courier returns while safeguarding Shopee&apos;s customer acquisition and conversion rates.
          </p>
        </div>

        {/* Top 2 Blocks: Why Our Solution Works vs Why It Is Feasible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Block 1: Why Our Solution Works */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#ee4d2d]/10 border border-[#ee4d2d]/30 flex items-center justify-center text-[#ff6f52]">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Why Our Solution Works</h3>
                  <p className="text-xs text-slate-400">3 Core Architectural Principles</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Principle 1: Targeted */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <h4 className="text-base font-bold text-white">Targeted</h4>
                  </div>
                  <p className="text-sm text-slate-300">
                    Intervene only when risk is high.
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">
                    → Keep 90%+ reliable buyers completely frictionless.
                  </p>
                </div>

                {/* Principle 2: Progressive */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <h4 className="text-base font-bold text-white">Progressive</h4>
                  </div>
                  <p className="text-sm text-slate-300">
                    Reminder → Warning → Deposit.
                  </p>
                  <p className="text-xs text-amber-300 font-semibold mt-1">
                    → Increase commitment step-by-step without banning COD outright.
                  </p>
                </div>

                {/* Principle 3: Recoverable */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                    <h4 className="text-base font-bold text-white">Recoverable</h4>
                  </div>
                  <p className="text-sm text-slate-300">
                    Good delivery history restores status quickly.
                  </p>
                  <p className="text-xs text-blue-300 font-semibold mt-1">
                    → Restrictions are temporary; buyers can redeem COD privileges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Block 2: Why It Is Feasible */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Why It Is Feasible</h3>
                  <p className="text-xs text-slate-400">Lean, Fast &amp; Pragmatic Implementation</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Feasibility 1 */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Uses Existing Delivery-History Data
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      No new data infrastructure required. Shopee already records parcel delivery statuses (delivered, returned, rescheduled) in existing order databases.
                    </p>
                  </div>
                </div>

                {/* Feasibility 2 */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                    <SlidersHorizontal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Simple Rules Trigger Interventions
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Deterministic score thresholds (80, 50, 30) make business logic fully auditable, predictable, and simple to test across all regional markets.
                    </p>
                  </div>
                </div>

                {/* Feasibility 3 */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      AI is Used Only Where Prediction Adds Value
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      AI is targeted specifically for fraud ring detection and routing optimization rather than risky black-box credit underwriting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Success Metrics & Buyer Guardrails Dashboard */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-10 border border-slate-700/80 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <BarChart2 className="w-7 h-7 text-[#ee4d2d]" />
              Success Metrics &amp; Operational Guardrails
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Measuring primary performance indicators alongside strict consumer experience guardrails.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Core Outcome */}
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff6f52]">
                    Core Outcomes
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    Delivery KPI Targets
                  </h4>
                </div>
                <div className="p-2 rounded-xl bg-[#ee4d2d]/10 text-[#ff6f52]">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      COD Failed Delivery Rate
                    </div>
                    <div className="text-xs text-slate-400">
                      Baseline: 2.61% → Target: &lt;1.10%
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-lg">
                    <span>↓ 58%</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      First-Attempt Success Rate
                    </div>
                    <div className="text-xs text-slate-400">
                      With Preferred Delivery Window
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-lg">
                    <span>↑ 24%</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      Repeat Failure Rate
                    </div>
                    <div className="text-xs text-slate-400">
                      Curtailed via deposit &amp; OTP barriers
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-lg">
                    <span>↓ 72%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buyer Guardrails */}
            <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Buyer Guardrails
                  </span>
                  <h4 className="text-lg font-bold text-white mt-0.5">
                    Platform Health Protections
                  </h4>
                </div>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Shield className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      Conversion Rate
                    </div>
                    <div className="text-xs text-slate-400">
                      Zero friction for 90%+ reliable shoppers
                    </div>
                  </div>
                  <div className="text-blue-400 font-bold text-sm bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                    Maintained (≥99.4%)
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      Order Volume (GMV)
                    </div>
                    <div className="text-xs text-slate-400">
                      Uninhibited overall marketplace liquidity
                    </div>
                  </div>
                  <div className="text-blue-400 font-bold text-sm bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                    Maintained (100%)
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">
                      Buyer Complaint Rate
                    </div>
                    <div className="text-xs text-slate-400">
                      Mitigated through transparent scoring &amp; recovery paths
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                    Controlled (&lt;0.05%)
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
