"use client";

import React, { useState } from "react";
import { astrologyStore, StoredBirthProfile } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import { POPULAR_CITIES } from "@/lib/data/cities";
import { KundliData } from "@/lib/astrology/types";
import { KundliViewer } from "@/components/astrology/KundliViewer";
import { Compass, Printer, RefreshCw, UserCheck } from "lucide-react";

export default function KundliStudioPage() {
  const { currentUser } = useUserRole();
  const userProfiles = astrologyStore.birthProfiles.filter((bp) => bp.userId === currentUser.id);
  const [selectedProfileId, setSelectedProfileId] = useState(userProfiles[0]?.id || "bp_1");

  const activeProfile = userProfiles.find((p) => p.id === selectedProfileId) || userProfiles[0];
  const [kundliData, setKundliData] = useState<KundliData>(astrologyStore.getKundli(activeProfile));

  // Custom calculation form state
  const [name, setName] = useState(activeProfile?.name || "Rahul Sharma");
  const [dob, setDob] = useState(activeProfile?.dob || "1994-08-15");
  const [tob, setTob] = useState(activeProfile?.tob || "07:30");
  const [city, setCity] = useState(POPULAR_CITIES[0]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleProfileSwitch = (pId: string) => {
    setSelectedProfileId(pId);
    const p = userProfiles.find((item) => item.id === pId);
    if (p) {
      setName(p.name);
      setDob(p.dob);
      setTob(p.tob);
      setKundliData(astrologyStore.getKundli(p));
    }
  };

  const handleRecalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    try {
      const res = await fetch("/api/kundli/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender: "male",
          dob,
          tob,
          pob: `${city.name}, ${city.state}, ${city.country}`,
          latitude: city.lat,
          longitude: city.lng,
          timezone: city.timezone,
        }),
      });
      const resJson = await res.json();
      if (resJson.success) {
        setKundliData(resJson.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4" /> Vedic Astrology Studio
          </div>
          <h1 className="text-2xl font-bold font-serif text-white mt-1">
            Janma Kundli (Birth Chart)
          </h1>
          <p className="text-xs text-slate-400">
            High precision Lahiri Ayanamsha sidereal calculation with Navamsha (D9) and Vimshottari dasha.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Profile Selector */}
          <div className="flex items-center gap-1 bg-celestial-900 border border-gold-500/30 rounded-xl px-2.5 py-1.5 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-gold-400" />
            <select
              value={selectedProfileId}
              onChange={(e) => handleProfileSwitch(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {userProfiles.map((p) => (
                <option key={p.id} value={p.id} className="bg-celestial-900 text-white">
                  {p.name} ({p.relationship})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-1.5 rounded-xl bg-celestial-800 border border-gold-500/30 text-gold-300 font-semibold text-xs hover:bg-gold-500/10 transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Edit Coordinates / Custom Recalculation Drawer */}
      <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20">
        <form onSubmit={handleRecalculate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Time of Birth</label>
            <input
              type="time"
              value={tob}
              onChange={(e) => setTob(e.target.value)}
              required
              className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">City / Coordinates</label>
            <select
              value={city.name}
              onChange={(e) => {
                const c = POPULAR_CITIES.find((item) => item.name === e.target.value);
                if (c) setCity(c);
              }}
              className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
            >
              {POPULAR_CITIES.map((c) => (
                <option key={c.name} value={c.name} className="bg-celestial-900 text-white">
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-1.5 rounded-lg bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCalculating ? "animate-spin" : ""}`} />
              Recalculate
            </button>
          </div>
        </form>
      </div>

      {/* Main Kundli Viewer Component */}
      <KundliViewer kundli={kundliData} />
    </div>
  );
}
