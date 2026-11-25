import { Router } from "express";
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skills.controller.js";

export const skillsRouter = Router();

skillsRouter.get("/", getAllSkills);
skillsRouter.post("/", createSkill);
skillsRouter.put("/:id", updateSkill);
skillsRouter.delete("/:id", deleteSkill);
