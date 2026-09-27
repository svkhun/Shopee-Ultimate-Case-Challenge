"use client";

import React from "react";
import { ArrowUp, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#06080e] border-t border-slate-800 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#ee4d2d] to-[#ff7a59] flex items-center justify-center text-white font-black text-lg shadow-md shadow-[#ee4d2d]/30">
                S
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-wide">
                  Shopee
                </span>
                <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ee4d2d]/20 text-[#ff6f52] border border-[#ee4d2d]/30 uppercase">
                  Ultimate Case Challenge
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A comprehensive strategy resolving the 10.6x COD failed delivery discrepancy through dynamic reliability scoring, tier-based buyer interventions, and customer-preferred delivery scheduling.
            </p>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Built with Next.js 16, TypeScript, Tailwind CSS &amp; 21st.dev Component</span>
            </div>
          </div>

          {/* Col 2: Presentation Index */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Case Study Slides
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#problem" className="hover:text-white transition-colors">
                  Slide 1: Where The Problem Really Is
                </a>
              </li>
              <li>
                <a href="#targeting" className="hover:text-white transition-colors">
                  Slide 2: Who Should Shopee Target?
                </a>
              </li>
              <li>
                <a href="#reliability-system" className="hover:text-white transition-colors">
                  Slide 3: Smart COD Reliability System
                </a>
              </li>
              <li>
                <a href="#scheduling" className="hover:text-white transition-colors">
                  Slide 4: Delivery Scheduling Optimization
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-white transition-colors">
                  Slide 5: Expected Impact &amp; Feasibility
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Features */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Technical Design
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ScrollExpandMedia Hero</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dynamic Reliability Meter</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Delivery Window Scheduler</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>shadcn &amp; Tailwind UI</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            Shopee Ultimate Case Challenge (SUCC) Project. All data synthesized directly from case presentation slides.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
