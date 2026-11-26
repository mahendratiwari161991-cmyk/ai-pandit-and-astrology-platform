"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useUserRole } from "@/context/UserRoleContext";
import { Sparkles, Globe, User, ShieldCheck, Award, Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, switchRole } = useUserRole();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-celestial-950/85 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-300 p-0.5 shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-full bg-celestial-950 rounded-[10px] flex items-center justify-center">
              <span className="text-xl">🕉️</span>
            </div>
          </div>
          <div>
            <span className="text-lg font-bold font-serif tracking-wide text-gold-gradient group-hover:opacity-90 transition">
              {t.brand}
            </span>
            <div className="text-[10px] text-gold-400/80 -mt-1 hidden sm:block">
              Vedic AI Platform
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-slate-200">
          <Link href="/dashboard/kundli" className="hover:text-gold-300 transition">
            {t.nav.kundli}
          </Link>
          <Link href="/dashboard/matching" className="hover:text-gold-300 transition">
            {t.nav.matching}
          </Link>
          <Link href="/dashboard/palmistry" className="hover:text-gold-300 transition">
            {t.nav.palmistry}
          </Link>
          <Link href="/dashboard/face-reading" className="hover:text-gold-300 transition">
            {t.nav.faceReading}
          </Link>
          <Link href="/dashboard/numerology" className="hover:text-gold-300 transition">
            {t.nav.numerology}
          </Link>
          <Link href="/dashboard/chat" className="hover:text-gold-300 text-gold-400 font-bold transition flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {t.nav.askPandit}
          </Link>
        </nav>

        {/* Controls: Language + Role Switcher + Dashboard Button */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-celestial-900 border border-gold-500/30 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded transition ${
                language === "en" ? "bg-gold-500 text-celestial-950 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("hi")}
              className={`px-2 py-1 rounded transition ${
                language === "hi" ? "bg-gold-500 text-celestial-950 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage("hinglish")}
              className={`px-2 py-1 rounded transition ${
                language === "hinglish" ? "bg-gold-500 text-celestial-950 font-bold" : "text-slate-300 hover:text-white"
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Quick Demo Role Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-celestial-900 border border-gold-500/30 rounded-lg px-2 py-1 text-xs">
            <User className="w-3.5 h-3.5 text-gold-400" />
            <select
              value={currentUser.role}
              onChange={(e) => switchRole(e.target.value as any)}
              className="bg-transparent text-gold-200 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="customer" className="bg-celestial-900 text-white">Role: Customer</option>
              <option value="pandit" className="bg-celestial-900 text-white">Role: Pandit</option>
              <option value="admin" className="bg-celestial-900 text-white">Role: Admin</option>
            </select>
          </div>

          {/* Direct Dashboard Link based on Role */}
          <Link
            href={
              currentUser.role === "pandit"
                ? "/pandit"
                : currentUser.role === "admin"
                ? "/admin"
                : "/dashboard"
            }
            className="px-3.5 py-1.5 rounded-lg bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition flex items-center gap-1.5"
          >
            {currentUser.role === "pandit" ? (
              <>
                <Award className="w-3.5 h-3.5" /> Pandit Portal
              </>
            ) : currentUser.role === "admin" ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" /> {t.nav.dashboard}
              </>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg bg-celestial-900 border border-gold-500/20 text-gold-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-celestial-950 border-b border-gold-500/20 px-4 py-4 space-y-3 text-sm">
          <Link
            href="/dashboard/kundli"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-gold-300 py-1"
          >
            {t.nav.kundli}
          </Link>
          <Link
            href="/dashboard/matching"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-gold-300 py-1"
          >
            {t.nav.matching}
          </Link>
          <Link
            href="/dashboard/palmistry"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-gold-300 py-1"
          >
            {t.nav.palmistry}
          </Link>
          <Link
            href="/dashboard/face-reading"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-gold-300 py-1"
          >
            {t.nav.faceReading}
          </Link>
          <Link
            href="/dashboard/numerology"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-gold-300 py-1"
          >
            {t.nav.numerology}
          </Link>
          <Link
            href="/dashboard/chat"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-gold-400 font-bold py-1"
          >
            {t.nav.askPandit}
          </Link>
          <div className="pt-2 border-t border-celestial-800 flex items-center justify-between text-xs">
            <span className="text-slate-400">Switch Demo Role:</span>
            <select
              value={currentUser.role}
              onChange={(e) => switchRole(e.target.value as any)}
              className="bg-celestial-900 text-gold-300 p-1 rounded border border-gold-500/30 text-xs"
            >
              <option value="customer">Customer</option>
              <option value="pandit">Pandit</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
