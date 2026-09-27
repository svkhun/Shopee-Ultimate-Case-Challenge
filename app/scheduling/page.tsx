"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideNavigation from "@/components/SlideNavigation";
import { 
  Calendar, 
  Truck, 
  Bell, 
  CheckCircle2, 
  Clock, 
  User, 
  Store, 
  Check
} from "lucide-react";

export default function SchedulingPage() {
  const [selectedSlot, setSelectedSlot] = useState<string>("evening");
  const [confirmed, setConfirmed] = useState<boolean>(true);

  const deliverySlots = [
    {
      id: "morning",
      time: "09:00 - 12:00",
      label: "Morning Window (ช่วงเช้า)",
      subtext: "เหมาะสำหรับจัดส่งที่บ้านหรือวันหยุด",
      badge: "Standard",
    },
    {
      id: "afternoon",
      time: "13:00 - 17:00",
      label: "Afternoon Window (ช่วงบ่าย)",
      subtext: "เหมาะสำหรับที่อยู่ออฟฟิศและที่ทำงาน",
      badge: "Popular",
    },
    {
      id: "evening",
      time: "17:00 - 20:00",
      label: "Evening Window (ช่วงค่ำ)",
      subtext: "เวลาหลังเลิกงาน อัตราจัดส่งสำเร็จสูงสุด",
      badge: "Recommended",
    },
    {
      id: "weekend",
      time: "Saturday 10:00 - 16:00",
      label: "Weekend Preferred (วันหยุดสุดสัปดาห์)",
      subtext: "เลือกส่งเฉพาะวันเสาร์หรือวันอาทิตย์",
      badge: "Flexible",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
              <Clock className="w-3.5 h-3.5" />
              Slide 4 of 5 • Preferred Delivery Window
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Delivery Scheduling <span className="font-semibold text-[#ee4d2d]">Optimization</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              สาเหตุสำคัญที่พัสดุ COD ส่งไม่สำเร็จคือผู้ซื้อไม่อยู่บ้านหรือไม่ได้เตรียมเงินสดไว้ การเปิดให้ผู้ซื้อเลือกช่วงเวลาที่สะดวกและส่งแจ้งเตือนล่วงหน้าจะช่วยแก้ปัญหาที่ต้นตอ
            </p>
          </div>

          {/* 4-Step Process Flow matching Slide 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-[#ee4d2d]/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#ff6f52] mb-4">
                <Calendar className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-[#ff6f52] uppercase block mb-1">Step 1</span>
              <h2 className="text-sm font-semibold text-white mb-1.5">
                Buyer Selects Window
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                ผู้ซื้อเลือกช่วงเวลาที่ตนเองหรือคนในบ้านสะดวกรับสายและจ่ายเงินสดที่หน้า Checkout
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 uppercase block mb-1">Step 2</span>
              <h2 className="text-sm font-semibold text-white mb-1.5">
                Courier Schedules
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                ระบบขนส่งจัดเส้นทางและจัดกลุ่มพัสดุตามโซนและช่วงเวลา เพื่อเพิ่มความคุ้มค่ารอบวิ่ง
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase block mb-1">Step 3</span>
              <h2 className="text-sm font-semibold text-white mb-1.5">
                Reminder Sent Before
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                ส่งการแจ้งเตือนล่วงหน้า 2-3 ชั่วโมง ระบุชื่อคนขับและยอดเงินสดที่ต้องเตรียมพร้อม
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Step 4</span>
              <h2 className="text-sm font-semibold text-white mb-1.5">
                Higher Success Rate
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                ส่งของและรับเงินได้ทันทีในครั้งแรก ลดการไปส่งซ้ำและลดอัตราพัสดุตีกลับได้อย่างชัดเจน
              </p>
            </div>
          </div>

          {/* Interactive Delivery Window Chooser Demo */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 mb-12">
            <div className="mb-6">
              <span className="text-xs font-mono font-medium text-[#ff6f52] uppercase tracking-wider">
                Interactive Checkout Feature
              </span>
              <h2 className="text-lg font-medium text-white mt-1">
                ทดลองเลือกช่วงเวลาจัดส่ง (Shopee Preferred Delivery Window)
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                คลิกเลือกช่วงเวลาที่คุณสะดวกรับพัสดุเพื่อดูการจำลองการจัดส่ง
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {deliverySlots.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      setSelectedSlot(slot.id);
                      setConfirmed(true);
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "bg-slate-900 border-[#ee4d2d] shadow-sm ring-1 ring-[#ee4d2d]/30"
                        : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-white">
                        {slot.time}
                      </span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-[#ee4d2d] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium text-slate-200 mb-1">
                      {slot.label}
                    </div>
                    <div className="text-[11px] text-slate-400 font-light">
                      {slot.subtext}
                    </div>
                  </div>
                );
              })}
            </div>

            {confirmed && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="font-semibold text-white block">
                      ยืนยันช่วงเวลาจัดส่ง: {deliverySlots.find((s) => s.id === selectedSlot)?.time}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      พนักงาน Shopee Xpress จะนำส่งตามเวลานี้ พร้อมส่ง SMS ยืนยันยอดเงินสด ฿389 ล่วงหน้า 2 ชม.
                    </span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 whitespace-nowrap">
                  +24% First-Attempt Success Boost
                </span>
              </div>
            )}
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* For Buyers */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Benefits For Buyers</h3>
                  <span className="text-[11px] text-slate-400">ประโยชน์สำหรับผู้ซื้อ</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Greater delivery convenience</strong>
                    เลือกเวลารับพัสดุตามชีวิตประจำวัน ไม่ต้องกังวลว่าคนขับจะมาตอนไม่อยู่
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Fewer missed deliveries</strong>
                    ลดปัญหาการโทรหาไม่ติด หรือพลาดการส่งจนต้องรอรอบวันถัดไป
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">More control over delivery timing</strong>
                    ทราบเวลาและเตรียมเงินสดล่วงหน้าได้อย่างสบายใจ
                  </div>
                </li>
              </ul>
            </div>

            {/* For Shopee & Sellers */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-[#ee4d2d]/10 border border-[#ee4d2d]/20 flex items-center justify-center text-[#ff6f52]">
                  <Store className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">Benefits For Shopee &amp; Sellers</h3>
                  <span className="text-[11px] text-slate-400">ประโยชน์สำหรับ Shopee และผู้ขาย</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6f52] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Higher first-attempt delivery success</strong>
                    คนขับส่งของถึงมือลูกค้าสำเร็จตั้งแต่รอบแรก ไม่ต้องวิ่งวนซ้ำ
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6f52] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Lower re-delivery and return costs</strong>
                    ลดต้นทุน Reverse Logistics และสินค้าไม่ค้างคลังผู้ขายนานเกินไป
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6f52] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Increased customer satisfaction</strong>
                    สร้างความประทับใจ เพิ่มโอกาสการกลับมาซื้อซ้ำในแพลตฟอร์ม
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Stepper Navigation */}
          <SlideNavigation
            currentSlide={4}
            prevHref="/reliability-system"
            prevLabel="Slide 3: Reliability System"
            nextHref="/impact"
            nextLabel="Slide 5: Expected Impact & Feasibility"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
