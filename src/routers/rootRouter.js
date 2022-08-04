import express from "express";
import {
    getHome,
    getSignup,
    postSignup,
    getLogin,
    postLogin,
    getLogout,
    getAccountInfoChange,
    postAccountInfoChange,
} from "../controllers/rootController";
import { onlyLoggedIn, onlyLoggedOut } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);
rootRouter.route("/signup").all(onlyLoggedOut).get(getSignup).post(postSignup);
rootRouter.route("/login").all(onlyLoggedOut).get(getLogin).post(postLogin);
rootRouter.route("/logout").get(onlyLoggedIn, getLogout);
rootRouter
    .route("/account")
    .get(getAccountInfoChange)
    .post(postAccountInfoChange);

export default rootRouter;
