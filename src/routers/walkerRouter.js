import express from "express";

import {
    getWalkerProfile,
    getInfo,
    postInfo,
    getEdit,
    postEdit,
} from "../controllers/walkerController";

const walkerRouter = express.Router();

walkerRouter.route("/").get(getWalkerProfile);
walkerRouter.route("/info").get(getInfo).post(postInfo);
walkerRouter.route("/edit").get(getEdit).post(postEdit);

export default walkerRouter;
