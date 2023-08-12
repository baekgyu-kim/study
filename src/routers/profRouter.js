import express from "express";
import {
    getAllLectures,
    getNewLecture,
    postNewLecture,
    getOneLecture,
    getNewNotice,
    postOneNotice,
    getAllStudents,
    cancelOneStudent,
} from "../controllers/profController";
import { onlyIsLoggedIn } from "../middleware";

const profRouter = express.Router();

profRouter.route("/lecture").all(onlyIsLoggedIn).get(getAllLectures);
profRouter
    .route("/lecture/newLecture")
    .all(onlyIsLoggedIn)
    .get(getNewLecture)
    .post(postNewLecture);
profRouter
    .route("/lecture/newNotice/:id")
    .all(onlyIsLoggedIn)
    .get(getNewNotice)
    .post(postOneNotice);
profRouter
    .route("/lecture/:id")
    .all(onlyIsLoggedIn)
    .get(getOneLecture)
    .post(postOneNotice);
profRouter
    .route("/student")
    .all(onlyIsLoggedIn)
    .get(getAllStudents)
    .patch(cancelOneStudent);

export default profRouter;
