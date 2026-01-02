import express from "express";
import { login, refreshToken, logout } from "../controllers/auth.controller.js";
import { loginLimiter, isAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginLimiter, login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

// Example protected route
router.get("/me", isAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
