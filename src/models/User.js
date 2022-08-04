import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userType: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    id: { type: String, required: true, unique: true },
    pw: { type: String, required: true },
    location: { type: String, required: true },
    walkerDogSize: { type: String },
    walkerIntro: { type: String },
    ownerDogArray: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dog" }],
});

userSchema.pre("save", async function () {
    if (this.isModified("pw")) {
        this.pw = await bcrypt.hash(this.pw, 5);
    }
});

const User = mongoose.model("User", userSchema);
export default User;
