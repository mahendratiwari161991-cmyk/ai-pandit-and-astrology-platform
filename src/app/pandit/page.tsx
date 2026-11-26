"use client";

import React, { useState } from "react";
import { astrologyStore, StoredAppointment, StoredPandit } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import { NorthIndianChart } from "@/components/astrology/NorthIndianChart";
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileEdit,
  ShieldCheck,
  Star,
  User,
  Users,
} from "lucide-react";

export default function PanditDashboardPage() {
  const pandit = astrologyStore.pandits[0];
  const [appointments, setAppointments] = useState<StoredAppointment[]>(astrologyStore.appointments);
  const [selectedApt, setSelectedApt] = useState<StoredAppointment>(appointments[0]);
  const [panditNote, setPanditNote] = useState(
    "Client has 7th house governed by Venus with Jupiter aspect. Recommend performing Shukra puja on Friday and maintaining daily meditation."
  );
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // Client kundli for selected appointment
  const clientProfile = astrologyStore.birthProfiles[0];
  const clientKundli = astrologyStore.getKundli(clientProfile);

  const handleStatusChange = (aptId: string, newStatus: StoredAppointment["status"]) => {
    const updated = appointments.map((a) => (a.id === aptId ? { ...a, status: newStatus } : a));
    setAppointments(updated);
    astrologyStore.appointments = updated;
  };

  const handleSaveNotes = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Pandit Profile Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-celestial-850 via-celestial-900 to-celestial-950 border border-gold-500/40 shadow-gold-glow flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold-500/20 text-gold-400 border border-gold-500/40 flex items-center justify-center text-xl font-bold font-serif shrink-0">
            {pandit.name.split(" ")[1]?.slice(0, 2) || "VS"}
          </div>
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Certified Pandit
              </span>
              <span className="text-xs text-gold-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" /> {pandit.rating} ({pandit.totalConsultations} Consultations)
              </span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-white">{pandit.name}</h1>
            <p className="text-xs text-slate-300">{pandit.title} • {pandit.experienceYears} Years Experience</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400">Consultation Rate</div>
            <div className="text-lg font-bold text-gold-300 font-serif">₹{pandit.hourlyRate} / hr</div>
          </div>
        </div>
      </div>

      {/* Main Pandit Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Incoming Appointments */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> Consultation Requests
          </div>

          <div className="space-y-3">
            {appointments.map((apt) => {
              const isSelected = apt.id === selectedApt.id;
              return (
                <div
                  key={apt.id}
                  onClick={() => setSelectedApt(apt)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? "bg-gold-500/15 border-gold-400 shadow-gold-glow"
                      : "bg-celestial-900/80 border-celestial-700/60 hover:border-gold-500/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{apt.customerName}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold capitalize ${
                        apt.status === "confirmed"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                          : apt.status === "completed"
                          ? "bg-blue-950 text-blue-300"
                          : "bg-amber-950 text-amber-300"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  <div className="text-xs text-gold-300 mt-1 font-semibold">{apt.consultationType}</div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {apt.date} at {apt.time}
                  </div>

                  {/* Consent Badge */}
                  <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {apt.consentGranted ? "Client Consent Granted" : "Consent Pending"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center & Right Column: Client Chart Review & Interpretation Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Client Details */}
          <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-celestial-700 pb-3">
              <div>
                <span className="text-xs text-gold-400 font-bold uppercase">Client Chart In Review</span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {selectedApt.customerName} ({clientProfile.dob} • {clientProfile.pob})
                </h3>
              </div>

              {/* Action Buttons for Appointment */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(selectedApt.id, "confirmed")}
                  className="px-3 py-1 rounded-lg bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900 transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(selectedApt.id, "completed")}
                  className="px-3 py-1 rounded-lg bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-semibold hover:bg-blue-900 transition"
                >
                  Mark Completed
                </button>
              </div>
            </div>

            {/* Quick Chart Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="flex justify-center">
                <NorthIndianChart
                  houses={clientKundli.houses}
                  planets={clientKundli.planets}
                  chartTitle="Client Lagna (D1)"
                  size={320}
                />
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-celestial-900/80 border border-celestial-800">
                  <strong className="text-gold-300">Lagna Sign: </strong>
                  {clientKundli.ascendant.signName} ({clientKundli.ascendant.nakshatra} Nakshatra)
                </div>
                <div className="p-3 rounded-xl bg-celestial-900/80 border border-celestial-800">
                  <strong className="text-gold-300">Moon Sign (Rashi): </strong>
                  {clientKundli.moonSign.signName} (Lord: {clientKundli.moonSign.signLord})
                </div>
                <div className="p-3 rounded-xl bg-celestial-900/80 border border-celestial-800">
                  <strong className="text-gold-300">Active Dasha: </strong>
                  {clientKundli.dashas.currentMahadasha.planet} Mahadasha
                </div>
                <div className="p-3 rounded-xl bg-celestial-900/80 border border-celestial-800">
                  <strong className="text-gold-300">Manglik Status: </strong>
                  {clientKundli.doshas.manglik.hasDosha ? "Manglik Dosha Present" : "No Manglik Dosha"}
                </div>
              </div>
            </div>

            {/* Custom Pandit Consultation Notes Form */}
            <form onSubmit={handleSaveNotes} className="pt-4 border-t border-celestial-700 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                  <FileEdit className="w-4 h-4" /> Add Personalized Astrological Notes & Remedies
                </label>
                {isNoteSaved && (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Notes Saved to Client Report
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                value={panditNote}
                onChange={(e) => setPanditNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-celestial-950 border border-gold-500/30 text-white text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition"
                >
                  Deliver Interpretation to Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
