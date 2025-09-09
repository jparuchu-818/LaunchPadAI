import { NextResponse } from "next/server";
import { chatWithAI } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { idea } = await req.json();

    const result = await chatWithAI(
      `Analyze this startup idea: "${idea}".
      Return ONLY valid JSON in this schema:
      {
        "problem": { "summary": "...", "key_issues": ["...", "..."] },
        "vision": { "summary": "...", "key_components": ["...", "..."] }
      }
      Do not include any explanations, only JSON.`
    );

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      parsed = { problem: { summary: result, key_issues: [] }, vision: { summary: "", key_components: [] } };
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error in analyze-idea:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
