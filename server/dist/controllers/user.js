"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Me = exports.DeleteUser = exports.Login = exports.GetOne = exports.Register = exports.GetAllUsers = void 0;
const index_1 = require("../index");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const GetAllUsers = async (_, res) => {
    const users = await index_1.Context.em.find(User_1.User, {});
    var finalResult = [];
    for (const user of users) {
        await user.drafts.init();
        finalResult = [...finalResult, { user }];
    }
    res.json(finalResult);
};
exports.GetAllUsers = GetAllUsers;
const Register = async (req, res) => {
    const { username, password, realName } = req.body;
    if (username == "") {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "username cannot be empty",
                },
            ],
        });
        return;
    }
    if (password.length <= 2) {
        res.json({
            errors: [
                {
                    field: "password",
                    message: "password must be at least characters long",
                },
            ],
        });
    }
    const hashedPassword = await argon2_1.default.hash(password);
    const user = index_1.Context.em.create(User_1.User, {
        username: username,
        password: hashedPassword,
        name: realName,
    });
    index_1.Context.em.persistAndFlush(user);
    req.session.user = user;
    res.json({ name: user.username });
};
exports.Register = Register;
const GetOne = async (req, res) => {
    const { id } = req.params;
    const user = await index_1.Context.em.findOne(User_1.User, { id: parseInt(id) });
    if (!user) {
        res.json({ error: "that user does not exist" });
        return;
    }
    res.json({ name: user.username });
};
exports.GetOne = GetOne;
const Login = async (req, res) => {
    var _a;
    const { username, password } = req.body;
    const user = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { username }));
    if (!user) {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "that username does not exist",
                },
            ],
        });
        return;
    }
    const valid = await argon2_1.default.verify(user.password, password);
    if (!valid) {
        res.json({
            errors: [
                {
                    field: "password",
                    message: "incorrect password",
                },
            ],
        });
        return;
    }
    req.session.user = user;
    res.json({ name: user.username, id: user.id }).status(200);
};
exports.Login = Login;
const DeleteUser = async (req, res) => {
    var _a, _b;
    const { username, password } = req.body;
    const user = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { username }));
    if (!user) {
        res.json({
            successful: false,
            errors: [
                {
                    field: "username",
                    message: "that username does not exist",
                },
            ],
        });
        return;
    }
    const valid = await argon2_1.default.verify(user.password, password);
    if (!valid) {
        res.json({
            successful: false,
            errors: [
                {
                    field: "password",
                    message: "incorrect password",
                },
            ],
        });
        return;
    }
    await ((_b = index_1.Context.em) === null || _b === void 0 ? void 0 : _b.nativeDelete(User_1.User, { username }));
    res.json({ successful: true });
};
exports.DeleteUser = DeleteUser;
const Me = async (req, res) => {
    var _a;
    res.json({ username: (_a = req.session.user) === null || _a === void 0 ? void 0 : _a.username });
};
exports.Me = Me;
//# sourceMappingURL=user.js.map