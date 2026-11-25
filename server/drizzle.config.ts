import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Use direct connection for migrations (avoids pooler transaction issues)
    url: process.env.DATABASE_DIRECT_URL || process.env.DATABASE_URL || "",
  },
  verbose: true,
  strict: true,
});
