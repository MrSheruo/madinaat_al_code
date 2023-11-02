import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) return;
  const db = await mongoose.connect(process.env.MONGODB_URI!);

  isConnected = true;
  return db;
};
