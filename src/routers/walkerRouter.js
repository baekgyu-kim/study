import express from "express";

import {
    getWalkerProfile,
    getInfo,
    postInfo,
} from "../controllers/walkerController";

const walkerRouter = express.Router();

walkerRouter.route("/").get(getWalkerProfile);
walkerRouter.route("/info").get(getInfo).post(postInfo);

export default walkerRouter;
