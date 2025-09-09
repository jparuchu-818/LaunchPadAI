import { NextResponse } from "next/server";
import { chatWithAI } from "@/configs/AiModel";

export async function POST(req) {
  try {
    const { idea } = await req.json();

    const prompt = `
    Build a full modern responsive startup landing page for "${idea}".
    - Use TailwindCSS for styling.
    - Must return ONLY valid HTML (no markdown, no JSON).
    - Sections:
      1. Hero with headline + CTA button
      2. Features (3–4 cards with icons)
      3. Testimonials
      4. Pricing Plans
      5. Footer with ©
    `;

    const result = await chatWithAI(prompt);

    // Clean code fences and weird markdown
    let cleaned = result
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    // Fallback template if AI fails
    if (!cleaned || !cleaned.includes("<html")) {
      cleaned = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>${idea} - Startup</title>
          <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-gray-50 text-gray-800">
          <header class="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8 text-center">
            <h1 class="text-4xl font-bold">${idea}</h1>
            <p class="mt-2 text-lg">A next-gen startup to change the world.</p>
            <button class="mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium shadow hover:bg-gray-200">
              Get Started
            </button>
          </header>

          <section class="p-10 grid md:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl p-6 shadow">🚀 <h3 class="font-bold text-lg mt-2">Fast</h3><p>Quick setup & instant results</p></div>
            <div class="bg-white rounded-xl p-6 shadow">💡 <h3 class="font-bold text-lg mt-2">Smart</h3><p>AI-powered insights</p></div>
            <div class="bg-white rounded-xl p-6 shadow">🔒 <h3 class="font-bold text-lg mt-2">Secure</h3><p>Enterprise-grade security</p></div>
          </section>

          <footer class="bg-gray-800 text-white text-center p-6 mt-10">
            © ${new Date().getFullYear()} ${idea}. All rights reserved.
          </footer>
        </body>
        </html>
      `;
    }

    return NextResponse.json({ html: cleaned });
  } catch (error) {
    console.error("Error in generate-website:", error);
    return NextResponse.json(
      { error: error.message, html: "" },
      { status: 500 }
    );
  }
}
