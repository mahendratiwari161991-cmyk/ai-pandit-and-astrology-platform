"use client";

import React, { useState } from "react";
import { KundliData } from "@/lib/astrology/types";
import { NorthIndianChart } from "./NorthIndianChart";
import { SouthIndianChart } from "./SouthIndianChart";
import { Sparkles, Compass, ShieldCheck, Flame, BookOpen, AlertTriangle } from "lucide-react";

interface KundliViewerProps {
  kundli: KundliData;
}

export const KundliViewer: React.FC<KundliViewerProps> = ({ kundli }) => {
  const [chartStyle, setChartStyle] = useState<"north" | "south">("north");
  const [activeTab, setActiveTab] = useState<"d1" | "d9" | "planets" | "dashas" | "yogas">("d1");

  return (
    <div className="space-y-6">
      {/* Top Banner / Key Planetary Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-celestial-800/80 border border-gold-500/20">
          <div className="text-xs text-slate-400">Ascendant (Lagna)</div>
          <div className="text-base font-bold text-gold-300 mt-0.5">
            {kundli.ascendant.signName}
          </div>
          <div className="text-[11px] text-slate-400">
            {kundli.ascendant.degree.toFixed(2)}° • {kundli.ascendant.nakshatra} (P{kundli.ascendant.pada})
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-celestial-800/80 border border-gold-500/20">
          <div className="text-xs text-slate-400">Moon Sign (Rashi)</div>
          <div className="text-base font-bold text-gold-300 mt-0.5">
            {kundli.moonSign.signName}
          </div>
          <div className="text-[11px] text-slate-400">
            {kundli.moonSign.nakshatra} • Lord: {kundli.moonSign.signLord}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-celestial-800/80 border border-gold-500/20">
          <div className="text-xs text-slate-400">Sun Sign (Surya)</div>
          <div className="text-base font-bold text-gold-300 mt-0.5">
            {kundli.sunSign.signName}
          </div>
          <div className="text-[11px] text-slate-400">
            {kundli.planets.Sun.degreeInSign.toFixed(2)}° • {kundli.planets.Sun.nakshatraName}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-celestial-800/80 border border-gold-500/20">
          <div className="text-xs text-slate-400">Current Mahadasha</div>
          <div className="text-base font-bold text-gold-300 mt-0.5">
            {kundli.dashas.currentMahadasha.planet}
          </div>
          <div className="text-[11px] text-slate-400">
            Until {kundli.dashas.currentMahadasha.endDate.split("-")[0]}
          </div>
        </div>
      </div>

      {/* View Switchers */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-celestial-700 pb-3">
        {/* Sub-Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-celestial-900/90 rounded-lg border border-gold-500/20">
          <button
            onClick={() => setActiveTab("d1")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "d1" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Lagna (D1)
          </button>
          <button
            onClick={() => setActiveTab("d9")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "d9" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Navamsha (D9)
          </button>
          <button
            onClick={() => setActiveTab("planets")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "planets" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Planetary Table
          </button>
          <button
            onClick={() => setActiveTab("dashas")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "dashas" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Vimshottari Dasha
          </button>
          <button
            onClick={() => setActiveTab("yogas")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activeTab === "yogas" ? "bg-gold-500 text-celestial-950 shadow" : "text-slate-300 hover:text-white"
            }`}
          >
            Yogas & Doshas
          </button>
        </div>

        {/* Chart Style Toggle */}
        {(activeTab === "d1" || activeTab === "d9") && (
          <div className="flex items-center gap-1 bg-celestial-900/80 p-1 rounded-lg border border-gold-500/20 text-xs">
            <button
              onClick={() => setChartStyle("north")}
              className={`px-2.5 py-1 rounded transition ${
                chartStyle === "north" ? "bg-gold-500/20 text-gold-300 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              North Indian
            </button>
            <button
              onClick={() => setChartStyle("south")}
              className={`px-2.5 py-1 rounded transition ${
                chartStyle === "south" ? "bg-gold-500/20 text-gold-300 font-bold" : "text-slate-400 hover:text-white"
              }`}
            >
              South Indian
            </button>
          </div>
        )}
      </div>

      {/* Main Tab Content */}
      <div className="pt-2">
        {activeTab === "d1" && (
          <div className="flex flex-col items-center">
            {chartStyle === "north" ? (
              <NorthIndianChart houses={kundli.houses} planets={kundli.planets} chartTitle="Lagna Kundli (D1)" />
            ) : (
              <SouthIndianChart houses={kundli.houses} planets={kundli.planets} chartTitle="Lagna Kundli (D1)" />
            )}
          </div>
        )}

        {activeTab === "d9" && (
          <div className="flex flex-col items-center">
            {chartStyle === "north" ? (
              <NorthIndianChart houses={kundli.navamshaHouses} planets={kundli.planets} chartTitle="Navamsha Kundli (D9)" />
            ) : (
              <SouthIndianChart houses={kundli.navamshaHouses} planets={kundli.planets} chartTitle="Navamsha Kundli (D9)" />
            )}
          </div>
        )}

        {activeTab === "planets" && (
          <div className="overflow-x-auto rounded-xl border border-gold-500/20 bg-celestial-900/80">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-celestial-800 text-gold-300 uppercase tracking-wider font-semibold border-b border-gold-500/20">
                <tr>
                  <th className="p-3">Planet</th>
                  <th className="p-3">Sign</th>
                  <th className="p-3">Degree</th>
                  <th className="p-3">House</th>
                  <th className="p-3">Nakshatra</th>
                  <th className="p-3">Pada</th>
                  <th className="p-3">Dignity</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-celestial-800">
                {Object.values(kundli.planets).map((planet) => (
                  <tr key={planet.name} className="hover:bg-gold-500/5 transition">
                    <td className="p-3 font-semibold text-white flex items-center gap-2">
                      <span>{planet.hindiName}</span>
                    </td>
                    <td className="p-3 text-gold-200">{planet.signHindiName}</td>
                    <td className="p-3 font-mono">{planet.degreeInSign.toFixed(2)}°</td>
                    <td className="p-3 font-semibold">{planet.house}</td>
                    <td className="p-3">{planet.nakshatraName}</td>
                    <td className="p-3">{planet.nakshatraPada}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          planet.dignity === "Exalted"
                            ? "bg-emerald-900/80 text-emerald-300 border border-emerald-500/30"
                            : planet.dignity === "Debilitated"
                            ? "bg-rose-900/80 text-rose-300 border border-rose-500/30"
                            : planet.dignity === "Own"
                            ? "bg-amber-900/80 text-amber-300 border border-amber-500/30"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {planet.dignity}
                      </span>
                    </td>
                    <td className="p-3">
                      {planet.isRetrograde && (
                        <span className="mr-1.5 px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px]">
                          Retrograde
                        </span>
                      )}
                      {planet.isCombust && (
                        <span className="px-1.5 py-0.5 rounded bg-red-900/60 text-red-300 text-[10px]">
                          Combust
                        </span>
                      )}
                      {!planet.isRetrograde && !planet.isCombust && (
                        <span className="text-slate-500 text-[10px]">Direct</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "dashas" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-celestial-800/60 border border-gold-500/30">
              <div className="text-xs text-gold-400 uppercase font-semibold">Active Timeline</div>
              <div className="text-base font-bold text-white mt-1">
                Current Mahadasha: {kundli.dashas.currentMahadasha.hindiName} ({kundli.dashas.currentMahadasha.startDate} to {kundli.dashas.currentMahadasha.endDate})
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Sub-period (Antardasha): {kundli.dashas.currentAntardasha.hindiName}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {kundli.dashas.allMahadashas.map((dash, idx) => {
                const isCurrent = dash.planet === kundli.dashas.currentMahadasha.planet;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition ${
                      isCurrent
                        ? "bg-gold-500/15 border-gold-400 shadow-gold-glow"
                        : "bg-celestial-900/70 border-celestial-700/60 hover:border-gold-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{dash.hindiName}</span>
                      <span className="text-xs text-gold-300 font-mono">{dash.durationYears.toFixed(1)} yrs</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      {dash.startDate} — {dash.endDate}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "yogas" && (
          <div className="space-y-6">
            {/* Major Yogas */}
            <div>
              <h4 className="text-sm font-bold text-gold-300 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-400" /> Auspicious Yogas in Birth Chart
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {kundli.yogas.map((yoga, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      yoga.isActive
                        ? "bg-emerald-950/20 border-emerald-500/40"
                        : "bg-celestial-900/50 border-celestial-800 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{yoga.name}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-semibold ${
                          yoga.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {yoga.isActive ? "Active (सक्रिय)" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{yoga.description}</p>
                    <p className="text-xs text-gold-300/80 mt-1 italic">{yoga.hindiDescription}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Major Doshas & Remedies */}
            <div>
              <h4 className="text-sm font-bold text-gold-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Dosha Analysis & Mitigations
              </h4>
              <div className="space-y-3">
                {/* Manglik */}
                <div className="p-4 rounded-xl bg-celestial-900/80 border border-gold-500/20">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-400" /> {kundli.doshas.manglik.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        kundli.doshas.manglik.hasDosha
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {kundli.doshas.manglik.hasDosha ? "Dosha Present" : "No Dosha"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{kundli.doshas.manglik.description}</p>
                  {kundli.doshas.manglik.cancellationReasons.length > 0 && (
                    <div className="mt-2 text-xs text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                      <strong>Cancellation Exception: </strong>
                      {kundli.doshas.manglik.cancellationReasons.join(", ")}
                    </div>
                  )}
                  {kundli.doshas.manglik.remedies.length > 0 && (
                    <div className="mt-2 text-xs text-slate-400">
                      <span className="text-gold-400 font-semibold">Remedies: </span>
                      {kundli.doshas.manglik.remedies.join(" • ")}
                    </div>
                  )}
                </div>

                {/* Kaal Sarp */}
                <div className="p-4 rounded-xl bg-celestial-900/80 border border-gold-500/20">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400" /> {kundli.doshas.kaalSarp.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        kundli.doshas.kaalSarp.hasDosha
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {kundli.doshas.kaalSarp.hasDosha ? "Present" : "Dosha Free"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{kundli.doshas.kaalSarp.description}</p>
                </div>

                {/* Sadhe Sati */}
                <div className="p-4 rounded-xl bg-celestial-900/80 border border-gold-500/20">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-2">
                      <Compass className="w-4 h-4 text-purple-400" /> Shani Sadhe Sati Status
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        kundli.doshas.sadheSati.isActive
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : "bg-emerald-500/20 text-emerald-300"
                      }`}
                    >
                      {kundli.doshas.sadheSati.isActive ? kundli.doshas.sadheSati.phase : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-2">{kundli.doshas.sadheSati.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Synthesis / Interpretation summary */}
      <div className="p-5 rounded-2xl bg-card-gradient border border-gold-500/30 shadow-lg">
        <h4 className="text-sm font-bold text-gold-300 mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-gold-400" /> Vedic Life Reading Synthesis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div>
            <span className="font-bold text-gold-200">Personality & Core Mind: </span>
            {kundli.chartInterpretations.personality}
          </div>
          <div>
            <span className="font-bold text-gold-200">Career & Life Purpose: </span>
            {kundli.chartInterpretations.career}
          </div>
          <div>
            <span className="font-bold text-gold-200">Wealth & Prosperity: </span>
            {kundli.chartInterpretations.finance}
          </div>
          <div>
            <span className="font-bold text-gold-200">Relationships & Harmony: </span>
            {kundli.chartInterpretations.relationships}
          </div>
        </div>
      </div>
    </div>
  );
};
