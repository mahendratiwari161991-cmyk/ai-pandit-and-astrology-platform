import { NextRequest, NextResponse } from "next/server";
import { BirthDetails } from "@/lib/astrology/types";
import { generateKundli } from "@/lib/astrology/engine";
import { calculateAshtakoot } from "@/lib/astrology/matching";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { bride, groom } = body;

    if (!bride || !groom) {
      return NextResponse.json(
        { error: "Both bride and groom birth details are required." },
        { status: 400 }
      );
    }

    const brideDetails: BirthDetails = {
      name: bride.name,
      gender: "female",
      dob: bride.dob,
      tob: bride.tob,
      pob: bride.pob,
      latitude: parseFloat(bride.latitude),
      longitude: parseFloat(bride.longitude),
      timezone: bride.timezone !== undefined ? parseFloat(bride.timezone) : 5.5,
    };

    const groomDetails: BirthDetails = {
      name: groom.name,
      gender: "male",
      dob: groom.dob,
      tob: groom.tob,
      pob: groom.pob,
      latitude: parseFloat(groom.latitude),
      longitude: parseFloat(groom.longitude),
      timezone: groom.timezone !== undefined ? parseFloat(groom.timezone) : 5.5,
    };

    const brideKundli = generateKundli(brideDetails);
    const groomKundli = generateKundli(groomDetails);

    const ashtakootScore = calculateAshtakoot(brideKundli, groomKundli);

    return NextResponse.json({
      success: true,
      data: {
        score: ashtakootScore,
        brideKundli,
        groomKundli,
      },
    });
  } catch (error: any) {
    console.error("Kundli matching API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to perform Kundli Matching" },
      { status: 500 }
    );
  }
}
