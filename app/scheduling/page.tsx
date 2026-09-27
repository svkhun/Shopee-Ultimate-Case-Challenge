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
      label: "Morning Window",
      subtext: "Ideal for residential addresses and morning availability",
      badge: "Standard",
    },
    {
      id: "afternoon",
      time: "13:00 - 17:00",
      label: "Afternoon Window",
      subtext: "Optimal for workplace, office, and business hours",
      badge: "Popular",
    },
    {
      id: "evening",
      time: "17:00 - 20:00",
      label: "Evening Window",
      subtext: "After-work arrival; yields highest completion rate",
      badge: "Recommended",
    },
    {
      id: "weekend",
      time: "Saturday 10:00 - 16:00",
      label: "Weekend Preferred",
      subtext: "Dedicated fulfillment on non-working days",
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
              A primary root cause of failed COD deliveries is buyers being away from home or lacking cash on hand. Allowing buyers to select preferred delivery windows alongside proactive pre-dispatch SMS alerts directly solves this bottleneck.
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
                Buyers choose a convenient delivery window at checkout when they or family members are available with cash.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-blue-500/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 uppercase block mb-1">Step 2</span>
              <h2 className="text-sm font-semibold text-white mb-1.5">
                Courier Route Scheduling
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Logistics systems cluster parcels by delivery window and zone, optimizing vehicle routing density.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-amber-500/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Bell className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 uppercase block mb-1">Step 3</span>
              <h2 className="text-sm font-semibold text-white mb-1.5">
                Proactive Pre-Dispatch Alert
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Automated SMS alerts are sent 2-3 hours in advance, detailing driver info and exact cash needed.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase block mb-1">Step 4</span>
              <h2 className="text-sm font-semibold text-white mb-1.5">
                First-Attempt Success
              </h2>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Cash collection succeeds on the first attempt, dramatically cutting re-delivery costs and returns.
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
                Shopee Preferred Delivery Window Simulator
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your preferred delivery window to preview how Shopee Xpress schedules fulfillment.
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
                      Confirmed Window: {deliverySlots.find((s) => s.id === selectedSlot)?.time}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Shopee Xpress will deliver during this window. An SMS confirming the cash collection of ฿389 will be sent 2 hours prior.
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
                  <span className="text-[11px] text-slate-400">Empowering recipient convenience</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Greater delivery convenience</strong>
                    Schedule deliveries around daily routines without worrying about couriers arriving while away.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Fewer missed deliveries</strong>
                    Eliminate unreachable phone scenarios and inconvenient multi-day delivery postponements.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">More control over delivery timing</strong>
                    Accurate arrival transparency gives buyers peace of mind to prepare exact cash in advance.
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
                  <span className="text-[11px] text-slate-400">Operational &amp; financial advantages</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 font-light leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6f52] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Higher first-attempt delivery success</strong>
                    Couriers fulfill parcels on the first run, optimizing fleet mileage and delivery capacity.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6f52] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Lower re-delivery and return costs</strong>
                    Drastically curtails reverse logistics overhead and prevents seller inventory lockup.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6f52] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white font-medium block">Increased customer satisfaction</strong>
                    Strengthens buyer loyalty, encouraging repeated platform purchases and higher lifetime value.
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
