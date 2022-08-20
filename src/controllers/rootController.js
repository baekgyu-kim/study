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
        if (loggedInUser.userType === "산책 선생님") {
            if (loggedInUser.walkerDogSize && loggedInUser.walkerInro) {
                return res.render("home", {
                    pageTitle: "DogWalk",
                });
            } else {
                return res.render("home", {
                    pageTitle: "DogWalk",
                    infoErrorMessage:
                        "선생님 정보를 등록한 후에 서비스를 이용하실 수 있습니다.",
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

export const getSignup = (req, res) => {
    return res.render("signup", { pageTitle: "회원가입" });
};

export const postSignup = async (req, res) => {
    let userType;
    if (req.body.userType === "보호자 계정 생성") {
        userType = "보호자";
    } else {
        userType = "산책 선생님";
    }

    const { email, id, pw, confirmpw, location } = req.body;

    if (pw !== confirmpw) {
        return res.status(400).render("signup", {
            pageTitle: "회원가입",
            errorMessage:
                "입력하신 비밀번호와 확인 비밀번호가 같지 않습니다. 다시 시도해주세요.",
        });
    }

    const exists = await User.exists({ $or: [{ id }, { email }] });
    if (exists) {
        return res.status(400).render("signup", {
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
            dogSize: undefined,
        });
        return res.render("login", {
            pageTitle: "로그인",
            errorMessage:
                "회원가입에 성공했습니다. 로그인 해서 서비스를 이용해보세요!",
        });
    } catch (error) {
        return res.status(400).render("signup", {
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
