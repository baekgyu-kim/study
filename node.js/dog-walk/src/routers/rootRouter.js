import express from "express";
import { getHome } from "../controllers/rootController";
import { onlyLoggedIn, onlyLoggedOut } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);

export default rootRouter;
