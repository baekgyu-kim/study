import User from "../models/User";
import Lecture from "../models/Lecture";

const updateLoggedInUser = async (req, user) => {
    req.session.loggedInUser = user;
    return;
};

export const getAllLectures = async (req, res) => {
    try {
        const loggedInUser = req.session.loggedInUser;
        const lectures = await Lecture.find({ profId: loggedInUser._id });
        return res.render("prof/lecture.pug", {
            pageTitle: "강의 목록",
            lectures,
        });
    } catch (errorMessage) {
        return res.status(400).render("prof/lecture.pug", {
            pageTitle: "에러",
            lectures: [],
            errorMessage,
        });
    }
};

export const getNewLecture = async (req, res) => {
    try {
        return res.render("prof/newLecture.pug", { pageTitle: "강의 개설" });
    } catch (errorMessage) {
        return res.status(400).render("prof/newLecture.pug", {
            pageTitle: "에러",
            errorMessage,
        });
    }
};

export const postNewLecture = async (req, res) => {
    try {
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
    } catch (errorMessage) {
        return res.status(400).render("prof/newLecture.pug", {
            pageTitle: "에러",
            errorMessage,
        });
    }
};

export const getOneLecture = async (req, res) => {
    try {
        const { id } = req.params;
        const lecture = await Lecture.findById(id);
        return res.render("prof/lectureDetail.pug", {
            pageTitle: `${lecture.lectureName}`,
            lecture,
        });
    } catch (errorMessage) {
        return res.status(400).render("prof/lectureDetail.pug", {
            pageTitle: "에러",
            lecture: {},
            errorMessage,
        });
    }
};

export const getNewNotice = async (req, res) => {
    try {
        return res.render("prof/newNotice.pug", { pageTitle: "게시물 작성" });
    } catch (errorMessage) {
        return res.status(400).render("prof/newNotice.pug", {
            pageTitle: "에러",
            errorMessage,
        });
    }
};

export const postOneNotice = async (req, res) => {
    try {
    } catch (errorMessage) {}
};

export const getAllStudents = async (req, res) => {
    try {
        const loggedInUser = req.session.loggedInUser;
        const { lectureIds } = loggedInUser;
        const lectures = await Lecture.find({
            _id: { $in: lectureIds },
        }).populate("stuIds");
        return res.render("prof/students.pug", {
            pageTitle: "수강 학생 관리",
            lectures,
        });
    } catch (errorMessage) {
        return res.status(400).render("prof/students.pug", {
            pageTitle: "에러",
            lectures: [],
            errorMessage,
        });
    }
};

export const cancelOneStudent = async (req, res) => {
    try {
    } catch (errorMessage) {}
};
