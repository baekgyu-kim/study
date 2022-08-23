import "dotenv/config";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import "./db";
import rootRouter from "./routers/rootRouter";
import ownerRouter from "./routers/ownerRouter";
import walkerRouter from "./routers/walkerRouter";
import matchRouter from "./routers/matchRouter";
import { saveSessionToLocal } from "./middlewares";

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
app.use("/", express.static("src/views/img"));
app.use("/user", express.static("src/views/img"));
app.use("/owner", express.static("src/views/img"));
app.use("/owner/dog", express.static("src/views/img"));
app.use("/walker", express.static("src/views/img"));
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
app.use(saveSessionToLocal);

app.use("/", rootRouter);
app.use("/owner", ownerRouter);
app.use("/walker", walkerRouter);
app.use("/match", matchRouter);
