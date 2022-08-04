import User from "../models/User";
import Dog from "../models/Dog";

export const getWalkerProfile = (req, res) => {
    return res.render("profile", { pageTitle: "프로필" });
};

export const getInfo = (req, res) => {
    return res.render("walkerInfo", { pageTitle: "선생님 정보" });
};

export const postInfo = (req, res) => {
    return res.send("아직만드는중");
};
