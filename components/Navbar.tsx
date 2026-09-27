"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sliders, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Overview" },
    { href: "/problem", label: "1. Problem" },
    { href: "/targeting", label: "2. Targeting" },
    { href: "/reliability-system", label: "3. Reliability" },
    { href: "/scheduling", label: "4. Scheduling" },
    { href: "/impact", label: "5. Impact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#ee4d2d] flex items-center justify-center text-white font-black text-base shadow-sm group-hover:bg-[#ff5722] transition-colors">
            S
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-sm tracking-tight">
              Shopee
            </span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60 uppercase tracking-wider">
              Case Challenge
            </span>
          </div>
        </Link>

        {/* Center Multi-page Tabs (Desktop) */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 text-xs">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                  isActive
                    ? "bg-[#ee4d2d] text-white shadow-sm font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA: Simulator Shortcut */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/reliability-system#simulator"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-[#ff6f52]" />
            <span>Live Simulator</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0c101c] px-4 py-3 space-y-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-[#ee4d2d] text-white font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/reliability-system#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-[#ff6f52] bg-[#ee4d2d]/10"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Launch Live Simulator</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
