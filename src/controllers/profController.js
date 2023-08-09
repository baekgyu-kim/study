import User from "../models/User";
import Lecture from "../models/Lecture";

export const getAllLectures = async (req, res) => {
    const loggedInUSer = req.session.loggedInUser;
};

export const getNewLecture = async (req, res) => {};

export const postNewLecture = async (req, res) => {};

export const getOneLecture = async (req, res) => {};

export const postOneNotice = async (req, res) => {};

export const getAllStudents = async (req, res) => {};

export const cancelOneStudent = async (req, res) => {};
