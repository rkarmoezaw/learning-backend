import { Post } from "../models/posts.model.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newPost = new Post({ title, description });
    await newPost.save();
    sendSuccess(res, "Post created successfully.", newPost, 201);
  } catch (error) {
    sendError(res, `Internal server error: ${error.message}`, 500);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    sendSuccess(res, "Posts fetched successfully.", posts, 200);
  } catch (error) {
    sendError(res, `Internal server error: ${error.message}`, 500);
  }
};

export { createPost, getPosts };
