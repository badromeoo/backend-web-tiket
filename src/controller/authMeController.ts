import { Request, Response } from "express"
import { AuthenticatedRequest } from "../type/request/authRequest.ts"
import findUserByUserId from "../repository/findUserByUserId.ts";

const authMeController = async (req: AuthenticatedRequest,res:Response)=>{
    const user = await findUserByUserId(req.body.userId).select("-password");
}

export default authMeController