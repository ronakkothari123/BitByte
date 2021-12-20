import express from "express";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import dotenv from "dotenv";
import { MyContext } from "./types";
import userRouter from "./routers/user";
import session from "express-session";
import cookieParser from "cookie-parser";

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
};

main().catch(console.error);
