import { Router } from "express";
const router = Router();
import { viewChat } from "../../controllers/chat.controller.js";
import { isUser } from "../../middleware/auth.js";

router.get("/", isUser, viewChat);

export default router;
