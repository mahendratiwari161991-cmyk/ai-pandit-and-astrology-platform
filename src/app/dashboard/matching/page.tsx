"use client";

import React, { useState } from "react";
import { astrologyStore } from "@/lib/db/mock-store";
import { POPULAR_CITIES } from "@/lib/data/cities";
import { AshtakootScore } from "@/lib/astrology/types";
import { MatchingViewer } from "@/components/astrology/MatchingViewer";
import { Heart, Printer, Sparkles } from "lucide-react";

export default function MatchingStudioPage() {
  const brideProfile = astrologyStore.birthProfiles[1] || astrologyStore.birthProfiles[0];
  const groomProfile = astrologyStore.birthProfiles[0];

  const [brideName, setBrideName] = useState(brideProfile.name);
  const [brideDob, setBrideDob] = useState(brideProfile.dob);
  const [brideTob, setBrideTob] = useState(brideProfile.tob);
  const [brideCity, setBrideCity] = useState(POPULAR_CITIES[3]); // Varanasi

  const [groomName, setGroomName] = useState(groomProfile.name);
  const [groomDob, setGroomDob] = useState(groomProfile.dob);
  const [groomTob, setGroomTob] = useState(groomProfile.tob);
  const [groomCity, setGroomCity] = useState(POPULAR_CITIES[0]); // New Delhi

  const [matchScore, setMatchScore] = useState<AshtakootScore>(
    astrologyStore.getMatching(brideProfile, groomProfile)
  );
  const [isMatching, setIsMatching] = useState(false);

  const handleCalculateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsMatching(true);

    try {
      const res = await fetch("/api/kundli/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bride: {
            name: brideName,
            dob: brideDob,
            tob: brideTob,
            pob: `${brideCity.name}, ${brideCity.country}`,
            latitude: brideCity.lat,
            longitude: brideCity.lng,
            timezone: brideCity.timezone,
          },
          groom: {
            name: groomName,
            dob: groomDob,
            tob: groomTob,
            pob: `${groomCity.name}, ${groomCity.country}`,
            latitude: groomCity.lat,
            longitude: groomCity.lng,
            timezone: groomCity.timezone,
          },
        }),
      });

      const resJson = await res.json();
      if (resJson.success) {
        setMatchScore(resJson.data.score);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-pink-400" /> Ashtakoot Guna Milan
          </div>
          <h1 className="text-2xl font-bold font-serif text-white mt-1">
            Marriage Kundli Matching
          </h1>
          <p className="text-xs text-slate-400">
            Deterministic 36-point compatibility calculation, Manglik dosha balancing, and Nadi exception rules.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-3.5 py-1.5 rounded-xl bg-celestial-800 border border-gold-500/30 text-gold-300 font-semibold text-xs hover:bg-gold-500/10 transition flex items-center gap-1.5 self-start"
        >
          <Printer className="w-3.5 h-3.5" /> Download Marriage PDF
        </button>
      </div>

      {/* Bride & Groom Form */}
      <form onSubmit={handleCalculateMatch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bride Card */}
          <div className="p-5 rounded-2xl bg-celestial-900/80 border border-pink-500/30 space-y-3">
            <div className="text-xs font-bold text-pink-300 uppercase tracking-wider">
              Bride's Birth Details (कन्या)
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-pink-500/30 text-white text-xs focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={brideDob}
                    onChange={(e) => setBrideDob(e.target.value)}
                    required
                    className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-pink-500/30 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Time of Birth</label>
                  <input
                    type="time"
                    value={brideTob}
                    onChange={(e) => setBrideTob(e.target.value)}
                    required
                    className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-pink-500/30 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Birth City</label>
                <select
                  value={brideCity.name}
                  onChange={(e) => {
                    const c = POPULAR_CITIES.find((item) => item.name === e.target.value);
                    if (c) setBrideCity(c);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-pink-500/30 text-white text-xs focus:outline-none"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={c.name} value={c.name} className="bg-celestial-900 text-white">
                      {c.name}, {c.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Groom Card */}
          <div className="p-5 rounded-2xl bg-celestial-900/80 border border-blue-500/30 space-y-3">
            <div className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Groom's Birth Details (वर)
            </div>
            <div className="space-y-2">
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  required
                  className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-blue-500/30 text-white text-xs focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={groomDob}
                    onChange={(e) => setGroomDob(e.target.value)}
                    required
                    className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-blue-500/30 text-white text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 mb-1">Time of Birth</label>
                  <input
                    type="time"
                    value={groomTob}
                    onChange={(e) => setGroomTob(e.target.value)}
                    required
                    className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-blue-500/30 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-300 mb-1">Birth City</label>
                <select
                  value={groomCity.name}
                  onChange={(e) => {
                    const c = POPULAR_CITIES.find((item) => item.name === e.target.value);
                    if (c) setGroomCity(c);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-blue-500/30 text-white text-xs focus:outline-none"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={c.name} value={c.name} className="bg-celestial-900 text-white">
                      {c.name}, {c.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isMatching}
            className="px-8 py-2.5 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {isMatching ? "Calculating 36 Gunas..." : "Calculate Ashtakoot Compatibility"}
          </button>
        </div>
      </form>

      {/* Render Match Score Breakdown */}
      {matchScore && (
        <MatchingViewer
          score={matchScore}
          brideName={brideName}
          groomName={groomName}
        />
      )}
    </div>
  );
}
