"use client";

import { useState } from "react";
import { MarkdownContent } from "@/components/markdown-content";
import { Languages, Check } from "lucide-react";

interface Props {
  originalContent: string;
  translatedContent: string;
  isArabic: boolean;
  labels: {
    translatedWithGoogle: string;
    viewOriginal: string;
    viewTranslated: string;
  };
}

export function BlogArticleView({
  originalContent,
  translatedContent,
  isArabic,
  labels,
}: Props) {
  // If isArabic, default to showing translatedContent
  const [showOriginal, setShowOriginal] = useState(false);

  const activeContent = isArabic
    ? showOriginal
      ? originalContent
      : translatedContent
    : originalContent;

  return (
    <div className="space-y-6">
      {/* Translation Banner when on Arabic locale */}
      {isArabic && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 border border-[#FFC107]/20 bg-[#FFC107]/5 text-xs text-gray-300">
          <div className="flex items-center gap-2">
            <Languages size={15} className="text-[#FFC107] shrink-0" />
            <span className="font-mono text-[#FFC107]">
              {labels.translatedWithGoogle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono">
            <button
              type="button"
              onClick={() => setShowOriginal(false)}
              className={`px-2.5 py-1 transition-colors flex items-center gap-1 ${
                !showOriginal
                  ? "bg-[#FFC107] text-black font-bold"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {!showOriginal && <Check size={11} />}
              {labels.viewTranslated}
            </button>
            <button
              type="button"
              onClick={() => setShowOriginal(true)}
              className={`px-2.5 py-1 transition-colors flex items-center gap-1 ${
                showOriginal
                  ? "bg-[#FFC107] text-black font-bold"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {showOriginal && <Check size={11} />}
              {labels.viewOriginal}
            </button>
          </div>
        </div>
      )}

      {/* Render Markdown with GSAP Animation */}
      <MarkdownContent key={showOriginal ? "orig" : "trans"} content={activeContent} />
    </div>
  );
}
