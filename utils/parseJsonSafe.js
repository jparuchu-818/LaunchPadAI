import { jsonrepair } from "jsonrepair";

export function parseJsonSafe(text, fallback = {}) {
  try {
    let cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    try {
      return JSON.parse(jsonrepair(text));
    } catch (e) {
      console.error("JSON repair failed:", e.message);
      return fallback;
    }
  }
}
