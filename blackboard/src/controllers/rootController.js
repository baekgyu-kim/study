export const getHome = async (req, res) => {
    try {
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
    } catch (errorMessage) {
        return res.status(400).render("home", {
            pageTitle: "홈",
            errorMessage,
        });
    }
};
