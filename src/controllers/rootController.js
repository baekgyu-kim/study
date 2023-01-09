import User from "../models/User";
import bcrypt from "bcrypt";

export const getHome = async (req, res) => {
    if (req.session.user === undefined) {
        return res.render("home", {
            pageTitle: "DogWalk",
        });
    } else {
        const loggedInUser_id = req.session.user._id;
        const loggedInUser = await User.findById(loggedInUser_id);
        if (loggedInUser.userType === "walker") {
            if (loggedInUser.walkerIntro) {
                return res.render("home", {
                    pageTitle: "DogWalk",
                });
            } else {
                return res.render("home", {
                    pageTitle: "DogWalk",
                    infoErrorMessage:
                        "선생님 소개를 등록한 후에 서비스를 이용하실 수 있습니다.",
                });
            }
        } else {
            if (loggedInUser.ownerDogArray.length === 0) {
                return res.render("home", {
                    pageTitle: "DogWalk",
                    infoErrorMessage:
                        "강아지를 등록한 후에 서비스를 이용하실 수 있습니다.",
                });
            } else {
                return res.render("home", { pageTitle: "DogWalk" });
            }
        }
    }
};

export const getSignupType = (req, res) => {
    return res.render("signupType", { pageTitle: "회원가입" });
};

export const getSignupOwner = (req, res) => {
    return res.render("signupOwner", { pageTitle: "회원가입" });
};

export const postSignupOwner = async (req, res) => {
    const { email, id, pw, confirmpw, location } = req.body;
    const userType = "owner";
    if (pw !== confirmpw) {
        return res.status(400).render("signupOwner", {
            pageTitle: "회원가입",
            errorMessage:
                "입력하신 비밀번호와 확인 비밀번호가 같지 않습니다. 다시 시도해주세요.",
        });
    }

    const exists = await User.exists({ $or: [{ id }, { email }] });
    if (exists) {
        return res.status(400).render("signupOwner", {
            pageTitle: "회원가입",
            errorMessage:
                "같은 이메일 또는 아이디를 가진 계정이 이미 존재합니다. 다시 시도해주세요.",
        });
    }

    try {
        await User.create({
            userType,
            email,
            id,
            pw,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("signupOwner", {
            pageTitle: "회원가입",
            errorMessage: "에러가 발생했습니다. 잠시 후 다시 시도해주세요",
        });
    }
};

export const getSignupWalker = (req, res) => {
    return res.render("signupWalker", { pageTitle: "회원가입" });
};

export const postSignupWalker = async (req, res) => {
    const { email, id, pw, confirmpw, location } = req.body;
    const userType = "walker";
    if (pw !== confirmpw) {
        return res.status(400).render("signupWalke", {
            pageTitle: "회원가입",
            errorMessage:
                "입력하신 비밀번호와 확인 비밀번호가 같지 않습니다. 다시 시도해주세요.",
        });
    }

    const exists = await User.exists({ $or: [{ id }, { email }] });
    if (exists) {
        return res.status(400).render("signupWalke", {
            pageTitle: "회원가입",
            errorMessage:
                "같은 이메일 또는 아이디를 가진 계정이 이미 존재합니다. 다시 시도해주세요.",
        });
    }

    try {
        await User.create({
            userType,
            email,
            id,
            pw,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("signupWalke", {
            pageTitle: "회원가입",
            errorMessage: "에러가 발생했습니다. 잠시 후 다시 시도해주세요",
        });
    }
};

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "로그인" });
};

export const postLogin = async (req, res) => {
    const { id, pw } = req.body;
    const user = await User.findOne({ id });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle: "로그인",
            errorMessage: "계정이 존재하지 않습니다. 다시 시도해주세요.",
        });
    }
    const ok = await bcrypt.compare(pw, user.pw);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle: "로그인",
            errorMessage: "비밀번호가 올바르지 않습니다. 다시 시도해주세요.",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const getLogout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getAccountInfoChange = (req, res) => {
    const loggedInUser = req.session.user;
    return res.render("editProfile", {
        pageTitle: "회원정보 수정",
        loggedInUser,
    });
};

export const postAccountInfoChange = async (req, res) => {
    const loggedInUser = req.session.user;
    const user = await User.findById(loggedInUser._id);
    const { nowPW, newPW, newConfirmPW, newLocation } = req.body;
    const nowPWCorrect = await bcrypt.compare(nowPW, user.pw);
    if (nowPWCorrect === false) {
        return res.status(400).render("editProfile", {
            pageTitle: "회원정보 수정",
            errorMessage: "현재 비밀번호를 잘못 입력하셨습니다.",
        });
    } else {
        if (newPW !== newConfirmPW) {
            return res.status(400).render("editProfile", {
                pageTitle: "회원정보 수정",
                errorMessage:
                    "수정할 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
            });
        } else {
            user.pw = newPW;
            user.location = newLocation;
            await user.save();
            return res.redirect("/logout");
        }
    }
};
