"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useUserRole } from "@/context/UserRoleContext";
import {
  Compass,
  Hand,
  Smile,
  Heart,
  Hash,
  Sparkles,
  FileText,
  Users,
  CreditCard,
  Settings,
  LayoutDashboard,
  Calendar,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { currentUser } = useUserRole();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Kundli", href: "/dashboard/kundli", icon: Compass },
    { name: "Palm Reading", href: "/dashboard/palmistry", icon: Hand },
    { name: "Face Reading", href: "/dashboard/face-reading", icon: Smile },
    { name: "Numerology", href: "/dashboard/numerology", icon: Hash },
    { name: "Kundli Matching", href: "/dashboard/matching", icon: Heart },
    { name: "Horoscope & Transits", href: "/dashboard/predictions", icon: Calendar },
    { name: "Ask AI Pandit", href: "/dashboard/chat", icon: Sparkles, highlight: true },
    { name: "My Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Family Profiles", href: "/dashboard/family", icon: Users },
    { name: "Subscription", href: "/dashboard/subscription", icon: CreditCard },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-celestial-950">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-gold-500/20 bg-celestial-900/60 p-4 shrink-0 flex flex-col justify-between">
        <div className="space-y-6">
          {/* User mini profile card */}
          <div className="p-3 rounded-xl bg-celestial-800/80 border border-gold-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-400 font-bold flex items-center justify-center text-sm border border-gold-500/40">
              {currentUser.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{currentUser.fullName}</div>
              <div className="text-[10px] text-gold-300 capitalize flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                {currentUser.subscriptionTier} Tier
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                    isActive
                      ? "bg-gold-500/20 text-gold-300 border border-gold-500/40 font-bold"
                      : item.highlight
                      ? "text-gold-400 hover:bg-gold-500/10"
                      : "text-slate-300 hover:bg-celestial-800/60 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive || item.highlight ? "text-gold-400" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support & Disclaimer */}
        <div className="pt-4 border-t border-celestial-800 text-[10px] text-slate-400 space-y-1">
          <div>Lahiri Ayanamsha: Active</div>
          <div className="text-gold-400/80">Support: support@aipandit.com</div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
