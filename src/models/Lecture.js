import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    profId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    lectureName: { type: String, required: true },
    notices: [{ type: String }],
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
