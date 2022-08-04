import express from "express";

import {
    getOwnerProfile,
    getDog,
    postDog,
    getDogAdd,
    postDogAdd,
    postDogEdit,
} from "../controllers/ownerController";

const ownerRouter = express.Router();

ownerRouter.route("/").get(getOwnerProfile);
ownerRouter.route("/dog").get(getDog).post(postDog);
ownerRouter.route("/dog/add").get(getDogAdd).post(postDogAdd);
ownerRouter.route("/dog/edit").post(postDogEdit);

export default ownerRouter;
