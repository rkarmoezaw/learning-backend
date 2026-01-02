import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";

export const isAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "TOKEN_EXPIRED" });
  }
};

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many attempts. Try again in 15 minutes." },
});
