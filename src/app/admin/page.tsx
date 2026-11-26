"use client";

import React, { useState } from "react";
import { astrologyStore, StoredPandit } from "@/lib/db/mock-store";
import {
  ShieldCheck,
  Users,
  Award,
  DollarSign,
  Activity,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  Server,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [pandits, setPandits] = useState<StoredPandit[]>(astrologyStore.pandits);

  const handleApproval = (id: string, isApproved: boolean) => {
    const updated = pandits.map((p) => (p.id === id ? { ...p, isApproved } : p));
    setPandits(updated);
    astrologyStore.pandits = updated;
  };

  const analytics = {
    totalCustomers: 14820,
    kundlisGenerated: 38450,
    matchingDone: 19200,
    palmReadings: 8430,
    activeSubscribers: 2840,
    monthlyRevenueINR: 1417160,
    aiTokensConsumed: "4.8M Tokens",
    serverUptime: "99.98%",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Platform Administration
        </div>
        <h1 className="text-2xl font-bold font-serif text-white mt-1">
          AI Pandit Master Admin Control
        </h1>
        <p className="text-xs text-slate-400">
          Supervise user registrations, pandit certifications, payments, AI API token usage, and database health.
        </p>
      </div>

      {/* Analytics KPI Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Total Customers</span>
            <Users className="w-4 h-4 text-gold-400" />
          </div>
          <div className="text-xl font-bold text-white font-serif">
            {analytics.totalCustomers.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400">+14% this month</div>
        </div>

        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Kundlis Generated</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-xl font-bold text-white font-serif">
            {analytics.kundlisGenerated.toLocaleString()}
          </div>
          <div className="text-[10px] text-gold-300">100% Lahiri Ephemeris</div>
        </div>

        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Monthly Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white font-serif">
            ₹{(analytics.monthlyRevenueINR / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-[10px] text-emerald-400">Razorpay Verified</div>
        </div>

        <div className="p-4 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-1">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>AI Token Consumption</span>
            <Server className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-white font-serif">
            {analytics.aiTokensConsumed}
          </div>
          <div className="text-[10px] text-slate-400">GPT-4o Vision & Text</div>
        </div>
      </div>

      {/* Pandit Approval & Management Section */}
      <div className="p-6 rounded-3xl bg-celestial-900/90 border border-gold-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              Pandit Accreditation
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              Astrologer Registration & Verification Queue
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gold-500/20">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-celestial-800 text-gold-300 uppercase font-semibold">
              <tr>
                <th className="p-3">Pandit Name</th>
                <th className="p-3">Specialization</th>
                <th className="p-3">Experience</th>
                <th className="p-3">Qualifications</th>
                <th className="p-3">Hourly Rate</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-celestial-800">
              {pandits.map((p) => (
                <tr key={p.id} className="hover:bg-gold-500/5 transition">
                  <td className="p-3 font-bold text-white">{p.name}</td>
                  <td className="p-3 text-gold-200">{p.specializations.join(", ")}</td>
                  <td className="p-3">{p.experienceYears} Years</td>
                  <td className="p-3 text-slate-400">{p.qualifications.join("; ")}</td>
                  <td className="p-3 font-semibold text-white">₹{p.hourlyRate}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.isApproved
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
                          : "bg-amber-950 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {p.isApproved ? "Approved & Live" : "Pending Verification"}
                    </span>
                  </td>
                  <td className="p-3">
                    {p.isApproved ? (
                      <button
                        onClick={() => handleApproval(p.id, false)}
                        className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-500/30 hover:bg-rose-900 transition flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApproval(p.id, true)}
                        className="px-2.5 py-1 rounded bg-emerald-900 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-800 transition flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Settings & Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-celestial-900/80 border border-celestial-800 space-y-3">
          <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">
            Astrological Engine Configuration
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">Default Ayanamsha:</span>
              <span className="font-semibold text-white">Lahiri (Chitra Paksha)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">House System:</span>
              <span className="font-semibold text-white">Whole Sign / Equal House</span>
            </div>
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">Dasha System:</span>
              <span className="font-semibold text-white">Vimshottari (120 Years)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">Ephemeris Algorithm:</span>
              <span className="font-semibold text-white">Meeus High-Accuracy Keplerian</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-celestial-900/80 border border-celestial-800 space-y-3">
          <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">
            Biometric Data Privacy Status
          </div>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">Storage Encryption:</span>
              <span className="font-semibold text-emerald-400">AES-256 Enabled</span>
            </div>
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">Photo Retention Rule:</span>
              <span className="font-semibold text-white">Ephemeral / User-Controlled</span>
            </div>
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">AI Model Training:</span>
              <span className="font-semibold text-emerald-400">Explicitly Disabled</span>
            </div>
            <div className="flex justify-between py-1 border-b border-celestial-800">
              <span className="text-slate-400">Payment Gateway:</span>
              <span className="font-semibold text-gold-300">Razorpay Test Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
