import express from "express";
import {
    getAllLectures,
    getNewLecture,
    getOneLecture,
    getAllStudents,
} from "../controllers/profController";

const profRouter = express.Router();

profRouter.route("/lecture").get(getAllLectures);
profRouter.route("/lecture/newLecture").get(getNewLecture);
profRouter.route("/lecture/:id").get(getOneLecture);
profRouter.route("/students").get(getAllStudents);

export default profRouter;
