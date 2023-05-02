import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    notice: { type: String, required: true },
    prof: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
