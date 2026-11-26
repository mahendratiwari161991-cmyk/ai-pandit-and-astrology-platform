"use client";

import React from "react";
import Link from "next/link";
import { astrologyStore } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import {
  Compass,
  Sparkles,
  Heart,
  Hand,
  Smile,
  Hash,
  ArrowRight,
  Sun,
  Moon,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { currentUser } = useUserRole();
  const primaryProfile = astrologyStore.getPrimaryBirthProfile(currentUser.id);
  const kundli = astrologyStore.getKundli(primaryProfile);
  const numerology = astrologyStore.getNumerology(primaryProfile);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-celestial-800 via-celestial-900 to-celestial-950 border border-gold-500/40 shadow-gold-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-xs text-gold-400 font-semibold uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles className="w-4 h-4" /> Namaste, {currentUser.fullName}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            Your Daily Astrological Orbit
          </h1>
          <p className="text-xs text-slate-300 max-w-lg">
            Birth Chart aligned to <span className="text-gold-300 font-semibold">{kundli.ascendant.signName} Ascendant</span> and <span className="text-gold-300 font-semibold">{kundli.moonSign.signName} Rashi</span> ({kundli.moonSign.nakshatra} Nakshatra).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/chat"
            className="px-4 py-2 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Ask AI Pandit
          </Link>
          <Link
            href="/dashboard/kundli"
            className="px-4 py-2 rounded-xl bg-celestial-900 border border-gold-500/30 text-gold-300 font-bold text-xs hover:bg-gold-500/10 transition"
          >
            View Full Kundli
          </Link>
        </div>
      </div>

      {/* Quick Astro Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Ascendant (Lagna)</span>
            <Compass className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-lg font-bold text-white">{kundli.ascendant.signName}</div>
          <div className="text-[11px] text-gold-300">{kundli.ascendant.nakshatra} P{kundli.ascendant.pada}</div>
        </div>

        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Moon Sign (Rashi)</span>
            <Moon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white">{kundli.moonSign.signName}</div>
          <div className="text-[11px] text-slate-400">Lord: {kundli.moonSign.signLord}</div>
        </div>

        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Birth Number (Mulank)</span>
            <Hash className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white">{numerology.birthNumber}</div>
          <div className="text-[11px] text-gold-300">Ruling: {numerology.rulingPlanet}</div>
        </div>

        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Current Mahadasha</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white">{kundli.dashas.currentMahadasha.planet}</div>
          <div className="text-[11px] text-slate-400">Active until {kundli.dashas.currentMahadasha.endDate.split("-")[0]}</div>
        </div>
      </div>

      {/* Today's Planetary Transit Horoscope */}
      <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-xs text-gold-400 font-bold uppercase tracking-wider">
              Transit Influences For {kundli.moonSign.signName} Moon
            </div>
            <h2 className="text-lg font-bold text-white">Daily Cosmic Outlook</h2>
          </div>
          <span className="text-xs text-slate-400 bg-celestial-900 px-3 py-1 rounded-full border border-celestial-700">
            {new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1.5">
            <span className="font-bold text-gold-200">Career & Enterprise:</span>
            <p className="leading-relaxed">
              Jupiter transit in favorable angle inspires confident strategic decision-making. Excellent period for presenting new proposals and organizing team priorities.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1.5">
            <span className="font-bold text-gold-200">Finances & Investments:</span>
            <p className="leading-relaxed">
              Steady inflows indicated by 2nd house planetary lord aspect. Maintain conservative budgeting and avoid impulsive speculative trades today.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1.5">
            <span className="font-bold text-gold-200">Relationships & Harmony:</span>
            <p className="leading-relaxed">
              Moon alignment fosters empathetic understanding. Express appreciation to family members and clear any lingering misunderstandings calmly.
            </p>
          </div>
        </div>
      </div>

      {/* Rapid Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/palmistry"
          className="p-5 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-2 block"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Hand className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white">AI Palmistry (Hastha Rekha)</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Upload left or right palm photos for instant detection of Life, Heart, and Fate lines with visual markers.
          </p>
          <span className="text-xs font-bold text-gold-300 flex items-center gap-1 pt-1">
            Scan Palm <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/face-reading"
          className="p-5 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-2 block"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Smile className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white">AI Face Reading (Samudrika)</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Front-facing photo analysis detecting forehead, eyes, lips, jawline symmetry and classical archetypes.
          </p>
          <span className="text-xs font-bold text-gold-300 flex items-center gap-1 pt-1">
            Analyze Face <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>

        <Link
          href="/dashboard/matching"
          className="p-5 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-2 block"
        >
          <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white">Marriage Kundli Matching</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Enter Bride & Groom birth charts to calculate 36 Ashtakoot Gunas, Manglik balance, and Nadi compatibility.
          </p>
          <span className="text-xs font-bold text-gold-300 flex items-center gap-1 pt-1">
            Match Kundlis <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
