import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

const loginUserToSession = (req, user) => {
    req.session.loggedIn = true;
    req.session.user = user;
};

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "로그인", userType: "owner" });
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
    loginUserToSession(req, user);
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
        const user = await User.create({
            userType,
            email,
            id,
            pw,
            location,
            socialLogin: false,
        });
        loginUserToSession(req, user);
        return res.redirect("/");
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
        return res.status(400).render("signupWalker", {
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
        const user = await User.create({
            userType,
            email,
            id,
            pw,
            location,
            socialLogin: false,
        });
        loginUserToSession(req, user);
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("signupWalke", {
            pageTitle: "회원가입",
            errorMessage: "에러가 발생했습니다. 잠시 후 다시 시도해주세요",
        });
    }
};

export const getLogout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

export const getGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};
export const getGithubCallback = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const authData = await fetch(finalUrl, {
        method: "Post",
        headers: { Accept: "application/json" },
    });
    const authDataJson = await authData.json();
    const apiBaseUrl = "https://api.github.com";
    if ("access_token" in authDataJson) {
        const { access_token } = authDataJson;
        const userData = await fetch(`${apiBaseUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        });
        const userDataJson = await userData.json();
        const emailData = await fetch(`${apiBaseUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        });
        const emailDataJson = await emailData.json();
        const emailObj = emailDataJson.find(
            (email) => email.primary === true && email.verified === true
        );
        if (!emailObj) {
            return res.redirect("/user/login");
        }
        const { name, avata_url } = userDataJson;
        const { email } = emailObj;
        const user = await User.findOne({
            id: name,
            email: email,
            socialLogin: true,
            socialLoginAccount: "github",
        });
        if (user) {
            loginUserToSession(req, user);
            return res.redirect("/");
        } else {
            const exists = await User.exists({
                $or: [{ name }, { email }],
            });
            if (exists) {
                return res.render("login", {
                    pageTitle: "로그인",
                    errorMessage:
                        "동일한 이메일 또는 아이디로 가입된 계정이 이미 존재합니다.",
                });
            } else {
                return res.render("githubSignup", {
                    pageTitle: "회원가입",
                    name,
                    avata_url,
                    email,
                });
            }
        }
    } else {
        return res.redirect("/user/login");
    }
};

export const postGithubUserType = async (req, res) => {
    const { userType, location, name, avata_url, email } = req.body;
    try {
        const user = await User.create({
            userType,
            email,
            id: name,
            avatarUrl: avata_url,
            location,
            socialLogin: true,
            socialLoginAccount: "github",
        });
        loginUserToSession(req, user);
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("login", {
            pageTitle: "로그인",
            errorMessage: "에러가 발생했습니다. 잠시 후 다시 시도해주세요",
        });
    }
};
