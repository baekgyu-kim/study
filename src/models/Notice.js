import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
    {
        lectureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
            required: true,
        },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

const Notice = mongoose.model("Lecture", noticeSchema);
export default Notice;
