"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import ProblemSection from "@/components/sections/ProblemSection";
import TargetingSection from "@/components/sections/TargetingSection";
import ReliabilitySystemSection from "@/components/sections/ReliabilitySystemSection";
import SchedulingSection from "@/components/sections/SchedulingSection";
import ImpactSection from "@/components/sections/ImpactSection";
import Footer from "@/components/Footer";
import Demo from "@/components/ui/demo";
import { 
  Sparkles, 
  ArrowDown, 
  Clock, 
  Users, 
  BarChart3,
  Video,
  Image as ImageIcon
} from "lucide-react";

export default function Home() {
  const [activeView, setActiveView] = useState<"case" | "demo">("case");
  const [heroMediaType, setHeroMediaType] = useState<"video" | "image">("video");

  // Media assets for the case hero
  const caseMedia: Record<
    "video" | "image",
    {
      src: string;
      poster?: string;
      bg: string;
      title: string;
      subtitle: string;
      prompt: string;
    }
  > = {
    video: {
      src: "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1",
      poster: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1280&auto=format&fit=crop",
      bg: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1920&auto=format&fit=crop",
      title: "SHOPEE COD OPTIMIZATION",
      subtitle: "Ultimate Case Challenge",
      prompt: "Scroll Down or Click to Unveil Strategy ↓",
    },
    image: {
      src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1280&auto=format&fit=crop",
      bg: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&auto=format&fit=crop",
      title: "SMART COD RELIABILITY",
      subtitle: "Shopee Logistics Innovation",
      prompt: "Scroll Down or Click to Unveil Strategy ↓",
    },
  };

  const currentMedia = caseMedia[heroMediaType];

  if (activeView === "demo") {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar activeView={activeView} setActiveView={setActiveView} />
        <div className="pt-16">
          <Demo />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-[#ee4d2d] selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Hero Media Expansion Section */}
      <div className="relative">
        {/* Toggle between Video and Image hero mode */}
        <div className="fixed top-20 right-4 sm:right-8 z-40 flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl">
          <button
            onClick={() => setHeroMediaType("video")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              heroMediaType === "video"
                ? "bg-[#ee4d2d] text-white shadow-md shadow-[#ee4d2d]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Video Hero
          </button>
          <button
            onClick={() => setHeroMediaType("image")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              heroMediaType === "image"
                ? "bg-[#ee4d2d] text-white shadow-md shadow-[#ee4d2d]/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Image Hero
          </button>
        </div>

        {/* ScrollExpandMedia Component from 21st.dev */}
        <ScrollExpandMedia
          mediaType={heroMediaType}
          mediaSrc={currentMedia.src}
          posterSrc={heroMediaType === "video" ? currentMedia.poster : undefined}
          bgImageSrc={currentMedia.bg}
          title={currentMedia.title}
          date={currentMedia.subtitle}
          scrollToExpand={currentMedia.prompt}
          textBlend={true}
        >
          {/* Executive Overview banner rendered inside expanded hero content */}
          <div className="max-w-5xl mx-auto w-full">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
              {/* Shopee accent banner */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ee4d2d] via-[#ff7a59] to-amber-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee4d2d]/20 text-[#ff6f52] text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Shopee Ultimate Case Challenge (SUCC)
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                    Smart COD Delivery Optimization &amp; Reliability System
                  </h1>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <a
                    href="#problem"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ee4d2d] to-[#ff5722] hover:from-[#d73211] hover:to-[#ee4d2d] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#ee4d2d]/30 transition-all flex items-center gap-2"
                  >
                    <span>Start Presentation</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Core Case Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">The Root Cause</h2>
                    <p className="text-xs text-slate-300 mt-1">
                      COD has a <strong>10.6× higher failed delivery rate</strong> than prepaid, causing ~85% of all Shopee delivery failures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Targeted Segmentation</h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Dynamic scoring isolates risky repeated-failure profiles while keeping 90%+ honest buyers completely frictionless.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Window Scheduling</h2>
                    <p className="text-xs text-slate-300 mt-1">
                      Preferred delivery windows guarantee buyer presence, maximizing first-attempt delivery success and seller profitability.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Jump Navigation */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Quick Slide Links:</span>
                <a
                  href="#problem"
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Slide 1: Problem Analysis
                </a>
                <a
                  href="#targeting"
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Slide 2: Buyer Targeting
                </a>
                <a
                  href="#reliability-system"
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Slide 3: Reliability System
                </a>
                <a
                  href="#scheduling"
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Slide 4: Window Scheduling
                </a>
                <a
                  href="#impact"
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  Slide 5: Expected Impact
                </a>
                <a
                  href="#simulator"
                  className="px-3 py-1 rounded-lg bg-[#ee4d2d]/20 text-[#ff6f52] border border-[#ee4d2d]/30 font-semibold hover:bg-[#ee4d2d]/30 transition-colors"
                >
                  Live Simulator →
                </a>
              </div>
            </div>
          </div>
        </ScrollExpandMedia>
      </div>

      {/* Main Presentation Slides */}
      <main className="flex-1 flex flex-col">
        {/* Slide 1: Where the Problem Really Is */}
        <ProblemSection />

        {/* Slide 2: Who Should Shopee Target? */}
        <TargetingSection />

        {/* Slide 3: Smart COD Reliability System */}
        <ReliabilitySystemSection />

        {/* Slide 4: Delivery Scheduling Optimization */}
        <SchedulingSection />

        {/* Slide 5: Expected Impact & Feasibility */}
        <ImpactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
