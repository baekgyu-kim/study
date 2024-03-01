import express from "express";

import {
    getSugang,
    postSugang,
    getAllLectures,
    getOneLecture,
    getUpdate,
} from "../controllers/stuController";
import { onlyIsLoggedIn } from "../middleware";

const stuRouter = express.Router();

stuRouter.route("/sugang").all(onlyIsLoggedIn).get(getSugang).post(postSugang);
stuRouter.route("/lecture").all(onlyIsLoggedIn).get(getAllLectures);
stuRouter.route("/lecture/:id").all(onlyIsLoggedIn).get(getOneLecture);
stuRouter.route("/update").all(onlyIsLoggedIn).get(getUpdate);

export default stuRouter;
