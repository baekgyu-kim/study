import User from "../models/User";
import Dog from "../models/Dog";

export const getMatch = (req, res) => {
    return res.render("match", { pageTitle: "매칭" });
};
