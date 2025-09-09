import { NextResponse } from "next/server";
import { chatWithAI } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { idea } = await req.json();

    const prompt = `
    Generate a prototype user flow for the startup idea: "${idea}".
    Return ONLY valid JSON in this schema:

    {
      "prototype_flow": [
        "Step 1: ...",
        "Step 2: ...",
        "Step 3: ..."
      ]
    }
    `;

    const result = await chatWithAI(prompt);

    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      const match = result.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        parsed = { prototype_flow: [result] };
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error in generate-flow:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate flow" },
      { status: 500 }
    );
  }
}
