"use client";

import React, { useEffect } from "react";
import { astrologyStore } from "@/lib/db/mock-store";
import { NorthIndianChart } from "@/components/astrology/NorthIndianChart";
import { SouthIndianChart } from "@/components/astrology/SouthIndianChart";

export default function UnifiedPrintableReportPage() {
  const profile = astrologyStore.birthProfiles[0];
  const brideProfile = astrologyStore.birthProfiles[1];
  const kundli = astrologyStore.getKundli(profile);
  const numerology = astrologyStore.getNumerology(profile);
  const matching = astrologyStore.getMatching(brideProfile, profile);
  const palm = astrologyStore.palmReports[0];
  const face = astrologyStore.faceReports[0];

  return (
    <div className="bg-white text-slate-900 min-h-screen p-8 max-w-4xl mx-auto space-y-8 font-sans print:p-0">
      {/* Print Trigger Button (Hidden during actual print) */}
      <div className="no-print flex items-center justify-between p-4 bg-celestial-900 text-white rounded-xl mb-6">
        <div>
          <span className="font-bold text-gold-300">Unified Astro Report (PDF View)</span>
          <p className="text-xs text-slate-300">Click below to open print dialogue and save as PDF.</p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gold-500 text-celestial-950 font-bold rounded-lg text-xs"
        >
          Print / Save PDF
        </button>
      </div>

      {/* Page 1: Header & Birth Details */}
      <div className="border-b-2 border-gold-600 pb-6 text-center space-y-2">
        <div className="text-3xl font-serif font-extrabold text-celestial-950 flex items-center justify-center gap-2">
          <span>🕉️</span> AI PANDIT
        </div>
        <div className="text-xs tracking-widest text-gold-700 uppercase font-bold">
          Comprehensive Vedic Astrology & Predictive Life Report
        </div>
        <div className="text-sm font-semibold text-slate-700 pt-2">
          Prepared For: <span className="text-black font-bold text-base">{profile.name}</span>
        </div>
        <div className="text-xs text-slate-600">
          DOB: {profile.dob} • TOB: {profile.tob} • Place: {profile.pob} • Lahiri Ayanamsha: {kundli.ayanamshaValue.toFixed(2)}°
        </div>
      </div>

      {/* Birth Chart (Lagna D1 & Navamsha D9) */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif font-bold text-celestial-950 border-b border-slate-300 pb-1">
          1. Vedic Birth Charts (Lagna D1 & Navamsha D9)
        </h2>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="border border-slate-300 p-2 rounded-lg bg-slate-50 flex justify-center">
            <NorthIndianChart houses={kundli.houses} planets={kundli.planets} chartTitle="Lagna Kundli (D1)" size={320} />
          </div>
          <div className="border border-slate-300 p-2 rounded-lg bg-slate-50 flex justify-center">
            <NorthIndianChart houses={kundli.navamshaHouses} planets={kundli.planets} chartTitle="Navamsha (D9)" size={320} />
          </div>
        </div>
      </div>

      {/* Planetary Placements Table */}
      <div className="space-y-2">
        <h2 className="text-sm font-bold text-celestial-950 uppercase tracking-wider">
          Planetary Positions & Dignities
        </h2>
        <table className="w-full text-left text-xs border border-slate-300">
          <thead className="bg-slate-100 border-b border-slate-300 font-bold">
            <tr>
              <th className="p-2">Planet</th>
              <th className="p-2">Sign</th>
              <th className="p-2">Degree</th>
              <th className="p-2">House</th>
              <th className="p-2">Nakshatra</th>
              <th className="p-2">Dignity</th>
              <th className="p-2">Speed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {Object.values(kundli.planets).map((p) => (
              <tr key={p.name}>
                <td className="p-2 font-semibold">{p.hindiName}</td>
                <td className="p-2">{p.signName}</td>
                <td className="p-2">{p.degreeInSign.toFixed(2)}°</td>
                <td className="p-2">{p.house}</td>
                <td className="p-2">{p.nakshatraName} (P{p.nakshatraPada})</td>
                <td className="p-2 font-semibold">{p.dignity}</td>
                <td className="p-2">{p.isRetrograde ? "Retrograde (वक्र)" : "Direct"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Numerology Section */}
      <div className="print-break space-y-3 pt-6">
        <h2 className="text-lg font-serif font-bold text-celestial-950 border-b border-slate-300 pb-1">
          2. Numerology & Name Resonance
        </h2>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Mulank (Birth No.)</div>
            <div className="text-2xl font-bold font-serif text-gold-700">{numerology.birthNumber}</div>
            <div className="text-[10px] text-slate-600">{numerology.rulingPlanet}</div>
          </div>
          <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Bhagyank (Destiny)</div>
            <div className="text-2xl font-bold font-serif text-gold-700">{numerology.destinyNumber}</div>
            <div className="text-[10px] text-slate-600">Life Mission</div>
          </div>
          <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Life Path No.</div>
            <div className="text-2xl font-bold font-serif text-gold-700">{numerology.lifePathNumber}</div>
            <div className="text-[10px] text-slate-600">Spiritual Lesson</div>
          </div>
          <div className="border border-slate-300 p-3 rounded-lg bg-slate-50">
            <div className="text-[10px] text-slate-500 uppercase font-bold">Name Number</div>
            <div className="text-2xl font-bold font-serif text-gold-700">{numerology.nameNumber}</div>
            <div className="text-[10px] text-slate-600">Chaldean</div>
          </div>
        </div>
      </div>

      {/* Marriage Compatibility Ashtakoot */}
      <div className="space-y-3 pt-4">
        <h2 className="text-lg font-serif font-bold text-celestial-950 border-b border-slate-300 pb-1">
          3. Ashtakoot Guna Milan (Bride: {brideProfile.name} & Groom: {profile.name})
        </h2>
        <div className="border border-slate-300 p-4 rounded-lg bg-slate-50 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-800">Total Compatibility Score:</div>
            <div className="text-xs text-slate-600">
              Verdict: <strong>{matching.verdict}</strong> ({matching.percentage}%) • Manglik Balance: {matching.manglikCompatibility.isCompatible ? "Compatible" : "Cautionary"}
            </div>
          </div>
          <div className="text-3xl font-serif font-bold text-gold-700">
            {matching.totalScore} / 36 Gunas
          </div>
        </div>
      </div>

      {/* Palmistry & Face Reading Summary */}
      <div className="space-y-3 pt-4">
        <h2 className="text-lg font-serif font-bold text-celestial-950 border-b border-slate-300 pb-1">
          4. AI Hastha Rekha & Samudrika Physiognomy Synthesis
        </h2>
        <div className="grid grid-cols-2 gap-4 text-xs text-slate-700">
          <div className="border border-slate-300 p-3 rounded-lg bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900">Palmistry (Hastha Rekha):</div>
            <p>{palm.overview}</p>
          </div>
          <div className="border border-slate-300 p-3 rounded-lg bg-slate-50 space-y-1">
            <div className="font-bold text-slate-900">Face Reading (Mukh Samudrika):</div>
            <p>{face.personalitySynthesis}</p>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="pt-8 border-t border-slate-300 text-[10px] text-slate-500 text-center leading-relaxed">
        AI Pandit Report generated on {new Date().toLocaleDateString("en-IN")}. Disclaimer: Astrology, palmistry, and face reading are traditional cultural interpretative belief systems and should be used for personal reflection, not absolute future certainty.
      </div>
    </div>
  );
}
