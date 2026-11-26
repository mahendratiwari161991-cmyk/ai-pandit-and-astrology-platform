"use client";

import React from "react";
import { astrologyStore } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import { FileText, Download, Printer, Compass, Heart, Hand, Hash } from "lucide-react";

export default function ReportsCenterPage() {
  const { currentUser } = useUserRole();
  const primaryProfile = astrologyStore.getPrimaryBirthProfile(currentUser.id);
  const kundli = astrologyStore.getKundli(primaryProfile);

  const reportsList = [
    {
      title: "Comprehensive Vedic Kundli Report",
      type: "Janma Kundli (D1 & D9)",
      date: "Generated Today",
      icon: Compass,
      pages: "12 Pages",
      size: "2.4 MB",
    },
    {
      title: "Ashtakoot Marriage Compatibility Analysis",
      type: "36 Gunas & Manglik Milan",
      date: "2026-11-24",
      icon: Heart,
      pages: "8 Pages",
      size: "1.8 MB",
    },
    {
      title: "AI Hastha Rekha Palmistry Reading",
      type: "Hand Photo Feature Scan",
      date: "2026-11-20",
      icon: Hand,
      pages: "5 Pages",
      size: "3.1 MB",
    },
    {
      title: "Chaldean & Vedic Numerology Report",
      type: "Mulank & Bhagyank Vibrations",
      date: "2026-11-18",
      icon: Hash,
      pages: "6 Pages",
      size: "1.2 MB",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Download Center
          </div>
          <h1 className="text-2xl font-bold font-serif text-white mt-1">
            My Generated Astrology PDF Reports
          </h1>
          <p className="text-xs text-slate-400">
            Professionally designed, high-resolution astrology reports with Hindi Unicode font support.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition flex items-center gap-1.5 self-start"
        >
          <Printer className="w-4 h-4" /> Print Current Kundli Document
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reportsList.map((rep, idx) => {
          const Icon = rep.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-celestial-900/80 border border-gold-500/20 card-hover-glow flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{rep.title}</h3>
                  <div className="text-xs text-gold-300/80 mt-0.5">{rep.type}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {rep.date} • {rep.pages} • {rep.size}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-celestial-800">
                <span className="text-[11px] text-emerald-400 font-semibold">Ready for Download</span>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-celestial-800 border border-gold-500/30 text-gold-300 font-semibold text-xs hover:bg-gold-500/10 transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
