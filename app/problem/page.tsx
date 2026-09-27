"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideNavigation from "@/components/SlideNavigation";
import { 
  AlertTriangle, 
  FileText, 
  XCircle, 
  ShieldAlert
} from "lucide-react";

export default function ProblemPage() {
  const [monthlyOrders, setMonthlyOrders] = useState<number>(15); // in millions
  const returnCostPerOrder = 45; // THB

  // Mathematical calculation based on Slide 1:
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
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Slide Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
              <ShieldAlert className="w-3.5 h-3.5" />
              Slide 1 of 5 • Root Cause Analysis
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Where The Problem <span className="font-semibold text-[#ee4d2d]">Really Is</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Three key metrics reveal where the failed delivery problem is concentrated. แทนที่จะมองว่าเป็นปัญหาขนส่งทั่วไประบบ ข้อมูลชี้ชัดว่าความเสียหายกว่า 85% เกิดขึ้นที่คำสั่งซื้อแบบเก็บเงินปลายทาง (COD)
            </p>
          </div>

          {/* 3 Key Metric Cards matching Slide 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: 10.6x Higher COD Risk */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-2">
                  10.6<span className="text-2xl font-normal text-amber-400">×</span>
                </div>
                <h2 className="text-base font-medium text-white mb-2">
                  Higher COD Risk
                </h2>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  อัตราจัดส่งไม่สำเร็จของ COD สูงถึง <strong className="text-amber-300 font-semibold">2.61%</strong> เทียบกับพรีเพดเพียง <strong className="text-emerald-400 font-semibold">0.25%</strong> — แตกต่างกันมากกว่า 10.6 เท่า
                </p>
              </div>

              {/* Comparison Visual */}
              <div className="pt-4 border-t border-slate-800/80 text-xs space-y-2">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Prepaid (Non-COD)</span>
                  <span className="text-emerald-400 font-mono font-medium">0.25%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "9.5%" }} />
                </div>
                <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                  <span>COD (Cash on Delivery)</span>
                  <span className="text-amber-400 font-mono font-medium">2.61%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            {/* Card 2: 35% Share of Total Orders */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-[#ee4d2d]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#ee4d2d]/10 border border-[#ee4d2d]/20 flex items-center justify-center text-[#ff6f52] mb-6">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-2">
                  35<span className="text-2xl font-normal text-[#ee4d2d]">%</span>
                </div>
                <h2 className="text-base font-medium text-white mb-2">
                  Share of Total Orders
                </h2>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  มากกว่า <strong className="text-[#ff7a59] font-semibold">1 ใน 3</strong> ของคำสั่งซื้อทั้งหมดบน Shopee เป็น COD ส่งผลให้ผลกระทบจากความล้มเหลวขยายตัวเป็นวงกว้าง
                </p>
              </div>

              {/* Ratio Bar */}
              <div className="pt-4 border-t border-slate-800/80 text-xs space-y-2">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Order Volume Mix</span>
                  <span className="text-white font-mono">35% COD / 65% Prepaid</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#ee4d2d]" style={{ width: "35%" }} />
                  <div className="h-full bg-blue-500" style={{ width: "65%" }} />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#ee4d2d]" /> COD</span>
                  <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Prepaid</span>
                </div>
              </div>
            </div>

            {/* Card 3: 85% Of Failed Deliveries */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-rose-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
                  <XCircle className="w-5 h-5" />
                </div>
                <div className="text-4xl sm:text-5xl font-light text-white tracking-tight mb-2">
                  85<span className="text-2xl font-normal text-rose-400">%</span>
                </div>
                <h2 className="text-base font-medium text-white mb-2">
                  Of Failed Deliveries
                </h2>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  สัดส่วนความล้มเหลวในการจัดส่งทั้งหมดถึง <strong className="text-rose-400 font-semibold">85%</strong> มีต้นเหตุมาจากออเดอร์ COD โดยคำนวณจากสัดส่วนออเดอร์และอัตราล้มเหลว
                </p>
              </div>

              {/* Failure share */}
              <div className="pt-4 border-t border-slate-800/80 text-xs space-y-2">
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>Concentration of Failures</span>
                  <span className="text-rose-400 font-mono font-medium">~{codShareOfFailures.toFixed(0)}% from COD</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-rose-500" style={{ width: "85%" }} />
                  <div className="h-full bg-slate-700" style={{ width: "15%" }} />
                </div>
                <p className="text-[10px] text-slate-400">
                  การแก้ปัญหาพัสดุตีกลับของ COD จะตัดยอดจัดส่งล้มเหลวได้ถึง 85%
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Volume & Financial Simulator */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-medium text-[#ff6f52] uppercase tracking-wider">
                  Interactive Simulator
                </span>
                <h2 className="text-xl font-medium text-white mt-1">
                  Monthly Shopee Volume &amp; Cost-to-Serve Impact
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  เลื่อนปรับจำนวนออเดอร์รายเดือนของ Shopee เพื่อคำนวณจำนวนพัสดุและค่าใช้จ่ายตีกลับ
                </p>
              </div>

              {/* Slider */}
              <div className="w-full lg:w-72 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-slate-400">Monthly Orders:</span>
                  <span className="font-mono font-semibold text-[#ff6f52]">{monthlyOrders}M orders</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#ee4d2d]"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                  <span>5M</span>
                  <span>25M</span>
                  <span>50M/mo</span>
                </div>
              </div>
            </div>

            {/* Calculated Results */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs text-slate-400 block mb-1">COD Volume (35%)</span>
                <div className="text-xl font-semibold text-white font-mono">
                  {(codOrders / 1_000_000).toFixed(2)}M
                </div>
                <span className="text-[10px] text-slate-400">พัสดุ COD ต่อเดือน</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs text-slate-400 block mb-1">COD Failed Parcels</span>
                <div className="text-xl font-semibold text-rose-400 font-mono">
                  {Math.round(codFailedOrders).toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400">ครั้งที่จัดส่งไม่สำเร็จ @ 2.61%</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-xs text-slate-400 block mb-1">Reverse Logistics Loss</span>
                <div className="text-xl font-semibold text-amber-400 font-mono">
                  ฿{(monthlyCostWasteTHB / 1_000_000).toFixed(2)}M
                </div>
                <span className="text-[10px] text-slate-400">ค่าขนส่งและจัดการพัสดุตีกลับ</span>
              </div>

              <div className="p-4 rounded-xl bg-[#ee4d2d]/10 border border-[#ee4d2d]/30">
                <span className="text-xs text-[#ff7a59] font-medium block mb-1">Potential Savings</span>
                <div className="text-xl font-semibold text-white font-mono">
                  ฿{(potentialSavingsTHB / 1_000_000).toFixed(2)}M
                </div>
                <span className="text-[10px] text-[#ff7a59]">ประหยัดได้ต่อเดือน (~52% reduction)</span>
              </div>
            </div>
          </div>

          {/* Stepper Navigation */}
          <SlideNavigation
            currentSlide={1}
            prevHref="/"
            prevLabel="Executive Overview"
            nextHref="/targeting"
            nextLabel="Slide 2: Buyer Targeting"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
