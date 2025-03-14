import { Router } from "express";
import { createChat } from "../controllers/ChatController.js";

const chatRouter = Router();

chatRouter.post("/", createChat);

export default chatRouter;
