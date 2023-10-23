import express from "express";
import appController from "../controller/appController.js";
const appRoutes = express.Router();

appRoutes.get("/create", appController.generateData);
appRoutes.get("/data", appController.getData);

export default appRoutes;
