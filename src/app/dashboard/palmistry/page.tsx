"use client";

import React, { useState, useRef } from "react";
import { astrologyStore, StoredPalmistryReport } from "@/lib/db/mock-store";
import { Hand, Camera, Upload, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function PalmistryStudioPage() {
  const existingReport = astrologyStore.palmReports[0];
  const [report, setReport] = useState<StoredPalmistryReport | null>(existingReport);
  const [selectedHand, setSelectedHand] = useState<"Left" | "Right">("Right");
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setErrorMessage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunAnalysis = async () => {
    if (!consentAccepted) {
      setErrorMessage("Please accept explicit biometric consent before uploading hand photographs.");
      return;
    }
    if (!previewImage) {
      setErrorMessage("Please select or capture a photograph of your palm first.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/palmistry/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: previewImage,
          hand: selectedHand,
          consentAccepted: true,
        }),
      });

      const resJson = await res.json();
      if (resJson.success) {
        setReport(astrologyStore.palmReports[0]);
      } else {
        setErrorMessage(resJson.error || "Failed to analyze palm photo");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error analyzing photo");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
          <Hand className="w-4 h-4" /> Hastha Rekha & Multimodal AI
        </div>
        <h1 className="text-2xl font-bold font-serif text-white mt-1">
          AI Palm Reading (Palmistry)
        </h1>
        <p className="text-xs text-slate-400">
          Upload left or right palm photos for computer vision detection of Life, Heart, Head, and Fate lines.
        </p>
      </div>

      {/* Upload and Capture Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Upload Control */}
        <div className="p-6 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gold-300">Choose Hand</span>
            <div className="flex items-center gap-1 bg-celestial-950 p-1 rounded-lg border border-gold-500/30 text-xs">
              <button
                type="button"
                onClick={() => setSelectedHand("Left")}
                className={`px-3 py-1 rounded transition ${
                  selectedHand === "Left" ? "bg-gold-500 text-celestial-950 font-bold" : "text-slate-300"
                }`}
              >
                Left Hand (Karma/Potential)
              </button>
              <button
                type="button"
                onClick={() => setSelectedHand("Right")}
                className={`px-3 py-1 rounded transition ${
                  selectedHand === "Right" ? "bg-gold-500 text-celestial-950 font-bold" : "text-slate-300"
                }`}
              >
                Right Hand (Manifested/Present)
              </button>
            </div>
          </div>

          {/* Photo Dropzone / Preview */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gold-500/30 rounded-2xl p-6 text-center cursor-pointer hover:border-gold-400 hover:bg-gold-500/5 transition relative flex flex-col items-center justify-center min-h-[220px]"
          >
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {previewImage ? (
              <div className="relative max-h-56 overflow-hidden rounded-xl">
                <img src={previewImage} alt="Uploaded Palm" className="max-h-56 object-contain rounded-xl" />
                <div className="absolute inset-0 bg-celestial-950/40 flex items-center justify-center opacity-0 hover:opacity-100 transition text-xs font-bold text-white">
                  Click to replace photo
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-gold-500/20 text-gold-400 mx-auto flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-white">
                  Click to select or capture palm photo
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Ensure good lighting, open flat palm, and clear visible palm lines.
                </p>
              </div>
            )}
          </div>

          {/* Consent Checkbox */}
          <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-0.5 rounded border-gold-500 text-gold-500 focus:ring-0"
            />
            <span>
              I give explicit consent to analyze my palm photograph for personal astrology guidance. My photo will remain private and will not be used for AI training.
            </span>
          </label>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full py-2.5 rounded-xl bg-gold-gradient text-celestial-950 font-bold text-xs shadow-gold-glow hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>Scanning Palm Lines & Mounts...</>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Analyze {selectedHand} Hand Photograph
              </>
            )}
          </button>
        </div>

        {/* Right Card: Interactive Palm Visualizer with Line Overlays */}
        <div className="p-6 rounded-2xl bg-celestial-900/80 border border-gold-500/20 flex flex-col items-center justify-center relative">
          <div className="text-xs font-bold text-gold-300 mb-3 text-center">
            Palm Line & Mount Visual Marker Map
          </div>

          <div className="relative w-64 h-80 rounded-2xl bg-celestial-950 border border-gold-500/30 overflow-hidden flex items-center justify-center p-2 shadow-inner">
            {/* Palm Silhouette / Preview SVG */}
            <svg viewBox="0 0 200 250" className="w-full h-full opacity-60">
              {/* Simplified Hand Outline */}
              <path
                d="M 50,220 C 50,170 30,130 30,100 C 30,80 40,80 45,95 C 50,110 50,60 55,50 C 60,40 70,40 75,55 C 80,70 80,35 85,25 C 90,15 100,15 105,30 C 110,45 110,40 115,35 C 120,30 130,35 130,50 C 130,70 135,70 145,85 C 155,100 155,120 150,150 C 145,180 140,220 130,230 Z"
                fill="none"
                stroke="#d4af37"
                strokeWidth="2"
              />
              {/* Major Lines */}
              <path d="M 65,110 C 75,140 85,180 90,210" fill="none" stroke="#22c55e" strokeWidth="2.5" />
              <path d="M 140,110 C 105,115 80,105 60,110" fill="none" stroke="#ef4444" strokeWidth="2.5" />
              <path d="M 60,115 C 90,135 120,145 135,160" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
              <path d="M 95,210 C 95,170 95,140 95,100" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="3,3" />
            </svg>

            {/* Overlaid Markers */}
            {report?.imageMarkers?.map((marker, idx) => (
              <div
                key={idx}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              >
                <div className="w-3.5 h-3.5 rounded-full bg-gold-400 border border-white animate-pulse" />
                <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 rounded bg-celestial-900 border border-gold-500/50 text-[10px] text-white whitespace-nowrap shadow-lg z-20">
                  {marker.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4 text-[10px] text-slate-300">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Life Line
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> Heart Line
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Head Line
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Fate Line
            </span>
          </div>
        </div>
      </div>

      {/* Generated Report Details */}
      {report && (
        <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-celestial-700 pb-4">
            <div>
              <div className="text-xs text-gold-400 font-bold uppercase">Comprehensive Analysis</div>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Hastha Rekha Palmistry Report ({report.handAnalyzed} Hand)
              </h3>
            </div>
            <span className="text-xs text-slate-400 bg-celestial-900 px-3 py-1 rounded-full border border-celestial-700">
              Analyzed: {report.date}
            </span>
          </div>

          {/* Lines Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1">
              <span className="text-xs font-bold text-emerald-300">1. Life Line (जीवन रेखा)</span>
              <p className="text-xs text-slate-300 leading-relaxed">{report.lines.lifeLine.reading}</p>
            </div>
            <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1">
              <span className="text-xs font-bold text-red-300">2. Heart Line (हृदय रेखा)</span>
              <p className="text-xs text-slate-300 leading-relaxed">{report.lines.heartLine.reading}</p>
            </div>
            <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1">
              <span className="text-xs font-bold text-blue-300">3. Head Line (मस्तिष्क रेखा)</span>
              <p className="text-xs text-slate-300 leading-relaxed">{report.lines.headLine.reading}</p>
            </div>
            <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1">
              <span className="text-xs font-bold text-yellow-300">4. Fate Line (भाग्य रेखा)</span>
              <p className="text-xs text-slate-300 leading-relaxed">{report.lines.fateLine.reading}</p>
            </div>
          </div>

          {/* Mounts Summary */}
          <div className="p-4 rounded-xl bg-celestial-900/60 border border-gold-500/20 space-y-2">
            <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">Planetary Mounts (ग्रह पर्वत)</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div>
                <strong className="text-gold-200">Jupiter Mount: </strong>
                {report.mounts.jupiter}
              </div>
              <div>
                <strong className="text-gold-200">Venus Mount: </strong>
                {report.mounts.venus}
              </div>
              <div>
                <strong className="text-gold-200">Saturn Mount: </strong>
                {report.mounts.saturn}
              </div>
              <div>
                <strong className="text-gold-200">Sun (Apollo) Mount: </strong>
                {report.mounts.apollo}
              </div>
            </div>
          </div>

          {/* Guidance & Disclaimer */}
          <div className="p-4 rounded-xl bg-celestial-950 border border-celestial-800 text-xs text-slate-400 space-y-2">
            <div>
              <strong className="text-gold-400">Life Guidance: </strong>
              {report.guidance}
            </div>
            <div className="text-[10px] text-slate-500 border-t border-celestial-800 pt-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Palmistry is a traditional interpretative belief practice. It provides reflective insight on tendencies rather than scientifically verifiable prediction.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
