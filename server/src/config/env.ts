import "dotenv/config";

export const config = {
  port: process.env.PORT || 4000,
  clientOrigin: process.env.CLIENT_ORIGIN?.split(",") || "*",
  isVercel: Boolean(process.env.VERCEL),
  nodeEnv: process.env.NODE_ENV || "development",
};
