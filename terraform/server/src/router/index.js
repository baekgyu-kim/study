const rootRouter = require("express").Router();
const rootController = require("../controllers/rootController");

const { terraformRouter } = require("./terraformRouter");

rootRouter.get("/", rootController.getHome);

rootRouter.use("/terraform", terraformRouter);

module.exports = { rootRouter };
