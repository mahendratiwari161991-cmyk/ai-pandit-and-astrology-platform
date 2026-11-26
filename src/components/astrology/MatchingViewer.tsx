"use client";

import React from "react";
import { AshtakootScore } from "@/lib/astrology/types";
import { Heart, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from "lucide-react";

interface MatchingViewerProps {
  score: AshtakootScore;
  brideName: string;
  groomName: string;
}

export const MatchingViewer: React.FC<MatchingViewerProps> = ({ score, brideName, groomName }) => {
  const kootList = [
    { name: "Varna", max: 1, current: score.varna.score, desc: score.varna.description, details: `${score.varna.brideVarna} (Bride) & ${score.varna.groomVarna} (Groom)` },
    { name: "Vashya", max: 2, current: score.vashya.score, desc: score.vashya.description, details: `${score.vashya.brideVashya} & ${score.vashya.groomVashya}` },
    { name: "Tara", max: 3, current: score.tara.score, desc: score.tara.description, details: `Bride: ${score.tara.brideTara}, Groom: ${score.tara.groomTara}` },
    { name: "Yoni", max: 4, current: score.yoni.score, desc: score.yoni.description, details: `${score.yoni.brideYoni} & ${score.yoni.groomYoni}` },
    { name: "Graha Maitri", max: 5, current: score.grahaMaitri.score, desc: score.grahaMaitri.description, details: `Lords: ${score.grahaMaitri.brideLord} & ${score.grahaMaitri.groomLord}` },
    { name: "Gana", max: 6, current: score.gana.score, desc: score.gana.description, details: `${score.gana.brideGana} & ${score.gana.groomGana}` },
    { name: "Bhakoot", max: 7, current: score.bhakoot.score, desc: score.bhakoot.description, details: score.bhakoot.cancelled ? `Cancelled: ${score.bhakoot.cancelReason}` : (score.bhakoot.hasDosha ? "Bhakoot Dosha Detected" : "Harmonious Placement") },
    { name: "Nadi", max: 8, current: score.nadi.score, desc: score.nadi.description, details: score.nadi.cancelled ? `Cancelled: ${score.nadi.cancelReason}` : (score.nadi.hasDosha ? "Nadi Dosha Detected" : "Healthy Genetic Alignment") },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Verdict Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-celestial-800 to-celestial-950 border border-gold-500/40 shadow-gold-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-xs uppercase tracking-wider text-gold-400 font-semibold flex items-center justify-center md:justify-start gap-1.5">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> Ashtakoot Guna Milan
          </div>
          <h3 className="text-2xl font-bold text-white mt-1">
            {brideName} & {groomName}
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            Compatibility Verdict: <span className="font-bold text-gold-300">{score.verdict}</span> ({score.percentage}%)
          </p>
        </div>

        {/* Big Score Dial */}
        <div className="flex items-center gap-4 bg-celestial-900/90 px-6 py-4 rounded-xl border border-gold-500/30">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-gold-300 font-serif">
              {score.totalScore}
              <span className="text-lg text-slate-400 font-sans">/36</span>
            </div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Total Gunas</div>
          </div>
        </div>
      </div>

      {/* Manglik Compatibility Card */}
      <div className={`p-4 rounded-xl border flex items-start gap-3 ${
        score.manglikCompatibility.isCompatible
          ? "bg-emerald-950/20 border-emerald-500/40"
          : "bg-amber-950/20 border-amber-500/40"
      }`}>
        {score.manglikCompatibility.isCompatible ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        )}
        <div className="text-xs">
          <div className="font-bold text-white">
            Manglik Compatibility: {score.manglikCompatibility.isCompatible ? "Favorable" : "Cautionary"}
          </div>
          <div className="text-slate-300 mt-1 leading-relaxed">
            {score.manglikCompatibility.explanation}
          </div>
        </div>
      </div>

      {/* 8 Koot Breakdown Table */}
      <div className="overflow-x-auto rounded-xl border border-gold-500/20 bg-celestial-900/80">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-celestial-800 text-gold-300 uppercase tracking-wider font-semibold border-b border-gold-500/20">
            <tr>
              <th className="p-3">Koot (Category)</th>
              <th className="p-3">Score</th>
              <th className="p-3">Key Influences</th>
              <th className="p-3">Significance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-celestial-800">
            {kootList.map((koot) => {
              const isFull = koot.current === koot.max;
              const isZero = koot.current === 0;

              return (
                <tr key={koot.name} className="hover:bg-gold-500/5 transition">
                  <td className="p-3 font-semibold text-white">{koot.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        isFull
                          ? "bg-emerald-900/60 text-emerald-300 border border-emerald-500/20"
                          : isZero
                          ? "bg-rose-900/60 text-rose-300 border border-rose-500/20"
                          : "bg-gold-500/20 text-gold-300"
                      }`}
                    >
                      {koot.current} / {koot.max}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300">{koot.details}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{koot.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detailed Relationship Synthesis */}
      <div className="p-5 rounded-2xl bg-card-gradient border border-gold-500/30 space-y-4">
        <h4 className="text-sm font-bold text-gold-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold-400" /> Astrological Marriage Compatibility Report
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-3 rounded-lg bg-celestial-900/60 border border-celestial-800">
            <span className="font-bold text-gold-200">Emotional Connection: </span>
            {score.detailedAnalysis.emotional}
          </div>
          <div className="p-3 rounded-lg bg-celestial-900/60 border border-celestial-800">
            <span className="font-bold text-gold-200">Daily Communication: </span>
            {score.detailedAnalysis.communication}
          </div>
          <div className="p-3 rounded-lg bg-celestial-900/60 border border-celestial-800">
            <span className="font-bold text-gold-200">Family & Domestic Harmony: </span>
            {score.detailedAnalysis.family}
          </div>
          <div className="p-3 rounded-lg bg-celestial-900/60 border border-celestial-800">
            <span className="font-bold text-gold-200">Financial Growth: </span>
            {score.detailedAnalysis.financial}
          </div>
        </div>

        {/* Traditional Remedies if any */}
        {score.detailedAnalysis.remedies.length > 0 && (
          <div className="pt-2">
            <div className="text-xs font-bold text-gold-400 uppercase tracking-wider mb-1">
              Suggested Traditional Harmony Remedies:
            </div>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-1">
              {score.detailedAnalysis.remedies.map((rem, idx) => (
                <li key={idx}>{rem}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Disclaimer */}
        <div className="p-3 rounded-lg bg-celestial-950/80 border border-celestial-800 text-[11px] text-slate-400 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            Kundli matching is a traditional belief-based guidance system. Marital harmony is built on mutual respect, emotional maturity, open communication, and shared values, and should not be determined solely by astrological scores.
          </span>
        </div>
      </div>
    </div>
  );
};
