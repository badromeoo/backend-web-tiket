import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import env from "../utils/env.ts";
import {UserAuthPayload} from "../type/typeUser/typeUserAuthPayload.ts"


const jwtSecret = env.JWT_SECRET;

const validToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader !== undefined) {
    const token = authHeader.split(" ")[1];
    if (token !== undefined && token !== "") {
      try {
        const verify = jwt.verify(token!, jwtSecret) as UserAuthPayload;
        const reqUser = verify;
        return next();
      } catch (err) {
        return res.status(403).json({ message: "token tidak di temukan " });
      }
    }
  } else {
    res.status(401).json({
      message: "token tidak di temukan",
    });
  }
};

export default validToken;