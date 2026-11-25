"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  content: string;
}

function markdownToHtml(md: string): string {
  // Normalize line breaks
  let html = md.replace(/\r\n/g, "\n");

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const langLabel = lang ? `<div class="code-lang">${lang}</div>` : "";
    return `<div class="code-block">${langLabel}<pre><code class="language-${lang}">${escaped}</code></pre></div>`;
  });

  // Blockquotes
  html = html.replace(/^> (.*)$/gm, "<blockquote><p>$1</p></blockquote>");

  // Headings
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Inline code
  html = html.replace(/`([^`\n]+)`/g, "<code>$1</code>");

  // Unordered list items
  html = html.replace(/^- (.*)$/gm, "<li>$1</li>");
  // Wrap list items in <ul>
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Paragraphs for remaining text blocks
  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((b) => {
      const trimmed = b.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h1") ||
        trimmed.startsWith("<h2") ||
        trimmed.startsWith("<h3") ||
        trimmed.startsWith("<div class=\"code-block\"") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr")
      ) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n\n");

  return html;
}

export function MarkdownContent({ content }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const elements = ref.current.querySelectorAll<HTMLElement>(
        "h1, h2, h3, p, .code-block, ul, blockquote, hr"
      );
      gsap.fromTo(
        elements,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.05,
        }
      );
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="blog-content leading-relaxed"
      dangerouslySetInnerHTML={{ __html: markdownToHtml(content) }}
    />
  );
}
