export const saveSessionToLocal = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.isLoggedIn);
    res.locals.loggedInUser = req.session.loggedInUSer;
    next();
};

export const onlyLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const onlyLoggedOut = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};
