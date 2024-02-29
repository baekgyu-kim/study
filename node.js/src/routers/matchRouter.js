import express from "express";

import { getMatch } from "../controllers/matchController";

const matchRouter = express.Router();

matchRouter.route("/").get(getMatch);

export default matchRouter;
