import { Router } from "express";
import { getStats } from "../controllers/stats.controller.js";

export const statsRouter = Router();

statsRouter.get("/", getStats);
