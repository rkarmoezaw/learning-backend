import { Router } from "express";
import { register, login, getMe } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getMe", getMe);

export default router;
