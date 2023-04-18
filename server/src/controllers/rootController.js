const path = require("path");

const rootController = {
    getHome: (req, res) => {
        res.sendFile(path.join(__dirname, "../view/home.html"));
    },
};

module.exports = rootController;
