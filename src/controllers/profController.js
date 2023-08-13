import User from "../models/User";
import Lecture from "../models/Lecture";

const updateLoggedInUser = async (req, user) => {
    req.session.loggedInUser = user;
    return;
};

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
    const { loggedInUser } = req.session;
    const { lectureIds } = loggedInUser;

    const newLecture = await Lecture.create({
        profId: loggedInUser._id,
        stuIds: [],
        lectureName,
    });
    if (!lectureIds.includes(newLecture._id)) {
        await lectureIds.push(newLecture._id);
    }

    await User.findByIdAndUpdate(loggedInUser._id, {
        lectureIds,
    });
    const newUser = await User.findById(loggedInUser._id);
    await updateLoggedInUser(req, newUser);

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

export const getNewNotice = async (req, res) => {
    return res.render("prof/newNotice.pug", { pageTitle: "게시물 작성" });
};

export const postOneNotice = async (req, res) => {};

export const getAllStudents = async (req, res) => {
    const loggedInUser = req.session.loggedInUser;
    const { lectureIds } = loggedInUser;
    const lectures = await Lecture.find({ _id: { $in: lectureIds } }).populate(
        "stuIds"
    );
    return res.render("prof/students.pug", {
        pageTitle: "수강 학생 관리",
        lectures,
    });
};

export const cancelOneStudent = async (req, res) => {};
