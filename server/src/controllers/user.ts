import { Request, Response } from "express";
import { Context } from "../index";
import { User } from "../entities/User";
import argon2 from "argon2";

declare module "express-session" {
    export interface SessionData {
        user: User | null;
    }
}

export const GetAllUsers = async (_: Request, res: Response) => {
    const users = await Context.em!.find(User, {});

    var finalResult: any = [];

    for (const user of users) {
        await user.drafts.init();
        finalResult = [...finalResult, { user }];
    }

    res.json(finalResult);
};

export const Register = async (req: Request, res: Response) => {
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

    const hashedPassword = await argon2.hash(password);

    const user = Context.em!.create(User, {
        username: username,
        password: hashedPassword,
        name: realName,
    });

    Context.em!.persistAndFlush(user);

    req.session.user = user;

    res.json({ name: user.username });
};

export const GetOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await Context.em!.findOne(User, { id: parseInt(id) });

    if (!user) {
        res.json({ error: "that user does not exist" });
        return;
    }

    res.json({ name: user!.username });
};

export const Login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await Context.em?.findOne(User, { username });

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

    const valid = await argon2.verify(user.password, password);

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

export const DeleteUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await Context.em?.findOne(User, { username });

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

    const valid = await argon2.verify(user.password, password);

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

    await Context.em?.nativeDelete(User, { username });

    res.json({ successful: true });
};

export const Me = async (req: Request, res: Response) => {
    res.json({ username: req.session.user?.username });
};
