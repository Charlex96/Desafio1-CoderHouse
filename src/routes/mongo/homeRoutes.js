import { Router } from "express";
const router = Router();
import { isAuth } from "../../middleware/auth.js";
import { viewHome } from "../../controllers/home.controller.js";

router.get("/", isAuth, viewHome);

export default router;
