import { NextResponse } from "next/server";
import { enhancePrompt } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const text = await enhancePrompt(
      `Enhance this startup idea prompt for clarity, creativity, and impact. Keep under 300 words.\n\n"${prompt}"`
    );

    return NextResponse.json({ enhancedPrompt: text.trim() });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
