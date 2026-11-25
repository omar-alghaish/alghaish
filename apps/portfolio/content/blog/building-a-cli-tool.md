---
title: "Building a CLI Tool with TypeScript"
titleAr: "بناء أداة CLI باستخدام TypeScript"
excerpt: "How I built quickstart — a CLI tool that bootstraps projects from custom templates in seconds."
excerptAr: "كيف قمت ببناء quickstart — أداة CLI تُنشئ مشاريع من قوالب مخصصة في ثوانٍ."
date: "2026-10-15"
tags: ["TypeScript", "CLI", "Node.js"]
---

## Overview

Building CLI tools in TypeScript gives you the power of type safety combined with the flexibility of Node.js. In this post, I walk through how I built **quickstart** — a tool that lets you initialize new projects from custom templates.

## Why TypeScript for CLIs?

TypeScript catches bugs at compile time, which is especially important for CLI tools where runtime errors frustrate users. With `ts-node` or `tsup`, you can ship clean compiled JavaScript while developing in TypeScript.

## Key Libraries

- **commander** — argument parsing and subcommands
- **inquirer** — interactive prompts
- **chalk** — colourful terminal output
- **fs-extra** — file system utilities

## The Core Loop

```ts
async function init(templateName: string) {
  const template = await resolveTemplate(templateName);
  await copyFiles(template.path, process.cwd());
  await runPostHooks(template.hooks);
  console.log("✓ Project ready!");
}
```

## Lessons Learned

1. Always validate user input early and give helpful error messages.
2. Use `process.exit(1)` on errors so CI pipelines catch failures.
3. Publish to npm with a `bin` field in `package.json` for a global command.

You can find the full source at [github.com/omar-alghaish/quickstart](https://github.com/omar-alghaish/quickstart).
