import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import path from "path";
import dotenv from "dotenv";
import { Draft } from "./entities/Draft";

dotenv.config();

export default {
    migrations: {
        path: path.join(__dirname, "./migrations"), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: "bitbyte",
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    type: "postgresql",
    debug: !__prod__,
    entities: [User, Draft],
} as Parameters<typeof MikroORM.init>[0];
