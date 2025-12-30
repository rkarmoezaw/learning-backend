import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouter from "./routes/user.route.js";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);
// app.use("/api/v1/users", postRouter);

async function startServer() {
  try {
    await connectDB();

    app.listen(process.env.PORT || 3000, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log("Failed to start server:", error);
  }
}

startServer();
