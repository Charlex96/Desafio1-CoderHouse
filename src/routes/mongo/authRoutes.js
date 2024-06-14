import passport from "passport";
import { Router } from "express";
const router = Router();
import {
  viewLogin,
  viewRegister,
  getCurrentUser,
  logout,
  redirectToHome,
  updateLastConnection,
  requestPasswordReset,
  resetPassword,
} from "../../controllers/auth.controller.js";

router.get("/login", viewLogin);
router.get("/register", viewRegister);

router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/auth/login",
    failureRedirect: "/error",
    failureFlash: true,
  })
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/error",
    failureFlash: true,
  }),
  updateLastConnection,
  (req, res) => {
    res.redirect("/home");
  }
);

router.get("/current", getCurrentUser);

router.get("/logout", logout);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/error" }),
  updateLastConnection,
  redirectToHome
);

router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

export default router;
