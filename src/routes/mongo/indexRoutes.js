import { Router } from "express";
import authRoutes from "./authRoutes.js";
import homeRoutes from "./homeRoutes.js";
import productRoutes from "./productRoutes.js";
import cartRoutes from "./cartRoutes.js";
import chatRoutes from "./chatRoutes.js";
import loggerTestsRouter from "./loggerTest.router.js";
import { requestPasswordReset, resetPassword } from "../../controllers/auth.controller.js";

const router = Router();

router.use("/home", homeRoutes);
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);
router.use("/chat", chatRoutes);
router.use("/auth", authRoutes);
router.use('/logger', loggerTestsRouter);

// Rutas para la recuperación de contraseña
router.post('/auth/request-password-reset', requestPasswordReset);
router.post('/auth/reset-password/:token', resetPassword);

router.use("/error", (req, res) => {
  const { errorMessage } = req.flash();
  res.render("error", { errorMessage });
});

router.use("/", (req, res) => {
  res.redirect("/home");
});

router.use("*", (req, res, next) => {
  res.render("notfound");
});

export default router;
