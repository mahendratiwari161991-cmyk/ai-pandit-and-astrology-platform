import { NextRequest, NextResponse } from "next/server";
import { BirthDetails } from "@/lib/astrology/types";
import { generateKundli } from "@/lib/astrology/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, gender, dob, tob, pob, latitude, longitude, timezone } = body;

    if (!name || !dob || !tob || !pob || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Missing required birth details (name, dob, tob, pob, coordinates)" },
        { status: 400 }
      );
    }

    const birthDetails: BirthDetails = {
      name,
      gender: gender || "other",
      dob,
      tob,
      pob,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      timezone: timezone !== undefined ? parseFloat(timezone) : 5.5,
    };

    const kundli = generateKundli(birthDetails);

    return NextResponse.json({ success: true, data: kundli });
  } catch (error: any) {
    console.error("Kundli generation API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate Vedic Kundli" },
      { status: 500 }
    );
  }
}
