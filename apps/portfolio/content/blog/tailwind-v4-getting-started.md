---
title: "Getting Started with Tailwind CSS v4"
titleAr: "البدء مع Tailwind CSS الإصدار الرابع"
excerpt: "What changed in Tailwind v4 and how to migrate your project — including the new @theme directive."
excerptAr: "ما الذي تغيّر في Tailwind v4 وكيفية ترحيل مشروعك — بما في ذلك توجيه @theme الجديد."
date: "2026-09-20"
tags: ["Tailwind CSS", "CSS", "Frontend"]
---

## What is Tailwind CSS v4?

Tailwind CSS v4 rewrites the engine in Rust (via Lightning CSS) for near-instant builds, and replaces the `tailwind.config.js` file with a pure CSS configuration system using the `@theme` directive.

## @theme — Configuration in CSS

Instead of:

```js
// tailwind.config.js
theme: { colors: { brand: '#6366f1' } }
```

You now write:

```css
@theme {
  --color-brand: #6366f1;
}
```

This is a huge win — no JavaScript config, tokens live in your CSS where they belong.

## @custom-variant

Tailwind v4 also introduces `@custom-variant` for defining your own variant modifiers:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

This is exactly how dark mode works on this portfolio — no `darkMode: 'class'` config needed.

## Migration Tips

1. Remove `tailwind.config.js` — move all theme customisation to `globals.css`.
2. Replace `@tailwind base/components/utilities` with a single `@import "tailwindcss"`.
3. Update any JIT-only features that have changed syntax.

Tailwind v4 is worth the migration — the DX is significantly better.
