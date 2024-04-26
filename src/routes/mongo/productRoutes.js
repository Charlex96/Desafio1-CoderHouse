import { Router } from "express";
import {
  getAll,
  create,
  getOne,
  update,
  deleteOne,
} from "../../controllers/product.controller.js";
import { validateRequest } from "../../middleware/validators.js";
import { isAuth, isAdmin } from "../../middleware/auth.js";
const router = Router();

/**Rutas */
router.get("/", isAuth, getAll);
router.get("/:id", isAuth, getOne);
router.post("/", isAuth, isAdmin, validateRequest, create);
router.put("/:id", isAuth, isAdmin, validateRequest, update);
router.delete("/:id", isAuth, isAdmin, deleteOne);

export default router;
