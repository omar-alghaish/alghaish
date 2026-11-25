import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "alghaish-server",
    timestamp: new Date().toISOString(),
  });
});
