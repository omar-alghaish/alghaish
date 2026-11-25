import { Router } from "express";
import { profileRouter } from "./profile.route.js";
import { projectsRouter } from "./projects.route.js";
import { skillsRouter } from "./skills.route.js";
import { coursesRouter } from "./courses.route.js";
import { contactRouter } from "./contact.route.js";
import { statsRouter } from "./stats.route.js";

export const apiRouter = Router();

apiRouter.use("/profile", profileRouter);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/skills", skillsRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.use("/contact", contactRouter);
apiRouter.use("/stats", statsRouter);
