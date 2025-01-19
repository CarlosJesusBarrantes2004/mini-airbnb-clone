import mongoose from "mongoose";
import { MONGO_URL } from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("DB is connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

export default connectDB;
