import mongoose from 'mongoose';
import { MONGO_URL } from './config.js';

const connectionString = MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log('DB is connected');
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
    process.exit(1);
  }
};

export default connectDB;
