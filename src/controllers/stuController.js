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

    res.render("stu/lecture", {
        pageTitle: "수강신청",
        lectures,
        sugangLectureIds,
    });
};

export const postSugang = async (req, res) => {};

export const getAllLectures = async (req, res) => {};

export const getOneLecture = async (req, res) => {};

export const getUpdate = async (req, res) => {};
