import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";

export const profileRouter = Router();

profileRouter.get("/", getProfile);
profileRouter.put("/", updateProfile);
