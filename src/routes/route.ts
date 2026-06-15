import express from "express";
import authRegisterController from "../controller/authRegisterController.ts"
import authLoginController from "../controller/authLoginController.ts"
import authMeController from "../controller/authMeController.ts"
import authMiddleware from "../middleware/authMiddleware.ts"
const Router = express.Router();

Router.post("/auth/register", authRegisterController)
Router.post("/auth/login",authLoginController)
Router.get("/auth/me",authMiddleware,authMeController)


export default Router