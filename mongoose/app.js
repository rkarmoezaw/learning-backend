import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/users", userRouter);

app.listen(process.env.PORT || 1500, () => {
  console.log(`Server is running on port ${process.env.PORT || 1500}`);
});
