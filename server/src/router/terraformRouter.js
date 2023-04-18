const terraformRouter = require("express").Router();
const { getTerraformApply } = require("../controllers/terraformController");

terraformRouter.route("/apply").get(getTerraformApply);

module.exports = { terraformRouter };
