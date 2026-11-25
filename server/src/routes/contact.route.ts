import { Router } from "express";
import {
  getAllMessages,
  createMessage,
  markMessageRead,
  deleteMessage,
} from "../controllers/contact.controller.js";

export const contactRouter = Router();

contactRouter.get("/", getAllMessages);
contactRouter.post("/", createMessage);
contactRouter.patch("/:id/read", markMessageRead);
contactRouter.delete("/:id", deleteMessage);
