import mongoose from "mongoose";
import env from "./env.ts";
import errorMessageZod from "../type/errorMessageZod/errorMessageZod.ts";

const DB_URL = env.DB_URL;
async function conectDB() {
  try {
    await mongoose.connect(DB_URL, { dbName: "Web-Tiket" });
    return "Database Terhubung";
  } catch (err) {
    console.log(" DB error:", errorMessageZod);
    throw err; 
  }
}

export default conectDB;
