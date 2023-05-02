export const getHome = async (req, res) => {
    const user = req.session.loggedInUser;
    if (user) {
        return res.render("home", {
            pageTitle: "홈",
            loggedInUser: user,
        });
    } else {
        return res.render("home", {
            pageTitle: "홈",
            loggedInUser: null,
        });
    }
};
