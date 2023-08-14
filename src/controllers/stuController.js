import Lecture from "../models/Lecture";
import User from "../models/User";

const updateLoggedInUser = async (req, user) => {
    req.session.loggedInUser = user;
    return;
};

export const getSugang = async (req, res) => {
    try {
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
    } catch (errorMessage) {
        return res.status(400).render("stu/sugang", {
            pageTitle: "에러",
            lectures: null,
            errorMessage,
        });
    }
};

export const postSugang = async (req, res) => {
    try {
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
    } catch (errorMessage) {
        return res.status(400).render("stu/sugang", {
            pageTitle: "에러",
            lectures: null,
            errorMessage,
        });
    }
};

export const getAllLectures = async (req, res) => {
    try {
        const loggedInUser = req.session.loggedInUser;
        const lectureIds = loggedInUser.lectureIds;
        const lectures = await Lecture.find({ _id: { $in: lectureIds } });
        return res.render("stu/lecture", {
            pageTitle: "수강중인 강의",
            lectures,
        });
    } catch (errorMessage) {
        return res.status(400).render("stu/lecture", {
            pageTitle: "에러",
            lectures: null,
            errorMessage,
        });
    }
};

export const getOneLecture = async (req, res) => {
    try {
        const lectureId = req.params.id;
        const lecture = await Lecture.findById(lectureId).populate("noticeIds");
        return res.render("lectureDetail.pug", {
            pageTitle: `${lecture.lectureName}`,
            lecture,
        });
    } catch (errorMessage) {
        return res.status(400).render("lectureDetail", {
            pageTitle: "에러",
            lecture: null,
            errorMessage,
        });
    }
};

export const getUpdate = async (req, res) => {
    try {
        const loggedInUser = req.session.loggedInUser;
        const lectureIds = loggedInUser.lectureIds;
        const lectures = await Lecture.find({
            _id: { $in: lectureIds },
        })
            .populate("profId")
            .populate("noticeIds");
        const notices = [];
        for (let i = 0; i < lectures.length; i++) {
            for (let j = 0; j < lectures[i].noticeIds.length; j++) {
                let noticeObj = {};
                noticeObj.content = lectures[i].noticeIds[j].content;
                noticeObj.createdAt = lectures[i].noticeIds[j].createdAt;
                noticeObj.lectureName = lectures[i].lectureName;
                noticeObj.profName = lectures[i].profId.name;
                notices.push(noticeObj);
            }
        }
        const sortedNotices = notices.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return res.render("stu/update", {
            pageTitle: "최근 업데이트",
            sortedNotices,
        });
    } catch (errorMessage) {
        return res.status(400).render("stu/update", {
            pageTitle: "에러",
            sortedNotices: null,
            errorMessage,
        });
    }
};
