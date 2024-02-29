export const saveSessionToLocal = (req, res, next) => {
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.loggedInUser = req.session.user;
    next();
};

export const onlyLoggedIn = (req, res, next) => {
    if (req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/login");
    }
};

export const onlyLoggedOut = (req, res, next) => {
    if (!req.session.loggedIn) {
        return next();
    } else {
        return res.redirect("/");
    }
};
