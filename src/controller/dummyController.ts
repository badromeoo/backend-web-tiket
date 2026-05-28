import type { Request,Response } from "express";


function Dummy (req:Request,res:Response){
res.status(200).json({message:"memeks",data:"ok"});
}

export default Dummy