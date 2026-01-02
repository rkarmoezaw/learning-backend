import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.REFRESH_SECRET, { expiresIn: "7d" });

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshTokens.push(refreshToken);
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, user: { name: user.name, email: user.email } });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  const user = await User.findOne({ refreshTokens: token });
  if (!user) return res.sendStatus(403);

  jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const newAccessToken = generateAccessToken(user._id);
    res.json({ accessToken: newAccessToken });
  });
};

export const logout = async (req, res) => {
  const token = req.cookies.refreshToken;
  await User.findOneAndUpdate(
    { refreshTokens: token },
    { $pull: { refreshTokens: token } }
  );
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};
