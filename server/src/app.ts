import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { config } from "./config/env.js";
import { healthRouter } from "./routes/health.route.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

// Middlewares
app.use(
  cors({
    origin: config.clientOrigin,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/health", healthRouter);
app.use("/api", apiRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});
