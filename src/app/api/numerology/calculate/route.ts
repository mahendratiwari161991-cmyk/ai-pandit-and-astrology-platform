import { NextRequest, NextResponse } from "next/server";
import { calculateNumerology } from "@/lib/numerology/engine";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, dob } = body;

    if (!name || !dob) {
      return NextResponse.json(
        { error: "Name and Date of Birth (YYYY-MM-DD) are required" },
        { status: 400 }
      );
    }

    const report = calculateNumerology(name, dob);

    return NextResponse.json({ success: true, data: report });
  } catch (error: any) {
    console.error("Numerology API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to calculate numerology" },
      { status: 500 }
    );
  }
}
