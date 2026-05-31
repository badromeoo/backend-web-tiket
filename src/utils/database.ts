import mongoose from "mongoose";
import env from "./env.ts";

const DB_URL = env.DB_URL;

// console.log(DB_URL);

async function conectDB() {
  try {
    await mongoose.connect(DB_URL, { dbName: "Web-Tiket" });
    console.log("✅ Database Terhubung");
    return "Database Terhubung";

  } catch (err) {
    console.log("❌ DB error:", err);
    throw err; // penting biar error tidak diam
  }}

export default conectDB;
