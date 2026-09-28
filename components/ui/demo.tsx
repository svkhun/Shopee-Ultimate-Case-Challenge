"use client";

import { useState, useEffect } from "react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  image: {
    src: "/static/assets/real_warehouse_hero.jpg",
    background: "/static/assets/real_conveyor_hero.jpg",
    title: "Smart COD Reliability Intelligence",
    date: "Shopee Ultimate Case Challenge 2026",
    scrollToExpand: "Scroll to Expand Fulfillment Hub",
    about: {
      overview:
        "A strategic, data-driven framework addressing the 10.6× higher COD delivery failure rate through dynamic buyer reliability scoring, preferred window scheduling, and risk-calibrated progressive interventions.",
      conclusion:
        "Engineered for Shopee Ultimate Case Challenge (SUCC 2026). Targeted, progressive, and recoverable interventions reduce logistics losses by 42% while preserving 100% frictionless checkout for trustworthy buyers.",
    },
  },
};

export default function Demo() {
  const [mediaType, setMediaType] = useState<"image">("image");
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="min-h-screen">
      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
      >
        <div className="max-w-4xl mx-auto py-12 px-6">
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Smart COD Reliability Intelligence
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
            {currentMedia.about.overview}
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {currentMedia.about.conclusion}
          </p>
        </div>
      </ScrollExpandMedia>
    </div>
  );
}
