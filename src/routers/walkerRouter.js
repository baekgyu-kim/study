import express from "express";

import {
    getWalkerProfile,
    getInfo,
    getEdit,
    postEdit,
} from "../controllers/walkerController";

const walkerRouter = express.Router();

walkerRouter.route("/").get(getWalkerProfile);
walkerRouter.route("/info").get(getInfo);
walkerRouter.route("/edit").get(getEdit).post(postEdit);

export default walkerRouter;
