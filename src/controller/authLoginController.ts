import type { Request, Response, RequestHandler } from "express";
import * as z from "zod";
import validateLoginSchema from "../type/validateLoginSchema.ts";
import errorMessageZod from "../type/errorMessageZod/errorMessageZod.ts";
import bcrypt from "bcrypt";
import findUserByEmail from "../repository/findUserByEmail.ts";
import env from "../utils/env.ts";
import jwt from "jsonwebtoken";

const jwtSecret = env.JWT_SECRET;
const login: RequestHandler = async (req, res) => {
  try {
    const validReqLogin = validateLoginSchema.parse(req.body);
    const passwordUser = validReqLogin.password;
    const emailUser = validReqLogin.email;
    //check db
    const validUser = await findUserByEmail(emailUser).select("username email password role");
    if (!validUser) {
      return res.status(404).json({ message: "akun tidak di temukan" });
    }
    const isMatch = await bcrypt.compare(passwordUser, validUser.password);
    if (!isMatch) {
      return res.status(404).json({ message: "akun tidak di temukan" });
    }
    
    // prepare plain payload (exclude password) to avoid circular references
    const userObj = typeof (validUser as any).toObject === "function" ? (validUser as any).toObject() : validUser;
    const payload = {
      id: userObj._id,
      username: userObj.username ?? userObj.name ?? userObj.fullname,
      email: userObj.email,
      role: userObj.role,
    };

    try {
      const createToken = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
      res.status(200).json({
        message: "berhasil login",
        data: createToken,
      });
    } catch (tokenErr) {
      console.error("JWT sign error:", tokenErr);
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        message: `${errorMessageZod(err)}`,
        status: "fail",
      });
    } else {
      res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }
  }
};

export default login;
