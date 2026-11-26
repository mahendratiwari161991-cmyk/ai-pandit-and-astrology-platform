"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { POPULAR_CITIES } from "@/lib/data/cities";
import { KundliData } from "@/lib/astrology/types";
import { KundliViewer } from "@/components/astrology/KundliViewer";
import {
  Sparkles,
  Compass,
  Heart,
  Hand,
  Smile,
  Hash,
  MessageSquare,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { t } = useLanguage();

  // Quick Kundli Form State on Landing Page
  const [name, setName] = useState("Rahul Sharma");
  const [dob, setDob] = useState("1994-08-15");
  const [tob, setTob] = useState("07:30");
  const [selectedCity, setSelectedCity] = useState(POPULAR_CITIES[0]);
  const [quickKundli, setQuickKundli] = useState<KundliData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuickCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/kundli/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          gender: "male",
          dob,
          tob,
          pob: `${selectedCity.name}, ${selectedCity.state}, ${selectedCity.country}`,
          latitude: selectedCity.lat,
          longitude: selectedCity.lng,
          timezone: selectedCity.timezone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setQuickKundli(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Celestial Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-celestial-700/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-celestial-900/90 border border-gold-500/30 text-gold-300 text-xs font-semibold shadow-gold-glow animate-fade-in">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Vedic Astronomy + Multimodal AI Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-serif text-white leading-tight">
            Discover Your Cosmic Blueprint with{" "}
            <span className="text-gold-gradient">AI Pandit</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#quick-kundli"
              className="px-6 py-3 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-sm shadow-gold-glow hover:opacity-95 transition flex items-center gap-2"
            >
              <Compass className="w-4 h-4" /> {t.hero.ctaKundli}
            </a>
            <Link
              href="/dashboard/matching"
              className="px-6 py-3 rounded-xl bg-celestial-900 border border-gold-500/40 text-gold-300 font-bold text-sm hover:bg-gold-500/10 transition flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-pink-400" /> {t.hero.ctaMatch}
            </Link>
            <Link
              href="/dashboard/palmistry"
              className="px-6 py-3 rounded-xl bg-celestial-900 border border-celestial-700 text-slate-200 font-bold text-sm hover:border-gold-500/40 transition flex items-center gap-2"
            >
              <Hand className="w-4 h-4 text-amber-400" /> {t.hero.ctaPalm}
            </Link>
          </div>
        </div>
      </section>

      {/* 2. LIVE QUICK KUNDLI GENERATOR SECTION */}
      <section id="quick-kundli" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="p-8 rounded-3xl bg-card-gradient border border-gold-500/30 shadow-2xl space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <div className="text-xs font-bold text-gold-400 uppercase tracking-wider">
              Instant Planetary Ephemeris
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
              Generate Your Vedic Birth Chart
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic Lahiri sidereal planetary longitudes, 12 houses, Lagna & Navamsha charts.
            </p>
          </div>

          <form onSubmit={handleQuickCalculate} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t.kundli.fullName}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-celestial-900 border border-gold-500/30 text-white text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t.kundli.dob}</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-celestial-900 border border-gold-500/30 text-white text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t.kundli.tob}</label>
              <input
                type="time"
                value={tob}
                onChange={(e) => setTob(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl bg-celestial-900 border border-gold-500/30 text-white text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">{t.kundli.pob}</label>
              <select
                value={selectedCity.name}
                onChange={(e) => {
                  const c = POPULAR_CITIES.find((item) => item.name === e.target.value);
                  if (c) setSelectedCity(c);
                }}
                className="w-full px-3 py-2 rounded-xl bg-celestial-900 border border-gold-500/30 text-white text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none"
              >
                {POPULAR_CITIES.map((c) => (
                  <option key={c.name} value={c.name} className="bg-celestial-900 text-white">
                    {c.name}, {c.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-sm shadow-gold-glow hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>Calculating Ephemeris...</>
                ) : (
                  <>
                    <Compass className="w-4 h-4" /> {t.kundli.generateBtn}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Kundli Result Container */}
          {quickKundli && (
            <div className="pt-6 border-t border-celestial-700 animate-fade-in">
              <KundliViewer kundli={quickKundli} />
            </div>
          )}
        </div>
      </section>

      {/* 3. PLATFORM CORE PILLARS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-gold-400 uppercase tracking-wider">
            All-In-One Astrology Suite
          </div>
          <h2 className="text-3xl font-bold font-serif text-white mt-1">
            Bridging Ancient Shastras with Modern Computer Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Vedic Kundli */}
          <div className="p-6 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Vedic Birth Chart (Janma Kundli)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete calculation of 12 houses, 9 Grahas, Ascendant, Nakshatras, Navamsha D9 chart, and 120-year Vimshottari dasha cycles using Lahiri Ayanamsha.
            </p>
            <Link href="/dashboard/kundli" className="text-xs font-bold text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 pt-2">
              Open Kundli Studio <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: AI Palmistry */}
          <div className="p-6 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Hand className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Palmistry (Hastha Rekha)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upload Left and Right hand photographs. Computer vision identifies Life, Heart, Head, Fate, Sun lines and planetary mounts with visual coordinate markers.
            </p>
            <Link href="/dashboard/palmistry" className="text-xs font-bold text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 pt-2">
              Analyze Palm Photo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: AI Face Reading */}
          <div className="p-6 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">AI Face Reading (Mukh Samudrika)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Classical physiognomy feature detection: forehead contour, eyebrow shape, nasal bridge, lip symmetry, and chin jawline decoded for traditional personality archetypes.
            </p>
            <Link href="/dashboard/face-reading" className="text-xs font-bold text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 pt-2">
              Scan Facial Archetypes <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 4: Marriage Matching */}
          <div className="p-6 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Ashtakoot 36 Guna Milan</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deterministic mathematical scoring of Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi with verified cancellation rules and Manglik compatibility.
            </p>
            <Link href="/dashboard/matching" className="text-xs font-bold text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 pt-2">
              Match 2 Kundlis <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 5: Numerology */}
          <div className="p-6 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <Hash className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Vedic & Chaldean Numerology</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculate Mulank (Birth Number), Bhagyank (Destiny), Life Path, Chaldean Name Number, Soul Urge, Personal Year cycles, lucky days and lucky colors.
            </p>
            <Link href="/dashboard/numerology" className="text-xs font-bold text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 pt-2">
              Calculate Numbers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 6: Ask AI Pandit */}
          <div className="p-6 rounded-2xl bg-celestial-900/60 border border-gold-500/20 card-hover-glow space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">24/7 Ask AI Pandit Chatbot</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multilingual Vedic astrology chatbot in Hindi, English, and Hinglish. Uses your calculated chart context without hallucinating planetary positions.
            </p>
            <Link href="/dashboard/chat" className="text-xs font-bold text-gold-300 hover:text-gold-200 inline-flex items-center gap-1 pt-2">
              Start Conversation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. VERIFIED PANDIT CONSULTATIONS SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-celestial-900/90 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold">
              <Award className="w-4 h-4" /> Certified Jyotish Scholars
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Need Personal Human Astrologer Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Connect 1-on-1 with verified senior Pandits for deep kundli analysis, personalized wedding muhurat, gemstone recommendations, and remedial pujas with strict consent control.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/dashboard/consultations"
                className="px-5 py-2.5 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition"
              >
                Browse Verified Pandits
              </Link>
              <Link
                href="/pandit"
                className="px-5 py-2.5 rounded-xl bg-celestial-800 border border-gold-500/30 text-gold-300 font-bold text-xs hover:bg-gold-500/10 transition"
              >
                Join as Pandit / Astrologer
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            <div className="p-4 rounded-xl bg-celestial-800/80 border border-gold-500/20 text-center">
              <div className="text-2xl font-bold text-gold-300">25+</div>
              <div className="text-[11px] text-slate-400">Years Experience</div>
            </div>
            <div className="p-4 rounded-xl bg-celestial-800/80 border border-gold-500/20 text-center">
              <div className="text-2xl font-bold text-gold-300">36/36</div>
              <div className="text-[11px] text-slate-400">Guna Match Rigor</div>
            </div>
            <div className="p-4 rounded-xl bg-celestial-800/80 border border-gold-500/20 text-center">
              <div className="text-2xl font-bold text-gold-300">100%</div>
              <div className="text-[11px] text-slate-400">Lahiri Sidereal</div>
            </div>
            <div className="p-4 rounded-xl bg-celestial-800/80 border border-gold-500/20 text-center">
              <div className="text-2xl font-bold text-gold-300">256-bit</div>
              <div className="text-[11px] text-slate-400">Photo Privacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING & SUBSCRIPTIONS TEASER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold text-gold-400 uppercase tracking-wider">Transparent Plans</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-1">
            Free & Premium Astrology Tiers
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Flexible packages with secure Razorpay payment integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="p-6 rounded-2xl bg-celestial-900/60 border border-celestial-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-white">Free Vedic Starter</div>
              <span className="text-xs font-bold text-slate-400 bg-celestial-800 px-2.5 py-1 rounded-full">
                Always Free
              </span>
            </div>
            <div className="text-2xl font-bold text-white font-serif">₹0</div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Lagna Kundli (D1) calculation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Basic Mulank & Bhagyank numerology
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Daily Moon sign horoscope
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> 5 Free Ask AI Pandit questions
              </li>
            </ul>
            <Link
              href="/dashboard"
              className="block w-full text-center py-2.5 rounded-xl bg-celestial-800 text-white font-bold text-xs hover:bg-celestial-700 transition"
            >
              Get Started Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-celestial-800 to-celestial-950 border border-gold-400 shadow-gold-glow space-y-4 relative">
            <div className="absolute -top-3 right-6 bg-gold-gradient text-celestial-950 font-bold text-[10px] uppercase px-3 py-0.5 rounded-full shadow">
              Most Popular
            </div>
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-gold-300">AI Pandit Premium</div>
              <span className="text-xs font-bold text-gold-300 bg-gold-500/20 px-2.5 py-1 rounded-full">
                Monthly
              </span>
            </div>
            <div className="text-2xl font-bold text-white font-serif">
              ₹499 <span className="text-xs text-slate-400 font-sans">/ month</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" /> Full D1 & Navamsha D9 + Vimshottari Dashas
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" /> AI Palmistry & Hastha Rekha hand photo scans
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" /> AI Face Reading (Mukh Samudrika) analysis
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" /> Complete 36 Guna Marriage Kundli Matching
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" /> Unlimited AI Pandit chatbot conversations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-gold-400 shrink-0" /> Downloadable High-Res PDF Reports (Hindi/English)
              </li>
            </ul>
            <Link
              href="/dashboard/subscription"
              className="block w-full text-center py-2.5 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition"
            >
              Upgrade to Premium
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
