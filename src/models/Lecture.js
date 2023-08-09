import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    profId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    noticeUrlArr: [{ type: String }],
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
