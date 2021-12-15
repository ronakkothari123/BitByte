import { Request, Response } from "express";
import { Context } from "../index";
import { User } from "../entities/User";
import argon2 from "argon2";

export const GetAllUsers = async (_: Request, res: Response) => {
    const users = await Context.em!.find(User, {});

    res.json(users);
};

export const Register = async (req: Request, res: Response) => {
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

    const hashedPassword = await argon2.hash(password);

    const user = Context.em!.create(User, {
        username: name,
        password: hashedPassword,
    });

    Context.em!.persistAndFlush(user);

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
