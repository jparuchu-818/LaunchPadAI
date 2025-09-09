import { NextResponse } from "next/server";
import { chatWithAI } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { idea } = await req.json();

    const result = await chatWithAI(
      `Generate a business model for the idea: "${idea}".
      Return ONLY JSON in this schema:
      {
        "pricing_strategy": "...",
        "revenue_streams": ["...", "..."]
      }`
    );

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = { pricing_strategy: "N/A", revenue_streams: [result] };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error in generate-business-model:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
