import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, type: user.type },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 2 }
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
