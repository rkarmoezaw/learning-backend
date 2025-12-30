import { User } from "../models/users.model.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return sendError(res, "All fields are required.");
    }

    if (password.length < 8) {
      return sendError(
        res,
        "Password must be at least 8 characters long.",
        400
      );
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return sendError(res, "Username or email already exists.", 409);
    }

    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      loggedIn: false,
    });

    return sendSuccess(
      res,
      "User registered successfully.",
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      201
    );
  } catch (error) {
    sendError(res, `Internal server error: ${error.message}}`, 500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return sendError(res, "Username and password are required.");
    }

    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!user) {
      return sendError(res, "User not found.", 404);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return sendError(res, "Invalid credentials.", 401);
    }

    return sendSuccess(res, "Logged in successfully", {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    sendError(res, `Internal server error: ${error.message}`, 500);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return sendError(res, "Username is required.");
    }

    const user = await User.findOne({ username });

    if (!user) {
      return sendError(res, "User not found.", 404);
    }

    user.loggedIn = false;
    await user.save();

    return sendSuccess(res, "Logged out successfully");
  } catch (error) {
    sendError(res, `Internal server error: ${error.message}`, 500);
  }
};

export { registerUser, loginUser, logoutUser };
