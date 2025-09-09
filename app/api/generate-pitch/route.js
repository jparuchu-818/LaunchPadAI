import { NextResponse } from "next/server";
import { chatWithAI } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { idea } = await req.json();

    const prompt = `
    Generate a startup pitch deck for the idea: "${idea}".
    Return ONLY valid JSON in the format:

    {
      "slides": [
        { "title": "Problem", "content": "..." },
        { "title": "Solution", "content": "..." },
        { "title": "Market Opportunity", "content": "..." },
        { "title": "Business Model", "content": "..." },
        { "title": "Go-To-Market", "content": "..." },
        { "title": "Vision", "content": "..." }
      ]
    }
    `;

    const result = await chatWithAI(prompt);

    // Try parsing JSON safely
    let parsed;
    try {
      parsed = JSON.parse(result);
    } catch {
      // Fallback: extract JSON substring with regex
      const match = result.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("AI did not return valid JSON.");
      }
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error in generate-pitch:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate pitch" },
      { status: 500 }
    );
  }
}
