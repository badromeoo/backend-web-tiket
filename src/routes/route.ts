import express from "express";
import dummyController from "../controller/dummyController.ts"
const Router = express.Router();

Router.get("/dummy",dummyController);


export default Router