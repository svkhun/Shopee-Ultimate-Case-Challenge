"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Truck, 
  Bell, 
  CheckCircle2, 
  Clock, 
  User, 
  Store, 
  Sparkles,
  Check
} from "lucide-react";

export default function SchedulingSection() {
  const [selectedSlot, setSelectedSlot] = useState<string>("evening");
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const deliverySlots = [
    {
      id: "morning",
      time: "09:00 - 12:00",
      label: "Morning Window",
      subtext: "Best for home deliveries / weekend",
      popularity: "Standard",
    },
    {
      id: "afternoon",
      time: "13:00 - 17:00",
      label: "Afternoon Window",
      subtext: "Ideal for office / business addresses",
      popularity: "Popular",
    },
    {
      id: "evening",
      time: "17:00 - 20:00",
      label: "Evening Window",
      subtext: "Best for after-work hours (Highest Success)",
      popularity: "Recommended",
    },
    {
      id: "weekend",
      time: "Saturday 10:00 - 16:00",
      label: "Weekend Preferred",
      subtext: "Delivered strictly on Saturday or Sunday",
      popularity: "Flexible",
    },
  ];

  return (
    <section id="scheduling" className="py-20 bg-[#0c101c] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" />
            Slide 4 Logistics Innovation • Preferred Delivery Window
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            Delivery Scheduling <span className="text-[#ee4d2d]">Optimization</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A primary reason COD deliveries fail is simply that buyers are not home or caught unprepared without cash. Allowing buyers to nominate preferred delivery windows solves this at the root.
          </p>
        </div>

        {/* 4-Step Process Flow matching Slide 4 Diagram */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 relative">
          {/* Step 1 */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 relative group hover:border-[#ee4d2d]/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[#ff6f52] mb-4 font-bold text-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-[#ff6f52] uppercase tracking-wider mb-1">
              Step 1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Buyer Selects Delivery Window
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              At checkout, the buyer chooses the time slot when they or a household member will be present to receive and pay.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 relative group hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 font-bold text-lg">
              <Truck className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
              Step 2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Courier Schedules Delivery
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Shopee Xpress / 3PL routing engine clusters parcels by geographical zone and scheduled window for optimal fuel and drop efficiency.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 relative group hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 font-bold text-lg">
              <Bell className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              Step 3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Reminder Sent Before Deliver
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated push notification / SMS sent 2-3 hours prior, alerting the buyer with courier name and exact cash amount needed.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-slate-900/70 rounded-2xl p-6 border border-slate-800 relative group hover:border-emerald-500/50 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 font-bold text-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Step 4
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Higher First-Attempt Delivery Success
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Courier hands over package on the first trip; cash is ready, eliminating missed visits, second attempts, and RTO return loops.
            </p>
          </div>
        </div>

        {/* Interactive Delivery Window Selector Widget */}
        <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl mb-16">
          <div className="max-w-2xl mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#ee4d2d]/20 text-[#ff6f52] text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Prototype
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white">
              Try the Shopee Preferred Delivery Window Picker
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Experience the simple frictionless UI that buyers encounter at Shopee checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {deliverySlots.map((slot) => {
              const isSelected = selectedSlot === slot.id;
              return (
                <div
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlot(slot.id);
                    setConfirmed(true);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative ${
                    isSelected
                      ? "bg-[#ee4d2d]/15 border-[#ee4d2d] shadow-lg shadow-[#ee4d2d]/10 ring-2 ring-[#ee4d2d]/30"
                      : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-slate-300">
                      {slot.time}
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#ee4d2d] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white mb-1">
                    {slot.label}
                  </div>
                  <div className="text-xs text-slate-400">
                    {slot.subtext}
                  </div>
                  <div className="mt-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      slot.popularity === "Recommended"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}>
                      {slot.popularity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Courier notification preview */}
          {confirmed && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-bold text-white block">
                    Delivery window scheduled: {deliverySlots.find((s) => s.id === selectedSlot)?.time}
                  </span>
                  <span className="text-slate-400">
                    Shopee Xpress driver assigned. You will receive an SMS reminder 2 hours prior with exact amount: ฿389.
                  </span>
                </div>
              </div>
              <div className="text-emerald-400 font-bold whitespace-nowrap bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                +35% First-Attempt Success Boost
              </div>
            </div>
          )}
        </div>

        {/* Benefits Grid matching Slide 4 Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Buyers */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Benefits For Buyers</h4>
                <p className="text-xs text-slate-400">Customer experience & peace of mind</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Greater delivery convenience</strong>
                  Receiving deliveries on their own schedule without unexpected disruptions during working hours.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Fewer missed deliveries</strong>
                  Drastic drop in missed doorbell rings, failed courier attempts, and awkward rescheduling calls.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">More control over delivery timing</strong>
                  Empowers buyers with exact awareness of when cash must be prepared at home.
                </div>
              </li>
            </ul>
          </div>

          {/* For Shopee & Sellers */}
          <div className="bg-slate-900/60 rounded-3xl p-8 border border-slate-800 relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#ee4d2d]/10 border border-[#ee4d2d]/30 flex items-center justify-center text-[#ff6f52]">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Benefits For Shopee &amp; Sellers</h4>
                <p className="text-xs text-slate-400">Logistics efficiency & profitability</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ff6f52] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Higher first-attempt delivery success</strong>
                  Logistics partners achieve higher hit rates, avoiding expensive repeat courier visits.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ff6f52] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Lower re-delivery and return costs</strong>
                  Directly curtails Reverse Logistics costs and tied-up merchant stock inventory.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ff6f52] mt-0.5 shrink-0" />
                <div>
                  <strong className="text-white block">Increased customer satisfaction</strong>
                  Builds trust between buyers and sellers, leading to higher lifetime order value (LTV).
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
