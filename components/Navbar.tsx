"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Sliders } from "lucide-react";

interface NavbarProps {
  activeView: "case" | "demo";
  setActiveView: (view: "case" | "demo") => void;
}

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ee4d2d] to-[#ff7a59] flex items-center justify-center shadow-lg shadow-[#ee4d2d]/30 text-white font-black text-xl tracking-wider">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base tracking-wide">
                Shopee
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ee4d2d]/20 text-[#ff6f52] border border-[#ee4d2d]/30 uppercase tracking-wider">
                Ultimate Case Challenge
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Smart COD Reliability & Delivery Optimization
            </p>
          </div>
        </div>

        {/* Navigation Links (visible when in case view) */}
        {activeView === "case" && (
          <nav className="hidden md:flex items-center gap-1 text-xs lg:text-sm font-medium text-slate-300">
            <a
              href="#problem"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              The Problem
            </a>
            <a
              href="#targeting"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              Buyer Targeting
            </a>
            <a
              href="#reliability-system"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              Reliability Score
            </a>
            <a
              href="#scheduling"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              Window Scheduling
            </a>
            <a
              href="#impact"
              className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              Impact & KPI
            </a>
            <a
              href="#simulator"
              className="px-3 py-1.5 rounded-lg text-[#ff6f52] bg-[#ee4d2d]/10 hover:bg-[#ee4d2d]/20 border border-[#ee4d2d]/30 transition-all font-semibold flex items-center gap-1.5"
            >
              <Sliders className="w-3.5 h-3.5" />
              Live Simulator
            </a>
          </nav>
        )}

        {/* Switch View Buttons */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/80 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setActiveView("case")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeView === "case"
                  ? "bg-gradient-to-r from-[#ee4d2d] to-[#ff5722] text-white shadow-md shadow-[#ee4d2d]/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Full Case Presentation
            </button>
            <button
              onClick={() => setActiveView("demo")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                activeView === "demo"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Sparkles className="w-3 h-3 text-yellow-300" />
              21st.dev Component
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
