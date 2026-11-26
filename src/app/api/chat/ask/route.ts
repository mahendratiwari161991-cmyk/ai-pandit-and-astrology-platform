import { NextRequest, NextResponse } from "next/server";
import { askAIPandit, ChatMessage } from "@/lib/ai/chatbot-service";
import { astrologyStore } from "@/lib/db/mock-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, profileId, history = [] } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Retrieve active birth profile
    const profile =
      astrologyStore.birthProfiles.find((p) => p.id === profileId) ||
      astrologyStore.birthProfiles[0];
    const kundli = astrologyStore.getKundli(profile);

    const reply = await askAIPandit(message, kundli, history);

    return NextResponse.json({
      success: true,
      data: {
        reply,
        profileName: profile.name,
      },
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process question" },
      { status: 500 }
    );
  }
}
