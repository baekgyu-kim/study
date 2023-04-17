const path = require("path");

const rootController = {
    getHome: (req, res) => {
        res.send("Home");
    },
};

module.exports = rootController;
