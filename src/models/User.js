import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    pw: { type: String, required: true },
    name: { type: String, required: true },
    stuId: { type: String },
    userType: { type: String, required: true },
    lectureIdArr: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lecture" }],
});

userSchema.pre("save", async function () {
    if (this.isModified("pw")) {
        this.pw = await bcrypt.hash(this.pw, 5);
    }
});

const User = mongoose.model("User", userSchema);
export default User;
