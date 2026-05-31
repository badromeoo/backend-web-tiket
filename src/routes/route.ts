import express from "express";
import authRegisterController from "../controller/authRegisterController.ts"
const Router = express.Router();

Router.post("/auth/register", authRegisterController)


export default Router