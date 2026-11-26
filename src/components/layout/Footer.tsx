import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart, Compass } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-celestial-950 border-t border-gold-500/20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-serif font-bold text-lg">
              <span className="text-xl">🕉️</span> AI Pandit
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Modern AI-powered Vedic astrology platform integrating classical Janma Kundli calculation, Ashtakoot marriage matching, Hastha Rekha palmistry, and Mukh Samudrika face reading.
            </p>
            <div className="text-[11px] text-gold-400/80">
              High-Precision Lahiri Ayanamsha & Sidereal Astronomy
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-white font-semibold uppercase tracking-wider text-xs">
              Astrology Services
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/dashboard/kundli" className="hover:text-gold-300 transition">
                  Vedic Kundli Generator
                </Link>
              </li>
              <li>
                <Link href="/dashboard/matching" className="hover:text-gold-300 transition">
                  36 Guna Marriage Matching
                </Link>
              </li>
              <li>
                <Link href="/dashboard/palmistry" className="hover:text-gold-300 transition">
                  AI Palm Reading (Hastha Rekha)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/face-reading" className="hover:text-gold-300 transition">
                  AI Face Reading (Samudrika)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/numerology" className="hover:text-gold-300 transition">
                  Chaldean & Vedic Numerology
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-2">
            <div className="text-white font-semibold uppercase tracking-wider text-xs">
              Portals & Consultations
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-gold-300 transition">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/pandit" className="hover:text-gold-300 transition">
                  Pandit / Astrologer Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-gold-300 transition">
                  Platform Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/chat" className="hover:text-gold-300 transition">
                  Ask AI Pandit (24/7 Chat)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/subscription" className="hover:text-gold-300 transition">
                  Premium Plans & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Ethics */}
          <div className="space-y-2">
            <div className="text-white font-semibold uppercase tracking-wider text-xs">
              Ethical Standards & Security
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We uphold strict privacy standards: user photographs and birth data are encrypted, never sold, and never utilized for public AI training without explicit permission.
            </p>
            <div className="flex items-center gap-2 text-gold-400 text-xs">
              <Shield className="w-4 h-4" /> 256-Bit SSL Encrypted
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 border-t border-celestial-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} AI Pandit Platform. All rights reserved.
          </div>
          <div className="text-center md:text-right max-w-xl text-[10px] text-slate-400">
            Disclaimer: Astrology, palmistry, face reading, and numerology are traditional interpretative belief systems. Guidance provided should be used for personal reflection and cultural interest, not as absolute medical, legal, or financial prediction.
          </div>
        </div>
      </div>
    </footer>
  );
};
