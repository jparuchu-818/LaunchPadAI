"use client";

import { useState } from "react";
import { Loader2Icon, Maximize2 } from "lucide-react";

function StartupAssetsView({ assets, idea, website, loading }) {
  const [activeTab, setActiveTab] = useState("features");
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className="relative h-[85vh] flex flex-col bg-gray-900 rounded-xl border border-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-purple-700/20 to-blue-700/20 flex justify-between items-center rounded-t-xl">
        <div>
          <h2 className="text-lg font-semibold text-white">🛠 Startup Assets</h2>
          <p className="text-sm text-gray-400">
            Generate features, flow, business model, pitch deck & website
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            disabled
            value={idea || ""}
            className="bg-gray-800 text-white px-3 py-1 rounded-lg border border-gray-700 text-sm"
          />
          <button
            disabled
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg text-white text-sm opacity-70 cursor-not-allowed"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 text-sm">
        {["features", "flow", "business", "pitch", "website"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 capitalize transition ${
              activeTab === tab
                ? "bg-purple-500/20 text-purple-300 font-medium"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading && (
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2Icon className="animate-spin h-5 w-5" />
            <p className="font-medium">Generating startup assets...</p>
          </div>
        )}

        {/* Features */}
        {!loading && activeTab === "features" && assets?.features && (
          <div className="space-y-2">
            <h3 className="text-blue-400 font-semibold">MVP Features</h3>
            <ul className="list-disc list-inside text-gray-300">
              {(assets.features.mvp_features || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <h3 className="text-purple-400 font-semibold mt-4">
              Advanced Features
            </h3>
            <ul className="list-disc list-inside text-gray-300">
              {(assets.features.advanced_features || []).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Flow */}
        {!loading && activeTab === "flow" && assets?.flow && (
          <div className="space-y-2">
            <h3 className="text-blue-400 font-semibold">Prototype Flow</h3>
            <ul className="list-decimal list-inside text-gray-300">
              {(assets.flow.prototype_flow || []).map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Business */}
        {/* Business */}
{!loading && activeTab === "business" && assets?.business && (
  <div className="space-y-4">
    <h3 className="text-blue-400 font-semibold">Pricing Strategy</h3>
    <p className="text-gray-300">{assets.business.pricing_strategy || "N/A"}</p>

    {/* If pricing tiers exist, render them as bullets */}
    {assets.business.pricing_tiers && (
      <ul className="list-disc list-inside text-gray-300 ml-4">
        {assets.business.pricing_tiers.map((tier, i) => (
          <li key={i}>
            <span className="font-semibold text-purple-300">{tier.name}: </span>
            {tier.details}
          </li>
        ))}
      </ul>
    )}

    <h3 className="text-purple-400 font-semibold mt-6">Revenue Streams</h3>
    <ul className="list-disc list-inside text-gray-300 ml-4">
      {(assets.business.revenue_streams || []).map((r, i) => (
        <li key={i}>{r}</li>
      ))}
    </ul>
  </div>
)}


        {/* Pitch */}
        {!loading && activeTab === "pitch" && assets?.pitch && (
          <div className="space-y-4">
            {(assets.pitch.slides || []).map((s, i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-gray-800/30 border border-gray-700"
              >
                <h3 className="text-blue-400 font-semibold">{s.title}</h3>
                <p className="text-gray-300">{s.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Website Preview */}
        {!loading && activeTab === "website" && (
          <div className="p-4 rounded-lg bg-gray-800/30 border border-gray-700 relative">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-blue-400 font-semibold">Prototype Website</h3>
              {website?.html && (
                <button
                  onClick={() => setFullscreen(!fullscreen)}
                  className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition"
                >
                  <Maximize2 size={14} />
                  {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
              )}
            </div>
            {website?.html ? (
              <iframe
                srcDoc={website.html}
                className={`w-full border rounded-lg bg-white transition ${
                  fullscreen ? "h-[90vh]" : "h-[600px]"
                }`}
                title="Prototype Website"
              />
            ) : (
              <p className="text-red-400">Website generation failed.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StartupAssetsView;
