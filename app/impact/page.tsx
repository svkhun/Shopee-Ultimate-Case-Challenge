"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideNavigation from "@/components/SlideNavigation";
import { 
  Target, 
  Layers, 
  Database, 
  SlidersHorizontal, 
  BrainCircuit, 
  Shield, 
  TrendingDown, 
  Award
} from "lucide-react";

export default function ImpactPage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
              <Award className="w-3.5 h-3.5" />
              Slide 5 of 5 • Expected Impact &amp; Feasibility
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Expected Impact &amp; <span className="font-semibold text-[#ee4d2d]">Feasibility</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              A strategic system architecture engineered to radically curtail reverse logistics losses while preserving platform GMV and safeguarding trustworthy buyer experience.
            </p>
          </div>

          {/* Dual Pillars: Why Solution Works vs Why It Is Feasible */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Pillar 1: Why Solution Works */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-[#ee4d2d]/10 border border-[#ee4d2d]/20 flex items-center justify-center text-[#ff6f52]">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Why Our Solution Works</h2>
                    <span className="text-[11px] text-slate-400">Three core architectural principles</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <h3 className="font-semibold text-white">Targeted</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed">
                      Intervenes only when delivery failure risk is objectively elevated.
                    </p>
                    <p className="text-emerald-400 text-[11px] font-medium mt-1">
                      → Over 90% of buyers enjoy an uninterrupted, 100% frictionless checkout flow.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <h3 className="font-semibold text-white">Progressive</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed">
                      Stepwise escalation: Reminder → Mandatory OTP → Upfront Deposit.
                    </p>
                    <p className="text-amber-300 text-[11px] font-medium mt-1">
                      → Enforces accountability gradually without blanket COD bans.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <h3 className="font-semibold text-white">Recoverable</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed">
                      Successful delivery completions rapidly rehabilitate customer scores.
                    </p>
                    <p className="text-blue-300 text-[11px] font-medium mt-1">
                      → Friction is strictly temporary, incentivizing positive long-term buyer habits.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillar 2: Why It Is Feasible */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Why It Is Feasible</h2>
                    <span className="text-[11px] text-slate-400">Zero-friction technical rollout feasibility</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Leverages Existing Platform Data</h3>
                      <p className="text-slate-300 font-light text-[11px] mt-1 leading-relaxed">
                        Requires no separate data pipeline. Shopee already records delivery completion and return-to-origin statuses on every order.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Rule-Based, Auditable &amp; Predictable</h3>
                      <p className="text-slate-300 font-light text-[11px] mt-1 leading-relaxed">
                        Thresholds (80, 50, 30) are transparent, deterministic, and readily adaptable for regional market A/B testing.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Focused AI Where ROI Is Proven</h3>
                      <p className="text-slate-300 font-light text-[11px] mt-1 leading-relaxed">
                        Applies machine learning specifically to fraudulent address pattern detection and delivery routing, avoiding high-risk blackbox credit scoring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Success Metrics & Buyer Guardrails */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 mb-12">
            <div className="mb-6">
              <span className="text-xs font-mono font-medium text-[#ff6f52] uppercase tracking-wider">
                Measurable Outcomes
              </span>
              <h2 className="text-lg font-medium text-white mt-1">
                Measurable Outcomes (KPIs) &amp; Platform Guardrails
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Core Outcomes */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="font-semibold text-[#ff7a59] font-mono uppercase text-[11px]">
                    Core Delivery Outcomes
                  </span>
                  <TrendingDown className="w-4 h-4 text-[#ff7a59]" />
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">COD Failed Delivery Rate</span>
                      <span className="text-[10px] text-slate-400">Reduced from 2.61% to target &lt;1.10%</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold text-sm">↓ 58%</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">First-Attempt Success Rate</span>
                      <span className="text-[10px] text-slate-400">Boosted via delivery window scheduling</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold text-sm">↑ 24%</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Repeat Failure Rate</span>
                      <span className="text-[10px] text-slate-400">Chronic refusal suppressed via deposit gating</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold text-sm">↓ 72%</span>
                  </div>
                </div>
              </div>

              {/* Buyer Guardrails */}
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="font-semibold text-emerald-400 font-mono uppercase text-[11px]">
                    Platform &amp; Buyer Guardrails
                  </span>
                  <Shield className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Conversion Rate</span>
                      <span className="text-[10px] text-slate-400">Zero friction for 90%+ trustworthy buyers</span>
                    </div>
                    <span className="text-blue-400 font-mono font-semibold text-xs bg-blue-500/10 px-2 py-0.5 rounded">
                      Maintained (≥99.4%)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Order Volume (GMV)</span>
                      <span className="text-[10px] text-slate-400">Preserving GMV liquidity with no drop-off</span>
                    </div>
                    <span className="text-blue-400 font-mono font-semibold text-xs bg-blue-500/10 px-2 py-0.5 rounded">
                      Maintained (100%)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Buyer Complaint Rate</span>
                      <span className="text-[10px] text-slate-400">Transparent alerts &amp; recoverable scoring</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold text-xs bg-emerald-500/10 px-2 py-0.5 rounded">
                      Controlled (&lt;0.05%)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Navigation */}
          <SlideNavigation
            currentSlide={5}
            prevHref="/scheduling"
            prevLabel="Slide 4: Window Scheduling"
            nextHref="/"
            nextLabel="Return to Executive Overview"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
