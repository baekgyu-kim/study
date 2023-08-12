import Lecture from "../models/Lecture";
import User from "../models/User";

const updateLoggedInUser = async (req, user) => {
    req.session.loggedInUser = user;
    return;
};

export const getSugang = async (req, res) => {
    const loggedInUser = req.session.loggedInUser;
    const sugangLectureIds = loggedInUser.lectureIds;
    const lectures = await Lecture.find({})
        .sort({ createdAt: "desc" })
        .populate("profId");

    res.render("stu/sugang", {
        pageTitle: "수강신청",
        lectures,
        sugangLectureIds,
    });
};

export const postSugang = async (req, res) => {
    const newLectureId = req.body.lectureId;

    const loggedInUser = req.session.loggedInUser;
    const { lectureIds } = loggedInUser;

    if (!lectureIds.includes(newLectureId)) {
        await lectureIds.push(newLectureId);
    }

    await User.findByIdAndUpdate(loggedInUser._id, {
        lectureIds,
    });
    const newUser = await User.findById(loggedInUser._id);
    await updateLoggedInUser(req, newUser);

    const { stuIds } = await Lecture.findById(newLectureId);
    if (!stuIds.includes(loggedInUser._id)) {
        await stuIds.push(loggedInUser._id);
    }
    await Lecture.findByIdAndUpdate(newLectureId, { stuIds });

    return res.redirect("/stu/sugang");
};

export const getAllLectures = async (req, res) => {};

export const getOneLecture = async (req, res) => {};

export const getUpdate = async (req, res) => {};
