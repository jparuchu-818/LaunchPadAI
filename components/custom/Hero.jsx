"use client";

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { MessagesContext } from "@/context/MessagesContext";
import { Wand2, Send, Loader2 } from "lucide-react";

function Hero() {
  const [userInput, setUserInput] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const { setMessages } = useContext(MessagesContext);
  const router = useRouter();

  // Enhance idea with AI
  const enhancePrompt = async () => {
    if (!userInput) return;
    setIsEnhancing(true);
    try {
      const res = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setUserInput(data.enhancedPrompt);
      }
    } catch (error) {
      console.error("Enhance failed:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Go to workspace
  const onGenerate = async () => {
    if (!userInput) return;

    const msg = { role: "user", content: userInput };
    setMessages(msg);

    // Generate temp workspace id
    const workspaceID = "temp-" + Date.now();

    // Redirect to workspace
    router.push(`/workspace/${workspaceID}?idea=${encodeURIComponent(userInput)}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Code the Impossible
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-mono">
              Transform your ideas into production-ready prototypes
            </p>
          </div>

          {/* Input Section */}
          <div className="w-full max-w-3xl bg-gray-900/40 backdrop-blur-2xl rounded-xl border border-gray-700">
            <div className="p-6 flex gap-4">
              <textarea
                placeholder="Describe your startup idea..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full bg-transparent border border-gray-700 rounded-lg p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-lg resize-none h-32"
                disabled={isEnhancing}
              />
              <div className="flex flex-col gap-2">
                <button
                  onClick={enhancePrompt}
                  disabled={isEnhancing}
                  className="flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-xl px-4 py-3 transition disabled:opacity-50"
                >
                  {isEnhancing ? <Loader2 className="h-6 w-6 animate-spin" /> : <Wand2 className="h-6 w-6" />}
                </button>
                <button
                  onClick={onGenerate}
                  className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl px-4 py-3 transition"
                >
                  <Send className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
