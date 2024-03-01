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
