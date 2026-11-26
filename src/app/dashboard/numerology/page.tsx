"use client";

import React, { useState } from "react";
import { astrologyStore } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import { NumerologyReport, calculateNumerology } from "@/lib/numerology/engine";
import { Hash, Sparkles, Star, Calendar } from "lucide-react";

export default function NumerologyStudioPage() {
  const { currentUser } = useUserRole();
  const primaryProfile = astrologyStore.getPrimaryBirthProfile(currentUser.id);
  const [report, setReport] = useState<NumerologyReport>(astrologyStore.getNumerology(primaryProfile));

  const [calcName, setCalcName] = useState(primaryProfile.name);
  const [calcDob, setCalcDob] = useState(primaryProfile.dob);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport = calculateNumerology(calcName, calcDob);
    setReport(newReport);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Hash className="w-4 h-4" /> Vedic & Chaldean Numerology
        </div>
        <h1 className="text-2xl font-bold font-serif text-white mt-1">
          Numerology Numbers & Name Vibrations
        </h1>
        <p className="text-xs text-slate-400">
          Decode Mulank, Bhagyank, Life Path, Chaldean Name vibration, lucky numbers, and personal year cycles.
        </p>
      </div>

      {/* Input Form */}
      <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20">
        <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Birth Name</label>
            <input
              type="text"
              value={calcName}
              onChange={(e) => setCalcName(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={calcDob}
              onChange={(e) => setCalcDob(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-1.5 rounded-lg bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Calculate Vibrations
            </button>
          </div>
        </form>
      </div>

      {/* 4 Core Pillars Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-celestial-900/90 border border-gold-500/30 text-center space-y-1">
          <div className="text-xs text-slate-400 uppercase font-semibold">Mulank (Birth No.)</div>
          <div className="text-3xl font-extrabold text-gold-300 font-serif">{report.birthNumber}</div>
          <div className="text-[11px] text-slate-300">{report.rulingPlanet}</div>
        </div>

        <div className="p-5 rounded-2xl bg-celestial-900/90 border border-gold-500/30 text-center space-y-1">
          <div className="text-xs text-slate-400 uppercase font-semibold">Bhagyank (Destiny No.)</div>
          <div className="text-3xl font-extrabold text-gold-300 font-serif">{report.destinyNumber}</div>
          <div className="text-[11px] text-slate-300">Life Mission</div>
        </div>

        <div className="p-5 rounded-2xl bg-celestial-900/90 border border-gold-500/30 text-center space-y-1">
          <div className="text-xs text-slate-400 uppercase font-semibold">Life Path Number</div>
          <div className="text-3xl font-extrabold text-gold-300 font-serif">{report.lifePathNumber}</div>
          <div className="text-[11px] text-slate-300">Soul Journey</div>
        </div>

        <div className="p-5 rounded-2xl bg-celestial-900/90 border border-gold-500/30 text-center space-y-1">
          <div className="text-xs text-slate-400 uppercase font-semibold">Name Number (Chaldean)</div>
          <div className="text-3xl font-extrabold text-gold-300 font-serif">{report.nameNumber}</div>
          <div className="text-[11px] text-slate-300">Public Resonance</div>
        </div>
      </div>

      {/* Lucky Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="text-xs font-bold text-gold-300">Lucky Numbers</div>
          <div className="text-lg font-bold text-white font-serif">{report.luckyNumbers.join(", ")}</div>
          <p className="text-[11px] text-slate-400">Harmonious dates for signing agreements and beginning projects.</p>
        </div>

        <div className="p-4 rounded-xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="text-xs font-bold text-gold-300">Auspicious Colors</div>
          <div className="text-sm font-bold text-white">{report.luckyColors.join(", ")}</div>
          <p className="text-[11px] text-slate-400">Align your wardrobe and workspace with these solar vibrations.</p>
        </div>

        <div className="p-4 rounded-xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="text-xs font-bold text-gold-300">Favorable Days</div>
          <div className="text-sm font-bold text-white">{report.luckyDays.join(", ")}</div>
          <p className="text-[11px] text-slate-400">Peak energetic days of the week ruled by your primary planet.</p>
        </div>
      </div>

      {/* Detailed Interpretations */}
      <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-4">
        <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
          <Star className="w-4 h-4 text-gold-400" /> Complete Numerology Blueprint
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-xl bg-celestial-900/60 border border-celestial-800 space-y-1">
            <span className="font-bold text-gold-200">Mulank Meaning:</span>
            <p>{report.numberMeanings.mulankMeaning}</p>
          </div>
          <div className="p-4 rounded-xl bg-celestial-900/60 border border-celestial-800 space-y-1">
            <span className="font-bold text-gold-200">Bhagyank Meaning:</span>
            <p>{report.numberMeanings.bhagyankMeaning}</p>
          </div>
          <div className="p-4 rounded-xl bg-celestial-900/60 border border-celestial-800 space-y-1">
            <span className="font-bold text-gold-200">Life Path Vibration:</span>
            <p>{report.numberMeanings.lifePathMeaning}</p>
          </div>
          <div className="p-4 rounded-xl bg-celestial-900/60 border border-celestial-800 space-y-1">
            <span className="font-bold text-gold-200">Name Resonance:</span>
            <p>{report.numberMeanings.nameMeaning}</p>
          </div>
        </div>

        {/* Strengths & Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div>
            <span className="font-bold text-emerald-300">Core Strengths: </span>
            <span className="text-slate-300">{report.strengths.join(" • ")}</span>
          </div>
          <div>
            <span className="font-bold text-amber-300">Mindful Challenges: </span>
            <span className="text-slate-300">{report.challenges.join(" • ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
