"use client";

import React, { useState } from "react";
import { astrologyStore, StoredBirthProfile } from "@/lib/db/mock-store";
import { useUserRole } from "@/context/UserRoleContext";
import { POPULAR_CITIES } from "@/lib/data/cities";
import { Users, Plus, Check, Trash2, Calendar, MapPin } from "lucide-react";

export default function FamilyProfilesPage() {
  const { currentUser } = useUserRole();
  const [profiles, setProfiles] = useState<StoredBirthProfile[]>(
    astrologyStore.birthProfiles.filter((bp) => bp.userId === currentUser.id)
  );

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("Spouse");
  const [gender, setGender] = useState<"male" | "female" | "other">("female");
  const [dob, setDob] = useState("1996-01-01");
  const [tob, setTob] = useState("12:00");
  const [selectedCity, setSelectedCity] = useState(POPULAR_CITIES[0]);

  const handleAddProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const newProfile: StoredBirthProfile = {
      id: "bp_" + Date.now(),
      userId: currentUser.id,
      name,
      relationship,
      gender,
      dob,
      tob,
      pob: `${selectedCity.name}, ${selectedCity.state}, ${selectedCity.country}`,
      latitude: selectedCity.lat,
      longitude: selectedCity.lng,
      timezone: selectedCity.timezone,
      isPrimary: false,
      createdAt: new Date().toISOString(),
    };

    astrologyStore.birthProfiles.push(newProfile);
    setProfiles([...astrologyStore.birthProfiles.filter((bp) => bp.userId === currentUser.id)]);
    setIsAdding(false);
    setName("");
  };

  const handleDelete = (id: string) => {
    astrologyStore.birthProfiles = astrologyStore.birthProfiles.filter((bp) => bp.id !== id);
    setProfiles([...astrologyStore.birthProfiles.filter((bp) => bp.userId === currentUser.id)]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-4 h-4" /> Family Kundli Manager
          </div>
          <h1 className="text-2xl font-bold font-serif text-white mt-1">
            Family Members' Birth Profiles
          </h1>
          <p className="text-xs text-slate-400">
            Store and manage birth details for your spouse, children, parents, and friends for instant astrology reports.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-4 py-2 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" /> Add Family Member
        </button>
      </div>

      {/* Add New Profile Drawer */}
      {isAdding && (
        <form onSubmit={handleAddProfile} className="p-6 rounded-2xl bg-celestial-900/90 border border-gold-500/30 space-y-4 animate-fade-in">
          <div className="text-sm font-bold text-gold-300">Add New Birth Profile</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Relationship</label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
              >
                <option value="Spouse">Spouse</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Prospective Partner">Prospective Partner</option>
                <option value="Friend">Friend</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Time of Birth</label>
              <input
                type="time"
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                required
                className="w-full px-2.5 py-1.5 rounded-lg bg-celestial-950 border border-gold-500/30 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-300 mb-1">Place of Birth</label>
              <select
                value={selectedCity.name}
                onChange={(e) => {
                  const c = POPULAR_CITIES.find((item) => item.name === e.target.value);
                  if (c) setSelectedCity(c);
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
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3.5 py-1.5 rounded-lg bg-celestial-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-gold-gradient text-celestial-950 font-bold text-xs shadow"
            >
              Save Profile
            </button>
          </div>
        </form>
      )}

      {/* Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profiles.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-celestial-900/80 border border-gold-500/20 card-hover-glow space-y-3 relative"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{p.name}</h3>
                <span className="text-[10px] text-gold-300 uppercase tracking-wider font-semibold">
                  {p.relationship}
                </span>
              </div>
              {p.isPrimary ? (
                <span className="px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 text-[10px] font-bold">
                  Primary
                </span>
              ) : (
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-slate-500 hover:text-rose-400 p-1"
                  title="Delete profile"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{p.dob} at {p.tob}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{p.pob}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
