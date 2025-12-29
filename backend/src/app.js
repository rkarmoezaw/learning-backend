import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

const app = express();

dotenv.config({
  path: "./.env",
});

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
