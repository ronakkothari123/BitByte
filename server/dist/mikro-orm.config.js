"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const User_1 = require("./entities/User");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const Draft_1 = require("./entities/Draft");
dotenv_1.default.config();
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: "bitbyte",
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    type: "postgresql",
    debug: !constants_1.__prod__,
    entities: [User_1.User, Draft_1.Draft],
};
//# sourceMappingURL=mikro-orm.config.js.map