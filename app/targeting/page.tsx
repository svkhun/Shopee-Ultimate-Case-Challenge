"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideNavigation from "@/components/SlideNavigation";
import { 
  Users, 
  CheckCircle, 
  Bell, 
  AlertTriangle, 
  Lock, 
  ArrowRight,
  Smartphone
} from "lucide-react";

interface RiskTier {
  id: string;
  name: string;
  nameTh: string;
  badge: string;
  borderColor: string;
  textColor: string;
  badgeColor: string;
  icon: React.ReactNode;
  characteristics: string[];
  systemAction: string[];
  checkoutExperience: {
    badgeText: string;
    warningTitle: string;
    warningDesc: string;
    paymentOptions: string;
    frictionLevel: "Zero Friction" | "Gentle Nudge" | "Active Confirmation" | "Deposit Required";
  };
}

export default function TargetingPage() {
  const [selectedTier, setSelectedTier] = useState<string>("low");

  const riskTiers: RiskTier[] = [
    {
      id: "low",
      name: "Low-Risk Buyers",
      nameTh: "ผู้ซื้อความเสี่ยงต่ำ (ลูกค้าชั้นดี 90%+)",
      badge: "Score > 80",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      characteristics: [
        "ประวัติรับสินค้าสำเร็จสม่ำเสมอ (>95%)",
        "สั่งซื้อต่อเนื่องและพร้อมรับสายพนักงานขนส่ง",
        "ไม่เคยปฏิเสธพัสดุโดยไม่มีเหตุจำเป็น"
      ],
      systemAction: [
        "ใช้งาน COD ได้อย่างราบรื่นตามปกติ (Zero Friction)",
        "ไม่มีขั้นตอนยืนยันตัวตนหรือเก็บเงินมัดจำเพิ่มเติม",
        "ได้รับสิทธิประโยชน์และคูปองตามปกติ"
      ],
      checkoutExperience: {
        badgeText: "Verified Trustworthy Buyer",
        warningTitle: "Standard 1-Click COD Checkout",
        warningDesc: "ไม่มีการแจ้งเตือนหรือรหัสยืนยัน พัสดุถูกจัดส่งและชำระเงินสดปลายทางตามขั้นตอนปกติ",
        paymentOptions: "เปิดทุกช่องทางการชำระเงิน (COD, ShopeePay, SPayLater)",
        frictionLevel: "Zero Friction"
      }
    },
    {
      id: "medium",
      name: "Medium-Risk Buyers",
      nameTh: "ผู้ซื้อความเสี่ยงปานกลาง",
      badge: "Score 50 - 79",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      icon: <Bell className="w-5 h-5 text-amber-400" />,
      characteristics: [
        "เคยมีพัสดุส่งไม่สำเร็จหรือเลื่อนรับในรอบ 6 เดือน",
        "บางครั้งติดต่อไม่ได้ในวันจัดส่ง",
        "ผู้ซื้อบัญชีใหม่ที่ยังไม่มีประวัติชัดเจน"
      ],
      systemAction: [
        "ส่งข้อความแจ้งเตือนอัตโนมัติก่อนเริ่มรอบจัดส่ง",
        "ให้กดปุ่มยืนยันความพร้อมรับสินค้าผ่านแอป / SMS",
        "สามารถเลือกช่วงเวลาจัดส่งที่ตนเองอยู่บ้านได้"
      ],
      checkoutExperience: {
        badgeText: "Delivery Reminder Enabled",
        warningTitle: "Availability Check Notification",
        warningDesc: "ก่อนพนักงานขนส่งเริ่มออกเดินทาง ผู้ซื้อจะได้รับการแจ้งเตือนยืนยันเวลารับพัสดุผ่านแอป Shopee",
        paymentOptions: "เปิด COD พร้อมลิงก์เลือกเวลารับพัสดุ",
        frictionLevel: "Gentle Nudge"
      }
    },
    {
      id: "high",
      name: "High-Risk Buyers",
      nameTh: "ผู้ซื้อความเสี่ยงสูง",
      badge: "Score 30 - 49",
      borderColor: "border-[#ee4d2d]/40",
      textColor: "text-[#ff6f52]",
      badgeColor: "bg-[#ee4d2d]/10 text-[#ff6f52] border-[#ee4d2d]/25",
      icon: <AlertTriangle className="w-5 h-5 text-[#ff6f52]" />,
      characteristics: [
        "พัสดุตีกลับหรือปฏิเสธรับสินค้าหน้าบ้านบ่อยครั้ง",
        "กดยกเลิกออเดอร์ระหว่างคนขับกำลังไปส่ง",
        "พฤติกรรมสั่งของตามอารมณ์แล้วไม่ยอมจ่ายเงิน"
      ],
      systemAction: [
        "แสดงแบนเนอร์แจ้งเตือนเข้มงวดในหน้าสั่งซื้อ",
        "บังคับกดยืนยันการสั่งซื้อ (Mandatory Confirmation)",
        "แจ้งเตือนว่าหากปฏิเสธซ้ำจะถูกระงับสิทธิ์ COD"
      ],
      checkoutExperience: {
        badgeText: "Action Required Before Dispatch",
        warningTitle: "Mandatory Confirmation Modal",
        warningDesc: "ต้องยืนยันว่าจะชำระเงินสดปลายทางจำนวนเต็ม หากปฏิเสธการรับสินค้า บัญชีอาจถูกระงับสิทธิ์ COD",
        paymentOptions: "COD ต้องกดยืนยันผ่าน OTP ภายใน 2 ชั่วโมง",
        frictionLevel: "Active Confirmation"
      }
    },
    {
      id: "repeated",
      name: "Repeated High-Risk",
      nameTh: "ผู้ซื้อความเสี่ยงสูงซ้ำซ้อน",
      badge: "Score < 30",
      borderColor: "border-rose-500/30",
      textColor: "text-rose-400",
      badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/20",
      icon: <Lock className="w-5 h-5 text-rose-400" />,
      characteristics: [
        "มีประวัติพัสดุตีกลับซ้ำซากต่อเนื่อง 3 ครั้งขึ้นไป",
        "สร้างภาระต้นทุนขนส่งตีกลับ (RTO) สูง",
        "มีสัญญาณของบัญชีแกล้งสั่งหรือที่อยู่ปลอม"
      ],
      systemAction: [
        "เรียกเก็บเงินมัดจำค่าจัดส่งล่วงหน้า (฿40)",
        "ส่งเสริมให้เปลี่ยนไปชำระผ่าน ShopeePay / QR PromptPay",
        "ระงับ COD ชั่วคราว จนกว่าจะสร้างประวัติรับของสำเร็จใหม่"
      ],
      checkoutExperience: {
        badgeText: "COD Protection Policy Applied",
        warningTitle: "Deposit / Prepaid Conversion",
        warningDesc: "เพื่อยืนยันออเดอร์ COD นี้ กรุณาชำระมัดจำค่าส่ง ฿40 หรือเปลี่ยนไปจ่ายด้วย ShopeePay เพื่อรับส่วนลด ฿20",
        paymentOptions: "จำเป็นต้องวางมัดจำหรือจ่ายล่วงหน้าเต็มจำนวน",
        frictionLevel: "Deposit Required"
      }
    }
  ];

  const currentTier = riskTiers.find((t) => t.id === selectedTier) || riskTiers[0];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-medium uppercase tracking-wider mb-4">
              <Users className="w-3.5 h-3.5" />
              Slide 2 of 5 • Dynamic Segmentation
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight">
              Who Should Shopee <span className="font-semibold text-[#ee4d2d]">Target?</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Instead of treating every COD buyer the same, segment buyers by delivery reliability. การแบน COD ทั่วทั้งระบบจะส่งผลเสียต่อยอดขายรวม (GMV) กลยุทธ์ที่ถูกต้องคือการคัดกรองเฉพาะกลุ่มเสี่ยง
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {riskTiers.map((tier) => {
              const isSelected = selectedTier === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? `bg-slate-900/90 ${tier.borderColor} ring-1 ring-slate-700 shadow-md`
                      : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800">
                        {tier.icon}
                      </div>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${tier.badgeColor}`}>
                        {tier.badge}
                      </span>
                    </div>

                    <h2 className="text-sm font-semibold text-white mb-0.5">
                      {tier.name}
                    </h2>
                    <div className="text-[11px] text-slate-400 mb-4">
                      {tier.nameTh}
                    </div>

                    <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block mb-1 font-mono uppercase">
                          ลักษณะผู้ซื้อ:
                        </span>
                        <ul className="space-y-1 text-slate-300 text-[11px] font-light">
                          {tier.characteristics.map((c, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className={`w-1 h-1 rounded-full mt-1.5 ${tier.textColor} shrink-0`} />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <span className="text-[11px] text-slate-400 block mb-1 font-mono uppercase">
                          มาตรการ Shopee:
                        </span>
                        <ul className="space-y-1 text-[11px] font-light">
                          {tier.systemAction.map((a, i) => (
                            <li key={i} className={`flex items-start gap-1.5 ${tier.textColor}`}>
                              <ArrowRight className="w-2.5 h-2.5 mt-0.5 shrink-0" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Checkout:</span>
                    <span className={`font-semibold ${tier.textColor}`}>
                      {tier.checkoutExperience.frictionLevel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Mobile Checkout Preview */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-medium text-[#ff6f52] uppercase tracking-wider">
                  Live UI Simulator
                </span>
                <h2 className="text-lg font-medium text-white mt-0.5">
                  จำลองหน้าจอ Shopee Checkout สำหรับ: <span className={currentTier.textColor}>{currentTier.name}</span>
                </h2>
              </div>
              <div className="flex gap-1.5 text-xs">
                {riskTiers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTier(t.id)}
                    className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                      selectedTier === t.id
                        ? "bg-white text-slate-950 font-semibold"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {t.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mock Screen */}
              <div className="lg:col-span-2 p-5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#ee4d2d]" />
                    <span className="font-semibold text-white">Shopee Mobile App Checkout</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${currentTier.badgeColor}`}>
                    {currentTier.checkoutExperience.badgeText}
                  </span>
                </div>

                <div className={`mt-4 p-4 rounded-xl border ${currentTier.badgeColor} flex items-start gap-3`}>
                  <div className="p-1 rounded bg-black/40 mt-0.5 shrink-0">
                    {currentTier.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${currentTier.textColor} text-xs`}>
                      {currentTier.checkoutExperience.warningTitle}
                    </h3>
                    <p className="text-[11px] text-slate-300 mt-1 font-light leading-relaxed">
                      {currentTier.checkoutExperience.warningDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#ee4d2d]/20 text-[#ff6f52] font-mono font-bold text-[10px]">
                      COD
                    </span>
                    <span className="text-white text-[11px]">ชำระเงินปลายทาง (Cash on Delivery)</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {currentTier.checkoutExperience.frictionLevel}
                  </span>
                </div>
              </div>

              {/* Strategy Note */}
              <div className="p-5 rounded-xl bg-slate-950/40 border border-slate-800 flex flex-col justify-between text-xs">
                <div>
                  <span className="text-slate-400 font-mono text-[10px] uppercase block mb-1">
                    เหตุผลเชิงกลยุทธ์
                  </span>
                  <h3 className="font-medium text-white mb-2">
                    รักษาผู้ซื้อที่ดี คัดกรองเฉพาะกลุ่มเสี่ยง
                  </h3>
                  <p className="text-slate-300 font-light text-[11px] leading-relaxed">
                    การกำหนดมาตรการตามคะแนนประวัติรับสินค้า ช่วยให้ลูกค้ากว่า 90% ไม่รู้สึกถูกรบกวน ในขณะที่ผู้ซื้อที่ตีกลับซ้ำซากจะถูกควบคุมอย่างเป็นขั้นตอน
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400">
                  หลักการสำคัญ: <span className="text-emerald-400 font-medium">ไม่มีอุปสรรคกับลูกค้าที่ดี</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Navigation */}
          <SlideNavigation
            currentSlide={2}
            prevHref="/problem"
            prevLabel="Slide 1: Problem Analysis"
            nextHref="/reliability-system"
            nextLabel="Slide 3: Reliability System"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
