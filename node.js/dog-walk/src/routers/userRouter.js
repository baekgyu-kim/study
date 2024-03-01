import express from "express";
import {
    getLogin,
    postLogin,
    getSignupType,
    getSignupOwner,
    postSignupOwner,
    getSignupWalker,
    postSignupWalker,
    getLogout,
    getAccountInfoChange,
    postAccountInfoChange,
    getGithubLogin,
    getGithubCallback,
    postGithubUserType,
} from "../controllers/userController";
import { onlyLoggedIn, onlyLoggedOut } from "../middlewares";

const userRouter = express.Router();

userRouter.route("/signupType").all(onlyLoggedOut).get(getSignupType);
userRouter
    .route("/signupOwner")
    .all(onlyLoggedOut)
    .get(getSignupOwner)
    .post(postSignupOwner);
userRouter
    .route("/signupWalker")
    .all(onlyLoggedOut)
    .get(getSignupWalker)
    .post(postSignupWalker);
userRouter.route("/login").all(onlyLoggedOut).get(getLogin).post(postLogin);
userRouter.route("/logout").get(onlyLoggedIn, getLogout);
userRouter
    .route("/accountInfo")
    .get(getAccountInfoChange)
    .post(postAccountInfoChange);

userRouter.route("/github/login").all(onlyLoggedOut).get(getGithubLogin);
userRouter.route("/github/callback").all(onlyLoggedOut).get(getGithubCallback);
userRouter.route("/github/userType").post(postGithubUserType);
export default userRouter;
