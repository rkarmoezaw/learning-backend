import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log("=> Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB is connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw new Error("Could not connect to the database");
  }
}

export default connectDB;
