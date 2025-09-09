import { NextResponse } from "next/server";
import { chatWithAI } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const text = await chatWithAI(
      `You are an AI coding assistant. Respond briefly and clearly:\n${prompt}`
    );

    return NextResponse.json({ result: text });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
