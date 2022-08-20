import User from "../models/User";
import Dog from "../models/Dog";

export const getWalkerProfile = (req, res) => {
    return res.render("profile", { pageTitle: "프로필" });
};

export const getInfo = async (req, res) => {
    const user_id = req.session.user._id;
    const user = await User.findById(user_id);
    const { walkerIntro, walkerDogSize } = user;
    if (walkerIntro === undefined || walkerDogSize === undefined) {
        const errorMessage =
            "아직 선생님 정보가 등록되지 않았습니다. 선생님 정보를 먼저 등록해주세요.";
        return res.render("walkerInfo", {
            pageTitle: "선생님 정보",
            errorMessage,
        });
    }
    return res.render("walkerInfo", { pageTitle: "선생님 정보" });
};

export const postInfo = (req, res) => {
    return res.send("아직만드는중");
};

export const getEdit = (req, res) => {
    return res.send("아직만드는중");
};

export const postEdit = (req, res) => {
    return res.send("아직만드는중");
};
