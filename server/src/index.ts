import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import dotenv from "dotenv";
import { MyContext } from "./types";
import userRouter from "./routers/user";
import session from "express-session";
import cookieParser from "cookie-parser";
import draftRouter from "./routers/draft";
import trophiesRouter from "./routers/trophies";

const app = express();
const PORT = 5000;

dotenv.config();

export const Context: MyContext = {
    em: undefined,
};

const main = async () => {
    const orm = await MikroORM.init(mikroOrmConfig);

    Context.em = orm.em;

    app.use(express.json());
    app.use(cookieParser());
    app.use(
        session({
            secret: process.env.COOKIE_SECRET ?? "",
            resave: false,
            saveUninitialized: false,
        })
    );

    app.listen(PORT, () => {
        console.log(`Alive on http://localhost:${PORT}`);
    });

    app.get("/", (_, res) => {
        res.send("Hello World");
    });

    app.use("/user", userRouter);
    app.use("/draft", draftRouter);
    app.use("/trophies", trophiesRouter);
};

main().catch(console.error);
