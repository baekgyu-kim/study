import express from "express";

import {
    getDog,
    postDog,
    getDogAdd,
    postDogAdd,
    postDogEdit,
} from "../controllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.route("/dog/info").get(getDog).post(postDog);
ownerRouter.route("/dog/add").get(getDogAdd).post(postDogAdd);
ownerRouter.route("/dog/edit").post(postDogEdit);

export default ownerRouter;
