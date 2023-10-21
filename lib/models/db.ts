import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) return;
  const db = await mongoose.connect(process.env.MONGODB_URI!, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  return db;
};
