import User from "../models/User";
import Lecture from "../models/Lecture";

export const getAllLectures = async (req, res) => {
    const loggedInUser = req.session.loggedInUser;
    const lectures = await Lecture.find({ profId: loggedInUser._id });
    return res.render("prof/lecture.pug", { pageTitle: "강의 목록", lectures });
};

export const getNewLecture = async (req, res) => {};

export const postNewLecture = async (req, res) => {};

export const getOneLecture = async (req, res) => {};

export const postOneNotice = async (req, res) => {};

export const getAllStudents = async (req, res) => {};

export const cancelOneStudent = async (req, res) => {};
