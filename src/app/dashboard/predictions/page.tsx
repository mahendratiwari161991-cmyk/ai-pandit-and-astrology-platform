"use client";

import React, { useState } from "react";
import { astrologyStore } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import { Calendar, Compass, Briefcase, Heart, Plane, ShieldCheck, Sparkles } from "lucide-react";

export default function PredictionsPage() {
  const { currentUser } = useUserRole();
  const primaryProfile = astrologyStore.getPrimaryBirthProfile(currentUser.id);
  const kundli = astrologyStore.getKundli(primaryProfile);

  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4" /> Transit & Dasha Forecasts
        </div>
        <h1 className="text-2xl font-bold font-serif text-white mt-1">
          Astrological Predictions & Horoscopes
        </h1>
        <p className="text-xs text-slate-400">
          Personalized Vedic transit forecasts based on your {kundli.moonSign.signName} Moon and {kundli.dashas.currentMahadasha.planet} Mahadasha cycle.
        </p>
      </div>

      {/* Timeframe Switcher */}
      <div className="flex items-center gap-2 p-1 bg-celestial-900 rounded-xl border border-gold-500/20 max-w-md">
        <button
          onClick={() => setTimeframe("daily")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
            timeframe === "daily" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
          }`}
        >
          Daily Horoscope
        </button>
        <button
          onClick={() => setTimeframe("weekly")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
            timeframe === "weekly" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
          }`}
        >
          Weekly Outlook
        </button>
        <button
          onClick={() => setTimeframe("monthly")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
            timeframe === "monthly" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
          }`}
        >
          Monthly Transit
        </button>
        <button
          onClick={() => setTimeframe("yearly")}
          className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
            timeframe === "yearly" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
          }`}
        >
          Annual 2026-27
        </button>
      </div>

      {/* Predictions Content by Timeframe */}
      {timeframe === "daily" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-2">
            <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase">
              <Briefcase className="w-4 h-4 text-gold-400" /> Career & Professional Decisions
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Moon transit stimulates productive collaboration in your workplace. A favorable 10th house aspect allows clear communication with managers and stakeholders. Focus on completing pending projects rather than initiating hasty pivots.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-2">
            <div className="flex items-center gap-2 text-pink-300 font-bold text-xs uppercase">
              <Heart className="w-4 h-4 text-pink-400" /> Romance & Domestic Equilibrium
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Venus energy promotes peaceful dinner conversations and mutual reassurance. Excellent evening for discussing future travel or home improvements with your partner.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Wealth & Expenditure
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mercury transit in harmonious trine supports balanced financial prudence. Good day to review family insurance, fixed deposit renewals, or recurring subscriptions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-2">
            <div className="flex items-center gap-2 text-blue-300 font-bold text-xs uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-400" /> Health & Vitality
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Solar vitality remains stable. Practice early morning hydration and 15 minutes of quiet Surya Namaskar to channel excess fiery energy constructively.
            </p>
          </div>
        </div>
      )}

      {timeframe === "weekly" && (
        <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-4">
          <h3 className="text-sm font-bold text-white">Weekly Highlights & Planetary Transits</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            This week begins with Moon entering its exaltation quadrant, providing exceptional mental clarity on Monday and Tuesday. Mid-week brings favorable conjunction for resolving financial matters. Maintain caution on Friday during minor Mars-Saturn square; avoid argumentative conversations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-celestial-900 border border-celestial-800">
              <strong className="text-emerald-300">Peak Auspicious Days: </strong>
              <div className="text-white mt-1">Tuesday & Thursday</div>
            </div>
            <div className="p-3 rounded-xl bg-celestial-900 border border-celestial-800">
              <strong className="text-amber-300">Days for Caution: </strong>
              <div className="text-white mt-1">Friday late evening</div>
            </div>
            <div className="p-3 rounded-xl bg-celestial-900 border border-celestial-800">
              <strong className="text-gold-300">Recommended Mantra: </strong>
              <div className="text-white mt-1">Gayatri Mantra (21x daily)</div>
            </div>
          </div>
        </div>
      )}

      {timeframe === "monthly" && (
        <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-4">
          <h3 className="text-sm font-bold text-white">Monthly Planetary Shift Analysis</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The major transit of Sun into 5th house opens avenues for creative recognition, professional expansion, and joyful celebrations with family. Favorable Jupiter aspect upon your 9th house of fortune indicates potential business travel or blessings from mentors and gurus.
          </p>
        </div>
      )}

      {timeframe === "yearly" && (
        <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-4">
          <h3 className="text-sm font-bold text-white">Annual Transit Overview (2026-2027)</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Under your active {kundli.dashas.currentMahadasha.planet} Mahadasha cycle, this year marks a pivotal phase of foundation building. Key planetary retrogrades in mid-year will prompt reassessment of contracts and partnerships, followed by accelerated career growth in Q4.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-slate-300">
            <div className="p-3 rounded-xl bg-celestial-900 border border-celestial-800">
              <span className="font-bold text-gold-300">Career Changes & Promotions: </span>
              Favorable planetary transit window between September and December.
            </div>
            <div className="p-3 rounded-xl bg-celestial-900 border border-celestial-800">
              <span className="font-bold text-gold-300">Foreign Travel & Relocation: </span>
              Strong Rahu-9th house transit activations indicate successful overseas opportunities.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
