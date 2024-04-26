import { Router } from "express";
const router = Router();
import {
  create,
  getAll,
  getProductsOfCart,
  viewCartDetail,
  addProductToCart,
  updateAllProductsOfCart,
  deleteOneProductOfCart,
  deleteAllProductsOfCart,
  purchaseCart,
} from "../../controllers/cart.controller.js";
import { isAuth, isUser } from "../../middleware/auth.js";

router.post("/", create);
router.get("/", getAll);
router.get("/:idCart/products", isAuth, getProductsOfCart);
router.get("/:idCart", isAuth, isUser, viewCartDetail);
router.put("/:idCart/products/:idProduct", isAuth, isUser, addProductToCart);
router.put("/:idCart", isAuth, isUser, updateAllProductsOfCart);
router.delete(
  "/:idCart/products/:idProduct",
  isAuth,
  isUser,
  deleteOneProductOfCart
);
router.delete("/:idCart", isAuth, isUser, deleteAllProductsOfCart);
router.post("/:idCart/purchase", isAuth, isUser, purchaseCart);

export default router;
