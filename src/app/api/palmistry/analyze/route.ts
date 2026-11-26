import { NextRequest, NextResponse } from "next/server";
import { analyzePalmImage } from "@/lib/ai/palmistry-service";
import { astrologyStore } from "@/lib/db/mock-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, hand = "Right", consentAccepted } = body;

    if (!consentAccepted) {
      return NextResponse.json(
        { error: "User consent is required for biometric photograph analysis." },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: "Please provide a valid hand photograph." },
        { status: 400 }
      );
    }

    const analysis = await analyzePalmImage(image, hand);

    // Save to store for the current session/user
    const newReport = {
      id: "palm_" + Date.now(),
      userId: "usr_customer_1",
      date: new Date().toISOString().split("T")[0],
      handAnalyzed: hand,
      lines: {
        lifeLine: {
          quality: analysis.lines.lifeLine.quality,
          depth: "Deep",
          length: analysis.lines.lifeLine.length,
          reading: analysis.lines.lifeLine.interpretation,
        },
        heartLine: {
          quality: analysis.lines.heartLine.quality,
          depth: "Moderate",
          length: analysis.lines.heartLine.length,
          reading: analysis.lines.heartLine.interpretation,
        },
        headLine: {
          quality: analysis.lines.headLine.quality,
          depth: "Clear",
          length: analysis.lines.headLine.length,
          reading: analysis.lines.headLine.interpretation,
        },
        fateLine: {
          quality: analysis.lines.fateLine.quality,
          depth: "Definite",
          length: analysis.lines.fateLine.length,
          reading: analysis.lines.fateLine.interpretation,
        },
        sunLine: {
          quality: analysis.lines.sunLine.quality,
          depth: "Fine",
          length: analysis.lines.sunLine.length,
          reading: analysis.lines.sunLine.interpretation,
        },
      },
      mounts: {
        venus: analysis.mounts.mountOfVenus.meaning,
        jupiter: analysis.mounts.mountOfJupiter.meaning,
        saturn: analysis.mounts.mountOfSaturn.meaning,
        apollo: analysis.mounts.mountOfApollo.meaning,
        mercury: analysis.mounts.mountOfMercury.meaning,
      },
      overview: analysis.synthesis.personality,
      careerFinance: analysis.synthesis.careerTendencies + " " + analysis.synthesis.financialIndications,
      loveRelationships: analysis.synthesis.relationshipTendencies,
      strengths: analysis.synthesis.strengths,
      challenges: analysis.synthesis.challenges,
      guidance: analysis.synthesis.generalGuidance,
      imageMarkers: analysis.markers.map((m) => ({
        x: m.x,
        y: m.y,
        label: m.title,
        lineType: m.lineType,
      })),
    };

    astrologyStore.palmReports.unshift(newReport);

    return NextResponse.json({ success: true, data: analysis, reportId: newReport.id });
  } catch (error: any) {
    console.error("Palmistry API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze palm photograph" },
      { status: 500 }
    );
  }
}
