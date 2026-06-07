import express from "express";
import authRegisterController from "../controller/authRegisterController.ts"
import authLoginController from "../controller/authLoginController.ts"
const Router = express.Router();

Router.post("/auth/register", authRegisterController)
Router.post("/auth/login",authLoginController)


export default Router