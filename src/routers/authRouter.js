import express from "express";
import {
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    getLogout,
} from "../controllers/authController";
import { onlyLoggedIn, onlyLoggedOut } from "../middleware";

const authRouter = express.Router();

authRouter.route("/login").all(onlyLoggedOut).get(getLogin).post(postLogin);
authRouter.route("/signup").all(onlyLoggedOut).get(getSignup).post(postSignup);
authRouter.route("/logout").all(onlyLoggedIn).get(getLogout);

export default authRouter;
