"use client";

import React, { useState } from "react";
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
  color: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
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

export default function TargetingSection() {
  const [selectedTier, setSelectedTier] = useState<string>("low");

  const riskTiers: RiskTier[] = [
    {
      id: "low",
      name: "Low-Risk Buyers",
      nameTh: "ผู้ซื้อความเสี่ยงต่ำ (ลูกค้าชั้นดี)",
      badge: "Score > 80",
      color: "emerald",
      bgLight: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-400",
      icon: <CheckCircle className="w-6 h-6 text-emerald-400" />,
      characteristics: [
        "High delivery success history (95%+ successful receiving)",
        "Frequent Shopee orders with timely parcel acceptance",
        "Prompt communication when courier calls"
      ],
      systemAction: [
        "Continue normal seamless COD experience",
        "No additional friction or checkout obstacles",
        "Priority customer support & trusted loyalty perks"
      ],
      checkoutExperience: {
        badgeText: "Verified Trustworthy Buyer",
        warningTitle: "Standard 1-Click COD Checkout",
        warningDesc: "No confirmation codes or warnings needed. Order dispatches immediately with full COD payment upon doorstep delivery.",
        paymentOptions: "All payment methods open (COD, ShopeePay, SPayLater, Cards)",
        frictionLevel: "Zero Friction"
      }
    },
    {
      id: "medium",
      name: "Medium-Risk Buyers",
      nameTh: "ผู้ซื้อความเสี่ยงปานกลาง",
      badge: "Score 50 - 79",
      color: "amber",
      bgLight: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-400",
      icon: <Bell className="w-6 h-6 text-amber-400" />,
      characteristics: [
        "Some failed or postponed deliveries in past 6 months",
        "Occasionally unreachable or away from delivery address",
        "Irregular receiving patterns or new account profiles"
      ],
      systemAction: [
        "Receive automated reminder before parcel delivery",
        "Prompt to confirm availability via Shopee app / SMS / WhatsApp",
        "Option to select convenient delivery time window"
      ],
      checkoutExperience: {
        badgeText: "Delivery Reminder Enabled",
        warningTitle: "Availability Check Notification",
        warningDesc: "Before courier dispatch, buyer receives a notification: 'Your parcel is arriving today between 13:00-16:00. Will you be available to receive it?'",
        paymentOptions: "COD enabled + Instant delivery rescheduling link",
        frictionLevel: "Gentle Nudge"
      }
    },
    {
      id: "high",
      name: "High-Risk Buyers",
      nameTh: "ผู้ซื้อความเสี่ยงสูง",
      badge: "Score 30 - 49",
      color: "orange",
      bgLight: "bg-[#ee4d2d]/10",
      borderColor: "border-[#ee4d2d]/40",
      textColor: "text-[#ff6f52]",
      icon: <AlertTriangle className="w-6 h-6 text-[#ff6f52]" />,
      characteristics: [
        "Frequent failed deliveries or parcel rejections at doorstep",
        "Multiple cancelled orders while out for delivery",
        "Pattern of impulse ordering and dodging courier calls"
      ],
      systemAction: [
        "Strong warning banner displayed on checkout screen",
        "Mandatory delivery confirmation required before shipping",
        "Explicit reminder that repeated failures restrict COD privileges"
      ],
      checkoutExperience: {
        badgeText: "Action Required Before Dispatch",
        warningTitle: "Mandatory Confirmation Modal",
        warningDesc: "Checkout displays: 'Please confirm you will be present to pay ฿450 on delivery. Repeated rejections will suspend COD on your account.'",
        paymentOptions: "COD requires in-app OTP/SMS confirmation within 2 hours",
        frictionLevel: "Active Confirmation"
      }
    },
    {
      id: "repeated",
      name: "Repeated High-Risk Buyers",
      nameTh: "ผู้ซื้อความเสี่ยงสูงซ้ำซ้อน",
      badge: "Score < 30",
      color: "rose",
      bgLight: "bg-rose-500/10",
      borderColor: "border-rose-500/40",
      textColor: "text-rose-400",
      icon: <Lock className="w-6 h-6 text-rose-400" />,
      characteristics: [
        "Consistent history of failed COD orders (3+ consecutive returns)",
        "Chronic non-acceptance causing major logistics return costs",
        "Signs of intentional prank ordering or address spoofing"
      ],
      systemAction: [
        "Deposit or partial prepayment required (e.g. shipping fee deposit)",
        "Encourage switch to prepaid payment (ShopeePay, SPayLater, PromptPay)",
        "COD temporarily gated until successful prepaid deliveries restore score"
      ],
      checkoutExperience: {
        badgeText: "COD Protection Policy Applied",
        warningTitle: "Deposit / Prepaid Conversion Prompt",
        warningDesc: "To confirm this COD order, pay a refundable ฿40 shipping deposit, or switch to ShopeePay / QR PromptPay to get ฿20 discount voucher!",
        paymentOptions: "Prepayment required or Partial Deposit; Earn score back with successful orders",
        frictionLevel: "Deposit Required"
      }
    }
  ];

  const currentTier = riskTiers.find((t) => t.id === selectedTier) || riskTiers[0];

  return (
    <section id="targeting" className="py-20 bg-[#0c101c] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ee4d2d]/10 border border-[#ee4d2d]/30 text-[#ff6f52] text-xs font-semibold uppercase tracking-wider mb-4">
            <Users className="w-3.5 h-3.5" />
            Slide 2 Strategy • Dynamic Segmentation
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Who Should Shopee <span className="text-[#ee4d2d]">Target?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium">
            Instead of treating every COD buyer the same, segment buyers by delivery reliability.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            A blanket ban on COD hurts overall conversion rate and GMV. A smart, tier-based approach isolates bad actors while preserving frictionless shopping for reliable customers.
          </p>
        </div>

        {/* 4 Cards Grid from Slide 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {riskTiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative border ${
                  isSelected
                    ? `${tier.bgLight} ${tier.borderColor} ring-2 ring-${tier.color}-500/50 shadow-xl scale-[1.02]`
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                {/* Header of card */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-xl ${tier.bgLight} border ${tier.borderColor}`}>
                    {tier.icon}
                  </div>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${tier.bgLight} ${tier.textColor} border ${tier.borderColor}`}>
                    {tier.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {tier.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  {tier.nameTh}
                </p>

                <div className="space-y-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block mb-1">Key Characteristics:</span>
                    <ul className="space-y-1 text-slate-300">
                      {tier.characteristics.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${tier.textColor}`} />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="text-slate-400 font-medium block mb-1">Shopee Action:</span>
                    <ul className="space-y-1">
                      {tier.systemAction.map((a, i) => (
                        <li key={i} className={`flex items-start gap-1.5 font-semibold ${tier.textColor}`}>
                          <ArrowRight className="w-3 h-3 mt-0.5 shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Checkout policy:</span>
                  <span className={`font-bold ${tier.textColor}`}>
                    {tier.checkoutExperience.frictionLevel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Shopee Mobile Checkout Simulation Preview */}
        <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ff6f52]">
                Interactive Buyer Experience
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Simulated Checkout Screen for: <span className={currentTier.textColor}>{currentTier.name}</span>
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Select tier above or click below:</span>
              <div className="flex gap-1.5">
                {riskTiers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTier(t.id)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      selectedTier === t.id
                        ? "bg-white text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {t.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Mock Shopee Checkout Card */}
            <div className="lg:col-span-2 bg-[#090d16] rounded-2xl p-6 border border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#ee4d2d]" />
                  <span className="text-sm font-bold text-white">Shopee Checkout Flow</span>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${currentTier.bgLight} ${currentTier.borderColor} ${currentTier.textColor}`}>
                  {currentTier.checkoutExperience.badgeText}
                </span>
              </div>

              {/* Dynamic Warning / Notice Banner */}
              <div className={`mt-4 p-4 rounded-xl border ${currentTier.bgLight} ${currentTier.borderColor} flex items-start gap-3`}>
                <div className="p-1.5 rounded-lg bg-black/40 mt-0.5">
                  {currentTier.icon}
                </div>
                <div>
                  <h5 className={`text-sm font-bold ${currentTier.textColor}`}>
                    {currentTier.checkoutExperience.warningTitle}
                  </h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {currentTier.checkoutExperience.warningDesc}
                  </p>
                </div>
              </div>

              {/* Payment selection list */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="text-slate-400 font-medium">Selected Payment Method:</div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#ee4d2d]/20 flex items-center justify-center text-[#ff6f52] font-bold">
                      COD
                    </div>
                    <div>
                      <div className="font-semibold text-white">Cash on Delivery (ชำระเงินปลายทาง)</div>
                      <div className="text-[11px] text-slate-400">
                        {currentTier.checkoutExperience.paymentOptions}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${currentTier.bgLight} ${currentTier.textColor}`}>
                    {currentTier.checkoutExperience.frictionLevel}
                  </span>
                </div>
              </div>
            </div>

            {/* Strategic Rationale Callout */}
            <div className="bg-slate-950/60 rounded-2xl p-6 border border-slate-800 h-full flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Strategic Rationale
                </div>
                <h5 className="text-base font-bold text-white mb-2">
                  Why this protects Shopee&apos;s Bottom Line
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  By matching interventions strictly to the buyer&apos;s historical reliability score, Shopee avoids driving away the 90%+ honest buyers who rely on COD, while applying targeted guardrails to the small cohort generating 85% of failed deliveries.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                Key Principle: <span className="text-emerald-400 font-semibold">Zero friction for the reliable</span>, <span className="text-[#ff6f52] font-semibold">Progressive accountability for the risky</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
