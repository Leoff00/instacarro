import mongoose from "mongoose";

export async function connect() {
  const URI = "mongodb://localhost:27017/instacarro";
  const TIMEOUT = 10000;
  try {
    await mongoose.connect(URI, { connectTimeoutMS: TIMEOUT });
    console.log("[CONNECTED WITH DATABASE - MONGODB ONLINE]");
  } catch (err) {
    console.error(err);
  }
}
