import * as z from "zod";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});
const envSchema = z.object({
  DB_URL: z.string().min(1, "DB_URL wajib diisi"),
});

const env = envSchema.parse(process.env);


export default env;
