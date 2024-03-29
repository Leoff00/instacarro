import mongoose from "mongoose";

export async function connect() {
  const URI = "mongodb://root:password@mongo:27017/instacarro?authSource=admin";
  const TIMEOUT = 10000;
  try {
    await mongoose.connect(URI, { connectTimeoutMS: TIMEOUT });
    console.log("[CONNECTED WITH DATABASE - MONGODB ONLINE]");
  } catch (err) {
    console.error(err);
  }
}
