import User from "../models/User";

export const getInfo = async (req, res) => {
    const user_id = req.session.user._id;
    const user = await User.findById(user_id);
    const { walkerIntro, location } = user;
    if (walkerIntro === undefined) {
        const errorMessage =
            "아직 선생님 소개가 등록되지 않았습니다. 선생님 소개를 먼저 등록해주세요.";
        return res.render("walkerInfo", {
            pageTitle: "선생님 정보",
            errorMessage,
        });
    }
    return res.render("walkerInfo", {
        pageTitle: "선생님 정보",
        walkerIntro,
        location,
    });
};

export const getEdit = async (req, res) => {
    const user_id = req.session.user._id;
    const user = await User.findById(user_id);
    const { walkerIntro, location } = user;
    if (walkerIntro === undefined) {
        return res.render("walkerEdit", {
            pageTitle: "선생님 정보 등록",
            walkerIntro: "선생님 소개를 등록해주세요",
            location,
            add_or_edit: "add",
        });
    } else {
        return res.render("walkerEdit", {
            pageTitle: "선생님 정보 수정",
            walkerIntro,
            location,
            add_or_edit: "edit",
        });
    }
};

export const postEdit = async (req, res) => {
    const user_id = req.session.user._id;
    const user = await User.findById(user_id);
    const { walkerIntro } = req.body;
    await User.findByIdAndUpdate(
        user_id,
        {
            userType: user.userType,
            email: user.email,
            id: user.id,
            pw: user.pw,
            location: user.location,
            walkerIntro,
        },
        { new: true }
    );

    return res.redirect("/walker/info");
};
