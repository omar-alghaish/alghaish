import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const finalConfig = withNextIntl(nextConfig);

// Next.js 16 moved Turbopack config to top-level `turbopack`,
// while next-intl still attaches to `experimental.turbo`.
if (finalConfig.experimental && "turbo" in finalConfig.experimental) {
  delete (finalConfig.experimental as Record<string, unknown>).turbo;
}

export default finalConfig;
