"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";

interface SlideNavigationProps {
  currentSlide: number; // 1 to 5
  prevHref: string;
  prevLabel: string;
  nextHref: string;
  nextLabel: string;
}

export default function SlideNavigation({
  currentSlide,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: SlideNavigationProps) {
  const slides = [
    { num: 1, href: "/problem", label: "Problem" },
    { num: 2, href: "/targeting", label: "Targeting" },
    { num: 3, href: "/reliability-system", label: "Reliability" },
    { num: 4, href: "/scheduling", label: "Scheduling" },
    { num: 5, href: "/impact", label: "Impact" },
  ];

  return (
    <nav aria-label="Slide navigation" className="mt-16 pt-8 border-t border-slate-800/80">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Previous Button */}
        <Link
          href={prevHref}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm text-slate-300 hover:text-white transition-all w-full sm:w-auto justify-start"
        >
          <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:-translate-x-1 group-hover:text-white transition-all shrink-0" />
          <div className="text-left">
            <span className="text-[10px] text-slate-400 block uppercase font-mono">Previous</span>
            <span className="font-medium text-slate-200">{prevLabel}</span>
          </div>
        </Link>

        {/* Center Progress Dots */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            title="Overview Home"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mr-1"
          >
            <Home className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-1.5 bg-slate-950/80 px-3 py-1.5 rounded-full border border-slate-800">
            {slides.map((s) => {
              const isActive = s.num === currentSlide;
              return (
                <Link
                  key={s.num}
                  href={s.href}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isActive
                      ? "bg-[#ee4d2d] w-6"
                      : "bg-slate-700 hover:bg-slate-500"
                  }`}
                  title={`Slide ${s.num}: ${s.label}`}
                />
              );
            })}
            <span className="text-[11px] font-mono text-slate-400 ml-2">
              {currentSlide}/5
            </span>
          </div>
        </div>

        {/* Next Button */}
        <Link
          href={nextHref}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#ee4d2d]/10 hover:bg-[#ee4d2d]/20 border border-[#ee4d2d]/30 text-xs sm:text-sm text-slate-200 hover:text-white transition-all w-full sm:w-auto justify-end"
        >
          <div className="text-right">
            <span className="text-[10px] text-[#ff7a59] block uppercase font-mono">Next</span>
            <span className="font-semibold text-white">{nextLabel}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#ff7a59] group-hover:translate-x-1 group-hover:text-white transition-all shrink-0" />
        </Link>
      </div>
    </nav>
  );
}
