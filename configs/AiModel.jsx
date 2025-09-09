"use server";

const OLLAMA_API = "http://127.0.0.1:11434/api/generate"; // Ollama local endpoint

// Core helper
async function sendOllamaRequest(model, prompt) {
  const res = await fetch(OLLAMA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false, // disable streaming for now
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama request failed: ${res.status}`);
  }

  const data = await res.json();
  return data.response; // Ollama returns { response: "..." }
}

// Export async helpers
export async function chatWithAI(prompt) {
  return await sendOllamaRequest("llama3", prompt);
}

export async function generateCode(prompt) {
  return await sendOllamaRequest("llama3", prompt);
}

export async function enhancePrompt(prompt) {
  return await sendOllamaRequest("llama3", prompt);
}
