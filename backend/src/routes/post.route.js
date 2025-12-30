import { Router } from "express";
import { createPost, getPosts } from "../controllers/posts.controller.js";
export const router = Router();

router.post("/createPost", createPost);
router.get("/getAllPosts", getPosts);

export default router;
