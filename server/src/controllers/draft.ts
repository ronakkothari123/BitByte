import { Request, Response } from "express";
import { Context } from "../index";
import { Draft } from "../entities/Draft";
import { User } from "../entities/User";

export const AddDraft = async (req: Request, res: Response) => {
    const { draft, username } = req.body;

    const user = await Context.em?.findOne(User, { username });

    if (!user) {
        res.json({
            errors: [
                {
                    field: "user",
                    error: "invalid username",
                },
            ],
        });
        return;
    }

    const { name, team } = draft;

    const existingDraft = await Context.em!.findOne(Draft, { name, team });

    console.log(existingDraft);

    if (existingDraft) {
        user.drafts.add(existingDraft);
        res.json(user.drafts.toJSON());
        return;
    }

    const createdDraft = Context.em!.create(Draft, { name, team });
    user.drafts.add(createdDraft);
    Context.em?.persistAndFlush(createdDraft);
    res.json(user.drafts.toJSON());
};

export const GetDrafts = async (_: Request, res: Response) => {
    const drafts = await Context.em?.find(Draft, {});

    res.json(drafts);
};
