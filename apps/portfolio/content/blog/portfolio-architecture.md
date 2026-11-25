---
title: "My Next.js Portfolio — Architecture Decisions"
titleAr: "معمارية محفظة Next.js الخاصة بي"
excerpt: "The tech stack, folder structure, and key decisions behind this portfolio site."
excerptAr: "المكدس التقني وهيكل المجلدات والقرارات الرئيسية وراء موقع المحفظة."
date: "2026-11-01"
tags: ["Next.js", "Architecture", "i18n"]
---

## Why Next.js 16?

Next.js 16 ships Turbopack as stable and introduces Partial Prerendering (PPR), which lets you prerender the shell of a page and stream dynamic content — perfect for a portfolio that fetches live GitHub data.

## Key Decisions

### i18n with next-intl

I chose **next-intl** because it integrates deeply with the App Router. The routing is handled via a middleware that redirects `/` → `/en`, and translations live in `messages/en.json` and `messages/ar.json`.

### Live GitHub Data

Instead of hardcoding projects, the Projects and Skills pages hit the GitHub API with `fetch(..., { next: { revalidate: 3600 } })`. Every hour the data refreshes automatically — no CMS, no database, no manual updates.

### Monorepo with pnpm workspaces

The site lives in a monorepo alongside a dashboard and a backend server. `pnpm workspaces` keeps dependency hoisting clean and lets me share types between packages.

## Folder Structure

```
apps/portfolio/
├── content/blog/      ← Markdown posts (this file!)
├── src/app/[locale]/  ← Locale-prefixed pages
├── src/components/    ← Shared UI components
├── src/lib/           ← GitHub API, blog parser
└── messages/          ← en.json, ar.json
```

## What's Next?

- Add a search bar to the blog
- Dark mode per-system preference (already done with next-themes)
- Contact form connected to the Express backend
