"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOne = exports.Register = exports.GetAllUsers = void 0;
const index_1 = require("../index");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
const GetAllUsers = async (_, res) => {
    const users = await index_1.Context.em.find(User_1.User, {});
    res.json(users);
};
exports.GetAllUsers = GetAllUsers;
const Register = async (req, res) => {
    const { name, password } = req.body;
    if (name == "") {
        res.json({
            errors: [
                {
                    field: "username",
                    message: "username cannont be empty",
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
        username: name,
        password: hashedPassword,
    });
    index_1.Context.em.persistAndFlush(user);
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
//# sourceMappingURL=user.js.map