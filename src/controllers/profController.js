import User from "../models/User";
import Lecture from "../models/Lecture";

export const getAllLectures = async (req, res) => {
    const loggedInUser = req.session.loggedInUser;
    const lectures = await Lecture.find({ profId: loggedInUser._id });
    return res.render("prof/lecture.pug", { pageTitle: "강의 목록", lectures });
};

export const getNewLecture = async (req, res) => {
    return res.render("prof/newLecture.pug", { pageTitle: "강의 개설" });
};

export const postNewLecture = async (req, res) => {
    const { lectureName } = req.body;
    const loggedInUSer = req.session.loggedInUser;
    await Lecture.create({
        profId: loggedInUSer._id,
        lectureName,
    });
    return res.redirect("/prof/lecture");
};

export const getOneLecture = async (req, res) => {
    const { id } = req.params;
    const lecture = await Lecture.findById(id);
    return res.render("prof/lectureDetail.pug", {
        pageTitle: `${lecture.lectureName}`,
        lecture,
    });
};

export const getOneLecture = async (req, res) => {};

export const postOneNotice = async (req, res) => {};

export const getAllStudents = async (req, res) => {};

export const cancelOneStudent = async (req, res) => {};
