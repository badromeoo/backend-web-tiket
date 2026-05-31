import type { Request, Response } from "express";
import * as z from "zod";
import validateRegisterSchema from "../type/validateRegisterSchema.ts";
import errorMessageZod from "../type/errorMessageZod/errorMessageZod.ts";


const register = async (req: Request, res: Response) => {
  try {
    const validReq = validateRegisterSchema.parse(req.body);
    //cek ke db
    
    // const userExist = await 
    //test db
    
    res.status(200).json({
      message: "berhasil register",
      data: `${(validReq.username, validReq.email)}`,
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
