import { sendSuccess, sendError } from "../utils/responseHandler.js";
import User from "../models/user.model.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
  let name = req.body.name.toLowerCase();
  let phone = req.body.phone;
  let password = req.body.password;
  try {
    if (!name || !phone || !password) {
      return sendError(res, "Name, phone, and password are required", 400);
    }

    if (password.length < 8) {
      return sendError(
        res,
        "Password must be at least 8 characters long.",
        400
      );
    }

    const existingUser = await User.findOne({ $or: [{ name }, { phone }] });
    if (existingUser) {
      return sendError(res, "Username or phone number already exists.", 409);
    }

    const newUser = await User.create({
      name,
      phone,
      password,
    });

    sendSuccess(res, newUser, "User registered successfully", 201);
  } catch (error) {
    sendError(res, `Internal server error: ${error.message}`, 500);
  }
};

export const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      return sendError(res, "Invalid credentials", 401);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, "Invalid credentials", 401);
    }

    const token = generateToken(user);
    user.token = token;
    await user.save();

    sendSuccess(res, user, "Login successful", 200);
  } catch (error) {
    sendError(res, `Internal server error: ${error.message}`, 500);
  }
};

export const getMe = async (req, res) => {
  sendSuccess(res, "User data fetched successfully", 200);
};
