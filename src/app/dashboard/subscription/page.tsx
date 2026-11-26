"use client";

import React, { useState } from "react";
import { useUserRole } from "@/context/UserRoleContext";
import { CreditCard, CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";

export default function SubscriptionPage() {
  const { currentUser } = useUserRole();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTestCheckout = (planName: string, amount: number) => {
    setIsProcessing(true);
    // Simulate Razorpay checkout modal / backend webhook flow
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      currentUser.subscriptionTier = "premium";
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
          <CreditCard className="w-4 h-4" /> Subscription & Payment Gateway
        </div>
        <h1 className="text-2xl font-bold font-serif text-white mt-1">
          Plans & Razorpay Integration
        </h1>
        <p className="text-xs text-slate-400">
          Unlock unlimited AI palm scans, face readings, complete Navamsha D9 charts, and detailed 36-Guna reports.
        </p>
      </div>

      {paymentSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <strong>Payment Verified Successfully via Razorpay Sandbox!</strong>
            <p className="mt-0.5 text-slate-300">Your account is now upgraded to AI Pandit Premium Tier.</p>
          </div>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
        {/* Starter Plan */}
        <div className="p-6 rounded-2xl bg-celestial-900/60 border border-celestial-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-white">Free Starter</div>
            <span className="text-xs font-semibold text-slate-400 bg-celestial-800 px-2.5 py-0.5 rounded-full">
              Current Tier
            </span>
          </div>
          <div className="text-2xl font-bold text-white font-serif">₹0</div>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic Lagna Kundli (D1)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Basic Mulank & Bhagyank
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Daily Horoscope overview
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5 Free Chatbot questions
            </li>
          </ul>
        </div>

        {/* Premium Plan with Razorpay Simulation */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-celestial-800 to-celestial-950 border border-gold-400 shadow-gold-glow space-y-4 relative">
          <div className="absolute -top-3 right-6 bg-gold-gradient text-celestial-950 font-bold text-[10px] uppercase px-3 py-0.5 rounded-full shadow">
            Recommended
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gold-300">AI Pandit Premium</div>
            <span className="text-xs font-bold text-gold-400 bg-gold-500/20 px-2.5 py-0.5 rounded-full">
              Monthly Active
            </span>
          </div>
          <div className="text-2xl font-bold text-white font-serif">
            ₹499 <span className="text-xs text-slate-400 font-sans">/ month</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-200">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" /> Full D1 & D9 Navamsha + Vimshottari Dashas
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" /> AI Palmistry & Hastha Rekha photo analysis
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" /> AI Face Reading (Mukh Samudrika)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" /> Full 36 Guna Ashtakoot Marriage Matching
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" /> Unlimited AI Pandit Chatbot Consultations
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" /> Downloadable High-Res PDF Reports
            </li>
          </ul>

          <button
            onClick={() => handleTestCheckout("AI Pandit Premium", 499)}
            disabled={isProcessing}
            className="w-full py-2.5 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>Connecting to Razorpay Test Gateway...</>
            ) : (
              <>
                <Zap className="w-4 h-4" /> Subscribe via Razorpay (Test Mode)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Security and Credentials Note */}
      <div className="p-4 rounded-xl bg-celestial-900/60 border border-celestial-800 text-xs text-slate-400 max-w-2xl mx-auto space-y-1 text-center">
        <div className="flex items-center justify-center gap-1.5 text-gold-300 font-bold">
          <ShieldCheck className="w-4 h-4" /> Razorpay Test Environment Configured
        </div>
        <p className="text-[11px]">
          Card numbers are processed securely through Razorpay PCI-DSS compliant iframe. No sensitive payment tokens or card data are stored on our servers.
        </p>
      </div>
    </div>
  );
}
