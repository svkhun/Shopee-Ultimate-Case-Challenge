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
              กรอบการทำงานที่ออกแบบมาเพื่อลดความสูญเสียจากพัสดุตีกลับอย่างมีนัยสำคัญ ควบคู่กับการปกป้องยอดขายรวม (GMV) และประสบการณ์ของลูกค้าประจำ
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
                    <span className="text-[11px] text-slate-400">3 เสาหลักทางสถาปัตยกรรมระบบ</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <h3 className="font-semibold text-white">Targeted</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed">
                      เข้าแทรกแซงเฉพาะเมื่อมีความเสี่ยงสูงเท่านั้น
                    </p>
                    <p className="text-emerald-400 text-[11px] font-medium mt-1">
                      → ลูกค้าชั้นดีกว่า 90% ยังได้รับประสบการณ์ที่สะดวก ไร้อุปสรรค 100%
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <h3 className="font-semibold text-white">Progressive</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed">
                      มาตรการเป็นขั้นบันได: แจ้งเตือน → บังคับยืนยัน → วางมัดจำ
                    </p>
                    <p className="text-amber-300 text-[11px] font-medium mt-1">
                      → เพิ่มความรับผิดชอบอย่างค่อยเป็นค่อยไป โดยไม่ต้องแบน COD
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <h3 className="font-semibold text-white">Recoverable</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed">
                      ประวัติการรับสินค้าสำเร็จจะช่วยกู้คืนคะแนนได้อย่างรวดเร็ว
                    </p>
                    <p className="text-blue-300 text-[11px] font-medium mt-1">
                      → การจำกัดสิทธิ์เป็นเพียงชั่วคราว เปิดโอกาสให้ผู้ซื้อปรับพฤติกรรม
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
                    <span className="text-[11px] text-slate-400">ความเป็นไปได้และสามารถเริ่มใช้งานได้ทันที</span>
                  </div>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">ใช้ฐานข้อมูลที่มีอยู่แล้ว</h3>
                      <p className="text-slate-300 font-light text-[11px] mt-1 leading-relaxed">
                        ไม่ต้องสร้างระบบเก็บข้อมูลใหม่ Shopee บันทึกสถานะการจัดส่งสำเร็จ/ตีกลับในประวัติคำสั่งซื้ออยู่แล้ว
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">ใช้กฎเกณฑ์ที่ชัดเจน ตรวจสอบได้</h3>
                      <p className="text-slate-300 font-light text-[11px] mt-1 leading-relaxed">
                        เกณฑ์คะแนน (80, 50, 30) มีความโปร่งใส คาดเดาได้ และง่ายต่อการทดสอบ A/B Testing ในแต่ละประเทศ
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">ใช้ AI เฉพาะจุดที่คุ้มค่าจริง</h3>
                      <p className="text-slate-300 font-light text-[11px] mt-1 leading-relaxed">
                        นำ AI มาใช้สกัดขบวนการสแปมที่อยู่ปลอมและการจัดเส้นทางขนส่ง ไม่ได้ใช้ประเมินสินเชื่อแบบสุ่มเสี่ยง
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
                ตัวชี้วัดความสำเร็จ (KPIs) และแนวทางคุ้มครองผู้ซื้อ (Guardrails)
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
                      <span className="text-[10px] text-slate-400">จาก 2.61% ลดลงสู่เป้าหมาย &lt;1.10%</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold text-sm">↓ 58%</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">First-Attempt Success Rate</span>
                      <span className="text-[10px] text-slate-400">ด้วยระบบนัดหมายเวลาจัดส่ง</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-semibold text-sm">↑ 24%</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Repeat Failure Rate</span>
                      <span className="text-[10px] text-slate-400">ลดการตีกลับซ้ำซากด้วยระบบมัดจำ</span>
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
                      <span className="text-[10px] text-slate-400">ไม่สร้างอุปสรรคกับลูกค้าดี 90%+</span>
                    </div>
                    <span className="text-blue-400 font-mono font-semibold text-xs bg-blue-500/10 px-2 py-0.5 rounded">
                      Maintained (≥99.4%)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Order Volume (GMV)</span>
                      <span className="text-[10px] text-slate-400">รักษาสภาพคล่องและยอดขายรวม</span>
                    </div>
                    <span className="text-blue-400 font-mono font-semibold text-xs bg-blue-500/10 px-2 py-0.5 rounded">
                      Maintained (100%)
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 flex items-center justify-between">
                    <div>
                      <span className="font-medium text-white block">Buyer Complaint Rate</span>
                      <span className="text-[10px] text-slate-400">การแจ้งเตือนโปร่งใสและกู้สิทธิ์ได้</span>
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
