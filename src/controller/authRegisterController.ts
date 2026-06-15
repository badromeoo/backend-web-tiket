import type { Request, Response } from "express";
import * as z from "zod";
import validateRegisterSchema from "../type/validateRegisterSchema.ts";
import errorMessageZod from "../type/errorMessageZod/errorMessageZod.ts";
import userModel from "../model/user.model.ts";
import bcrypt from "bcrypt";
import findUserByEmail from "../repository/findUserByEmail.ts";

const register = async (req: Request, res: Response) => {
  try {
    const validReqRegister = validateRegisterSchema.parse(req.body);
    //cek ke db
    const existingUser = await findUserByEmail(validReqRegister.email);
    if (existingUser) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }
    const saltRound = 10;
    const encriptPassword = await bcrypt.hash(validReqRegister.password, saltRound);
    const validReqData = {
      ...validReqRegister,
      password: encriptPassword,
    };
    const result = await userModel.create({
      ...validReqData,
    });

    res.status(200).json({
      message: "berhasil register",
      data: `${result.id}, ${result.email}`,
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
