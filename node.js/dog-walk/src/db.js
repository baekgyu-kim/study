import mongoose from "mongoose";

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_NAME}.jlmzdk5.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);
