import { NextResponse } from "next/server";
import { generateCode } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const text = await generateCode(
      `Generate a React project structure with TailwindCSS.\nRespond in JSON schema with files and explanation.\n${prompt}`
    );

    let parsed;
    try {
      parsed = JSON.parse(text); // LLM should output JSON
    } catch {
      parsed = { error: "Invalid JSON response from AI", raw: text };
    }

    return NextResponse.json(parsed);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
