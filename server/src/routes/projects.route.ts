import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projects.controller.js";

export const projectsRouter = Router();

projectsRouter.get("/", getAllProjects);
projectsRouter.get("/:id", getProjectById);
projectsRouter.post("/", createProject);
projectsRouter.put("/:id", updateProject);
projectsRouter.delete("/:id", deleteProject);
