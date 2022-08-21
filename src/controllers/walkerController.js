import User from "../models/User";

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
    return res.render("walkerInfo", {
        pageTitle: "선생님 정보",
        walkerIntro,
        walkerDogSize,
    });
};

export const getEdit = async (req, res) => {
    const user_id = req.session.user._id;
    const user = await User.findById(user_id);
    const { walkerDogSize, walkerIntro } = user;
    return res.render("walkerEdit", {
        pageTitle: "선생님 정보 관리",
        walkerDogSize,
        walkerIntro,
    });
};

export const postEdit = async (req, res) => {
    const user_id = req.session.user._id;
    const user = await User.findById(user_id);
    const { walkerDogSize, walkerIntro } = req.body;
    await User.findByIdAndUpdate(
        user_id,
        {
            userType: user.userType,
            email: user.email,
            id: user.id,
            pw: user.pw,
            location: user.location,
            walkerDogSize,
            walkerIntro,
        },
        { new: true }
    );

    return res.redirect("/walker/info");
};
