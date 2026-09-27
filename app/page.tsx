"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImageHero from "@/components/ImageHero";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  BarChart3, 
  Users, 
  Cpu, 
  Clock, 
  Award, 
  ShieldCheck
} from "lucide-react";

export default function Home() {
  const slides = [
    {
      num: 1,
      title: "Where The Problem Really Is",
      titleTh: "ต้นตอที่แท้จริงของปัญหาพัสดุตีกลับ",
      desc: "COD มีอัตราจัดส่งไม่สำเร็จสูงกว่าพรีเพดถึง 10.6 เท่า และเป็นต้นเหตุของพัสดุตีกลับกว่า 85% ทั่วทั้งแพลตฟอร์ม",
      href: "/problem",
      tag: "Slide 1 • Problem Analysis",
      stat: "10.6x Risk",
      icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
      accent: "border-amber-500/30 hover:border-amber-500/50",
    },
    {
      num: 2,
      title: "Who Should Shopee Target?",
      titleTh: "การแบ่งกลุ่มผู้ซื้อตามความน่าเชื่อถือ",
      desc: "แทนที่จะแบน COD ทั้งหมด ให้แยกผู้ซื้อเป็น 4 ระดับความเสี่ยงเพื่อคงประสบการณ์ที่ดีสำหรับลูกค้า 90%+",
      href: "/targeting",
      tag: "Slide 2 • Buyer Segmentation",
      stat: "4 Risk Tiers",
      icon: <Users className="w-5 h-5 text-blue-400" />,
      accent: "border-blue-500/30 hover:border-blue-500/50",
    },
    {
      num: 3,
      title: "Smart COD Reliability System",
      titleTh: "ระบบคะแนนความน่าเชื่อถือแบบไดนามิก",
      desc: "อัปเดต Reliability Score หลังส่งทุกครั้ง (+8 สำเร็จ, -25 ไม่สำเร็จ) ควบคู่กับระบบ EasySell สกัดสแปม 84%",
      href: "/reliability-system",
      tag: "Slide 3 • System Engine",
      stat: "Dynamic Score",
      icon: <Cpu className="w-5 h-5 text-[#ff6f52]" />,
      accent: "border-[#ee4d2d]/30 hover:border-[#ee4d2d]/50",
    },
    {
      num: 4,
      title: "Delivery Scheduling Optimization",
      titleTh: "ระบบนัดหมายช่วงเวลาจัดส่งตามใจผู้ซื้อ",
      desc: "เปิดให้เลือกช่วงเวลารับของล่วงหน้า (เช้า/บ่าย/เย็น) และแจ้งเตือนก่อนส่ง เพิ่มอัตราสำเร็จในรอบแรก",
      href: "/scheduling",
      tag: "Slide 4 • Window Optimization",
      stat: "+24% 1st Attempt",
      icon: <Clock className="w-5 h-5 text-emerald-400" />,
      accent: "border-emerald-500/30 hover:border-emerald-500/50",
    },
    {
      num: 5,
      title: "Expected Impact & Feasibility",
      titleTh: "ผลลัพธ์และความเป็นไปได้ในการดำเนินงาน",
      desc: "หลักการ Targeted, Progressive, Recoverable ช่วยลด COD ตีกลับลง 58% โดยไม่สูญเสียยอดขายรวม",
      href: "/impact",
      tag: "Slide 5 • Impact & KPI",
      stat: "58% Reduction",
      icon: <Award className="w-5 h-5 text-purple-400" />,
      accent: "border-purple-500/30 hover:border-purple-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Dedicated Image Hero Section with authentic Shopee Logistics imagery (no video) */}
        <ImageHero />

        {/* Presentation Index (The 5 Slides in Minimalist Cards) */}
        <section className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-mono font-medium text-[#ff6f52] uppercase tracking-wider">
                Table of Contents
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
                โครงสร้างการนำเสนอทั้ง 5 ส่วน (Multi-Page Deck)
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-xs font-light">
              คลิกเพื่อเข้าชมการวิเคราะห์ข้อมูลและแบบจำลองจำลองในแต่ละสไลด์
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {slides.map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className={`group p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900/80 transition-all duration-200 flex flex-col justify-between ${s.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
                      {s.icon}
                    </div>
                    <span className="text-xs font-mono font-medium text-slate-400 px-2 py-0.5 rounded bg-slate-950/60 border border-slate-800">
                      {s.stat}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    {s.tag}
                  </span>
                  <h3 className="text-base font-medium text-white group-hover:text-[#ff7a59] transition-colors mb-1">
                    {s.title}
                  </h3>
                  <div className="text-xs text-slate-400 mb-3 font-normal">
                    {s.titleTh}
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 group-hover:text-white">
                  <span>เปิดสไลด์</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}

            {/* Quick Strategy Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#ee4d2d]/10 via-slate-900/40 to-slate-900/60 border border-[#ee4d2d]/25 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ee4d2d]/20 text-[#ff7a59] text-[11px] font-mono font-medium mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Key Takeaway
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  Zero Friction for the 90%+
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  โซลูชันนี้ไม่แบนหรือยกเลิก COD แต่ใช้การคัดกรองแบบเป็นขั้นบันได (Reminder → Warning → Deposit) เพื่อรักษาอัตราการสั่งซื้อของลูกค้าดีไว้ได้ 100%
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <Link
                  href="/impact"
                  className="text-xs text-[#ff7a59] hover:underline font-medium flex items-center gap-1"
                >
                  <span>ดูรายละเอียดผลลัพธ์ (Impact &amp; KPI)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
