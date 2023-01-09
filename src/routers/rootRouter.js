import express from "express";
import {
    getHome,
    getSignupType,
    getSignupOwner,
    postSignupOwner,
    getSignupWalker,
    postSignupWalker,
    getLogin,
    postLogin,
    getLogout,
    getAccountInfoChange,
    postAccountInfoChange,
} from "../controllers/rootController";
import { onlyLoggedIn, onlyLoggedOut } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/").get(getHome);
rootRouter.route("/signupType").get(getSignupType);
rootRouter
    .route("/signupOwner")
    .all(onlyLoggedOut)
    .get(getSignupOwner)
    .post(postSignupOwner);
rootRouter
    .route("/signupWalker")
    .all(onlyLoggedOut)
    .get(getSignupWalker)
    .post(postSignupWalker);
rootRouter.route("/login").all(onlyLoggedOut).get(getLogin).post(postLogin);
rootRouter.route("/logout").get(onlyLoggedIn, getLogout);
rootRouter
    .route("/accountInfo")
    .get(getAccountInfoChange)
    .post(postAccountInfoChange);

export default rootRouter;
