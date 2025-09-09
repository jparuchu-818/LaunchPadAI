import { NextResponse } from "next/server";
import { chatWithAI } from "@/configs/AiModel";

export async function POST(request) {
  try {
    const { idea } = await request.json();

    const result = await chatWithAI(
      `Generate two sets of features for this startup idea: "${idea}".
      1. MVP features (core essential functionality).
      2. Advanced features (future, premium, or AI-powered).
      
      Respond in valid JSON with this format:
      {
        "mvp_features": ["", ""],
        "advanced_features": ["", ""]
      }`
    );

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      // fallback if AI response is not JSON
      parsed = {
        mvp_features: ["Basic user signup/login", "Core functionality"],
        advanced_features: ["Analytics dashboard", "AI recommendations"],
      };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error in generate-features:", error);
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
