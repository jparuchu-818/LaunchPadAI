"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AnalysisView from "@/components/custom/AnalysisView";
import StartupAssetsView from "@/components/custom/startupAssetsView";

export default function WorkspacePage({ params }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea");

  const [analysis, setAnalysis] = useState(null);
  const [assets, setAssets] = useState({});
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!idea) return;

      try {
        // Run all API calls in parallel
        const [
          analysisRes,
          featuresRes,
          flowRes,
          businessRes,
          pitchRes,
          websiteRes,
        ] = await Promise.all([
          fetch("/api/analyze-idea", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idea }),
          }),
          fetch("/api/generate-features", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idea }),
          }),
          fetch("/api/generate-flow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idea }),
          }),
          fetch("/api/generate-business-model", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idea }),
          }),
          fetch("/api/generate-pitch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idea }),
          }),
          fetch("/api/generate-website", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idea }),
          }),
        ]);

        const [analysisData, features, flow, business, pitch, websiteData] =
          await Promise.all([
            analysisRes.json(),
            featuresRes.json(),
            flowRes.json(),
            businessRes.json(),
            pitchRes.json(),
            websiteRes.json(),
          ]);

        setAnalysis(analysisData);
        setAssets({ features, flow, business, pitch });
        setWebsite(websiteData);
      } catch (err) {
        console.error("Error fetching workspace data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idea]);

  return (
    <div className="h-screen grid grid-cols-2 gap-4 p-6 bg-gray-950">
      <AnalysisView analysis={analysis} loading={loading} />
      <StartupAssetsView assets={assets} idea={idea} website={website} loading={loading} />
    </div>
  );
}
