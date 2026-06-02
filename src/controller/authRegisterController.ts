import type { Request, Response } from "express";
import * as z from "zod";
import validateRegisterSchema from "../type/validateRegisterSchema.ts";
import errorMessageZod from "../type/errorMessageZod/errorMessageZod.ts";
import userModel from "../model/user.model.ts";

const register = async (req: Request, res: Response) => {
  try {
    const validReq = validateRegisterSchema.parse(req.body);
    //cek ke db
    const existingUser = await userModel.findOne({ email: validReq.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }
    const result = await userModel.create({
      ...validReq,
    });

    res.status(200).json({
      message: "berhasil register",
      data: `${result.email}`,
    });
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

export default register;
