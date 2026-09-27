"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#06080e] border-t border-slate-800/80 text-slate-400 py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#ee4d2d] flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-semibold text-white text-sm tracking-tight">
                Shopee Ultimate Case Challenge
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-light">
              กรอบการทำงานเชิงกลยุทธ์แก้ปัญหาวิกฤตพัสดุเก็บเงินปลายทาง (COD) ตีกลับ ด้วยระบบคะแนนความน่าเชื่อถือและการนัดหมายเวลาส่งสินค้า
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Next.js 16 • Slender Geist • Multi-page Deck</span>
            </div>
          </div>

          {/* Col 2: Presentation Index */}
          <div>
            <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block mb-3">
              Presentation Slides
            </span>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/problem" className="hover:text-white transition-colors">
                  1. Where The Problem Really Is
                </Link>
              </li>
              <li>
                <Link href="/targeting" className="hover:text-white transition-colors">
                  2. Who Should Shopee Target?
                </Link>
              </li>
              <li>
                <Link href="/reliability-system" className="hover:text-white transition-colors">
                  3. Smart COD Reliability System
                </Link>
              </li>
              <li>
                <Link href="/scheduling" className="hover:text-white transition-colors">
                  4. Delivery Window Scheduling
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-white transition-colors">
                  5. Expected Impact &amp; Feasibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Features */}
          <div>
            <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider block mb-3">
              Solution Highlights
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>10.6× COD Risk Solved</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dynamic Reliability Meter</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Preferred Delivery Window</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% GMV Protected</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <div>
            Shopee Ultimate Case Challenge (SUCC). Multi-page Presentation Deck.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800 text-xs"
          >
            <ArrowUp className="w-3 h-3" />
            <span>Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
