import "dotenv/config";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import "./db";

const app = express();

const PORT = 4000;
const logger = morgan("dev");

app.listen(PORT, () => {
    console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);
});

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/views/img"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        }),
    })
);

app.get("/", (req, res) => {
    return res.render("home", { pageTitle: "Home" });
});
