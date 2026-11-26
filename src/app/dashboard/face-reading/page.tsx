"use client";

import React, { useState } from "react";
import { astrologyStore, StoredFaceReadingReport } from "@/lib/db/mock-store";
import { Smile, Upload, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";

export default function FaceReadingStudioPage() {
  const existingReport = astrologyStore.faceReports[0];
  const [report, setReport] = useState<StoredFaceReadingReport | null>(existingReport);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [consentAccepted, setConsentAccepted] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setErrorMessage("Please accept explicit consent for facial physiognomy analysis.");
      return;
    }
    if (!previewImage) {
      setErrorMessage("Please upload a front-facing facial photo.");
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/face-reading/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: previewImage,
          consentAccepted: true,
        }),
      });

      const resJson = await res.json();
      if (resJson.success) {
        setReport(astrologyStore.faceReports[0]);
      } else {
        setErrorMessage(resJson.error || "Failed to analyze face photo");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Network error");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
          <Smile className="w-4 h-4" /> Classical Samudrika Shastra
        </div>
        <h1 className="text-2xl font-bold font-serif text-white mt-1">
          AI Face Reading (Mukh Samudrika)
        </h1>
        <p className="text-xs text-slate-400">
          Traditional facial geometry analysis decoding forehead curvature, eye shape, symmetry, and physiognomic personality archetypes.
        </p>
      </div>

      {/* Upload and Consent Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-4">
          <div className="text-xs font-bold text-gold-300">Front-Facing Photograph</div>

          <label className="border-2 border-dashed border-gold-500/30 rounded-2xl p-6 text-center cursor-pointer hover:border-gold-400 hover:bg-gold-500/5 transition relative flex flex-col items-center justify-center min-h-[200px] block">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {previewImage ? (
              <img src={previewImage} alt="Uploaded Face" className="max-h-48 object-contain rounded-xl mx-auto" />
            ) : (
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-white">Click to upload face photo</div>
                <p className="text-[11px] text-slate-400">
                  Direct front-facing photo without sunglasses or heavy occlusion.
                </p>
              </div>
            )}
          </label>

          <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-0.5 rounded border-gold-500 text-gold-500 focus:ring-0"
            />
            <span>
              I grant consent for facial feature analysis. I understand this is based on traditional Indian Samudrika Shastra and does not infer medical conditions or sensitive attributes.
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
              <>Analyzing Facial Archetypes...</>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Analyze Facial Features
              </>
            )}
          </button>
        </div>

        {/* Symmetry & Feature Overview Meter */}
        <div className="p-6 rounded-2xl bg-celestial-900/80 border border-gold-500/20 space-y-4">
          <div className="text-xs font-bold text-gold-300">Bilateral Facial Symmetry Index</div>

          <div className="p-4 rounded-xl bg-celestial-950 border border-celestial-800 text-center space-y-2">
            <div className="text-3xl font-extrabold text-gold-300 font-serif">
              {report?.features.symmetry.score || 88}%
            </div>
            <div className="w-full bg-celestial-800 rounded-full h-2">
              <div
                className="bg-gold-gradient h-2 rounded-full"
                style={{ width: `${report?.features.symmetry.score || 88}%` }}
              />
            </div>
            <p className="text-xs text-slate-300 pt-1">
              {report?.features.symmetry.interpretation}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-celestial-950 border border-celestial-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-gold-300">Physiognomic Archetype: </span>
            <span>{report?.features.faceStructure.type}</span>
          </div>

          <div className="p-4 rounded-xl bg-celestial-950 border border-celestial-800 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-gold-300">Forehead (Lalata): </span>
            <span>{report?.features.forehead.interpretation}</span>
          </div>
        </div>
      </div>

      {/* Feature Breakdown Grid */}
      {report && (
        <div className="p-6 rounded-3xl bg-card-gradient border border-gold-500/30 space-y-6">
          <div className="flex items-center justify-between border-b border-celestial-700 pb-3">
            <div>
              <div className="text-xs text-gold-400 font-bold uppercase">Samudrika Shastra Synthesis</div>
              <h3 className="text-lg font-bold text-white mt-0.5">Classical Feature Archetypes</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1">
              <span className="font-bold text-gold-200">Eyes & Gaze (Netra):</span>
              <p className="leading-relaxed">{report.features.eyes.interpretation}</p>
            </div>
            <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1">
              <span className="font-bold text-gold-200">Nose Bridge (Nasika):</span>
              <p className="leading-relaxed">{report.features.nose.interpretation}</p>
            </div>
            <div className="p-4 rounded-xl bg-celestial-900/80 border border-celestial-800 space-y-1">
              <span className="font-bold text-gold-200">Lips & Speech (Adhara):</span>
              <p className="leading-relaxed">{report.features.lips.interpretation}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-celestial-900/60 border border-gold-500/20 text-xs text-slate-300 space-y-2">
            <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">Personality Synthesis</div>
            <p className="leading-relaxed">{report.personalitySynthesis}</p>
          </div>

          <div className="p-3 rounded-lg bg-celestial-950 text-[10px] text-slate-400 flex items-start gap-2 border border-celestial-800">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Disclaimer: Face reading (Samudrika Shastra) is a traditional cultural belief system. It does not possess scientific empirical validity and cannot be used to determine character, medical diagnosis, or guaranteed life outcomes.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
