import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    walkerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dogID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dog",
        required: true,
    },
});

const Match = mongoose.model("Match", matchSchema);
export default Match;
