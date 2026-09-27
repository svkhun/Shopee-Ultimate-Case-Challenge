"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sliders } from "lucide-react";

export default function ImageHero() {
  return (
    <section className="relative overflow-hidden bg-[#090d16] border-b border-slate-800/80 py-12 lg:py-16">
      {/* Background Logistics Wallpaper with subtle dark overlay */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-luminosity">
        <Image
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&auto=format&fit=crop"
          alt="Logistics Network Distribution Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090d16] via-[#090d16]/90 to-[#090d16]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Central Image Hero Card (matching the image hero layout from before, but purely with Shopee Logistics photography and no video) */}
        <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800/90 shadow-2xl bg-slate-950/60 group">
          {/* Hero Image Container */}
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px]">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
              alt="Shopee Express Smart Logistics & Parcel Sorting Center"
              fill
              className="object-cover object-center scale-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Dark gradient overlay for ultra-crisp Slender Geist text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/60 to-black/30" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10">
              {/* Top Meta Tag */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#ee4d2d]" />
                  <span>Shopee Ultimate Case Challenge</span>
                </div>

                <span className="hidden sm:inline-block text-[11px] font-mono text-slate-300 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  Image Hero • Logistics Innovation
                </span>
              </div>

              {/* Center / Bottom Headline with Slender Geist Typography */}
              <div className="max-w-3xl">
                <p className="text-xs sm:text-sm font-mono tracking-wider text-[#ff7a59] uppercase mb-2">
                  Smart COD Reliability System
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-4">
                  SHOPEE <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ee4d2d] to-[#ff7a59]">COD OPTIMIZATION</span>
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-slate-200 font-light max-w-2xl leading-relaxed mb-6 line-clamp-2 sm:line-clamp-none">
                  พลิกวิกฤตพัสดุเก็บเงินปลายทาง (COD) ตีกลับสูงกว่าปกติ 10.6 เท่า ด้วยระบบจัดกลุ่มความเสี่ยงอัจฉริยะและการนัดหมายเวลาจัดส่งตามใจผู้ซื้อ
                </p>

                {/* Call-to-Action Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/problem"
                    className="px-5 py-2.5 rounded-xl bg-[#ee4d2d] hover:bg-[#ff5722] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-[#ee4d2d]/25 transition-all flex items-center gap-2 group/btn"
                  >
                    <span>เริ่มดูสไลด์ที่ 1: วิเคราะห์ปัญหา</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/reliability-system#simulator"
                    className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#ff6f52]" />
                    <span>Live Reliability Simulator</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Summary Metric Cards under the Image Hero */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">COD Failed Risk</span>
            <div className="text-2xl sm:text-3xl font-light text-amber-400 tracking-tight">10.6×</div>
            <span className="text-[10px] text-slate-400 font-light">สูงกว่าพรีเพด (2.61% vs 0.25%)</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Total Order Mix</span>
            <div className="text-2xl sm:text-3xl font-light text-[#ee4d2d] tracking-tight">35%</div>
            <span className="text-[10px] text-slate-400 font-light">ของคำสั่งซื้อทั้งหมดเป็น COD</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Failed Delivery Share</span>
            <div className="text-2xl sm:text-3xl font-light text-rose-400 tracking-tight">85%</div>
            <span className="text-[10px] text-slate-400 font-light">ของพัสดุตีกลับเกิดจาก COD</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 block mb-1">Target Reduction</span>
            <div className="text-2xl sm:text-3xl font-light text-emerald-400 tracking-tight">-58%</div>
            <span className="text-[10px] text-slate-400 font-light">ลดความเสียหายโดยไม่เสีย GMV</span>
          </div>
        </div>
      </div>
    </section>
  );
}
