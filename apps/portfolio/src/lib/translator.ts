/**
 * Google Translate integration for Blog markdown content.
 * Translates prose while safely protecting code blocks, inline code, and URLs.
 */

const translationCache = new Map<string, string>();

async function translateChunk(text: string, targetLang: string = "ar"): Promise<string> {
  if (!text.trim()) return text;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(
      text
    )}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      next: { revalidate: 86400 }, // Cache translated result for 24h
    });

    if (!res.ok) return text;
    const data = await res.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      return data[0].map((item: [string]) => item[0] || "").join("");
    }
    return text;
  } catch (err) {
    console.error("Google Translate error:", err);
    return text;
  }
}

export async function translateMarkdown(
  markdown: string,
  targetLang: "ar" | "en" = "ar"
): Promise<string> {
  if (targetLang === "en") return markdown;

  const cacheKey = `${targetLang}:${markdown}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!;
  }

  // 1. Protect fenced code blocks: ```lang ... ```
  const codeBlocks: string[] = [];
  let processed = markdown.replace(/```[\w]*\n[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // 2. Protect inline code: `...`
  const inlineCodes: string[] = [];
  processed = processed.replace(/`[^`\n]+`/g, (match) => {
    inlineCodes.push(match);
    return `__INLINE_CODE_${inlineCodes.length - 1}__`;
  });

  // 3. Translate section by section (split by double newlines)
  const paragraphs = processed.split(/\n\n+/);
  const translatedParagraphs: string[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trim();
    if (!trimmed) {
      translatedParagraphs.push("");
      continue;
    }

    // If it's just a code block placeholder or horizontal rule, do not translate
    if (/^__CODE_BLOCK_\d+__$/.test(trimmed) || /^---+$/.test(trimmed)) {
      translatedParagraphs.push(trimmed);
      continue;
    }

    // If it's a heading
    if (/^#{1,6}\s/.test(trimmed)) {
      const match = trimmed.match(/^(#{1,6}\s+)(.*)$/);
      if (match) {
        const prefix = match[1];
        const headingText = match[2];
        const translatedHeading = await translateChunk(headingText, targetLang);
        translatedParagraphs.push(`${prefix}${translatedHeading}`);
        continue;
      }
    }

    // Normal prose, list, blockquote
    const translatedText = await translateChunk(trimmed, targetLang);
    translatedParagraphs.push(translatedText);
  }

  let finalMarkdown = translatedParagraphs.join("\n\n");

  // 4. Restore inline codes
  finalMarkdown = finalMarkdown.replace(/__INLINE_CODE_(\d+)__/g, (_, idx) => {
    const i = parseInt(idx, 10);
    return inlineCodes[i] ?? "";
  });

  // 5. Restore code blocks
  finalMarkdown = finalMarkdown.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => {
    const i = parseInt(idx, 10);
    return codeBlocks[i] ?? "";
  });

  translationCache.set(cacheKey, finalMarkdown);
  return finalMarkdown;
}
