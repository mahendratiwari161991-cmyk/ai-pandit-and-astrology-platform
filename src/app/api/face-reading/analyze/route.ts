import { NextRequest, NextResponse } from "next/server";
import { analyzeFaceImage } from "@/lib/ai/face-reading-service";
import { astrologyStore } from "@/lib/db/mock-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, consentAccepted } = body;

    if (!consentAccepted) {
      return NextResponse.json(
        { error: "User consent is required before performing facial analysis." },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: "Please provide a valid front-facing face photograph." },
        { status: 400 }
      );
    }

    const analysis = await analyzeFaceImage(image);

    // Save to local store
    const newReport = {
      id: "face_" + Date.now(),
      userId: "usr_customer_1",
      faceImageUrl: image.startsWith("data:") ? image : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
      date: new Date().toISOString().split("T")[0],
      features: {
        faceStructure: {
          type: analysis.features.faceStructure.type,
          interpretation: analysis.features.faceStructure.traditionalSignificance,
        },
        forehead: {
          type: analysis.features.forehead.type,
          interpretation: analysis.features.forehead.traditionalSignificance,
        },
        eyebrows: {
          type: analysis.features.eyebrows.type,
          interpretation: analysis.features.eyebrows.traditionalSignificance,
        },
        eyes: {
          type: analysis.features.eyes.type,
          interpretation: analysis.features.eyes.traditionalSignificance,
        },
        nose: {
          type: analysis.features.nose.type,
          interpretation: analysis.features.nose.traditionalSignificance,
        },
        lips: {
          type: analysis.features.lips.type,
          interpretation: analysis.features.lips.traditionalSignificance,
        },
        chinJaw: {
          type: analysis.features.chinJaw.type,
          interpretation: analysis.features.chinJaw.traditionalSignificance,
        },
        symmetry: {
          score: analysis.features.symmetry.score,
          interpretation: analysis.features.symmetry.interpretation,
        },
      },
      personalitySynthesis: analysis.synthesis.personality,
      strengths: analysis.synthesis.generalStrengths,
      growthAreas: analysis.synthesis.personalDevelopmentSuggestions,
      physiognomyInsight: analysis.synthesis.traditionalPhysiognomyInterpretation,
    };

    astrologyStore.faceReports.unshift(newReport);

    return NextResponse.json({ success: true, data: analysis, reportId: newReport.id });
  } catch (error: any) {
    console.error("Face reading API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze face photograph" },
      { status: 500 }
    );
  }
}
