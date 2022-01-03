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
                    field: "username",
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
        await Context.em?.persistAndFlush(user);
        return;
    }

    const createdDraft = Context.em!.create(Draft, { name, team });
    user.drafts.add(createdDraft);
    Context.em?.persistAndFlush(createdDraft);
    res.json(user.drafts.toJSON());
};

export const RemoveDraft = async (req: Request, res: Response) => {
    const { draft, username } = req.body;

    const { name, team } = draft;

    const user = await Context.em?.findOne(User, { username });
    if (!user) {
        res.json({
            errors: [
                {
                    field: "username",
                    error: "invalid username",
                },
            ],
        });
        return;
    }

    const existingDraft = await Context.em?.findOne(Draft, { name, team });

    if (!existingDraft) {
        res.json({
            errors: [
                {
                    field: "draft",
                    error: "that draft does not exist",
                },
            ],
        });
        return;
    }

    await user.drafts.init();

    if (user.drafts.contains(existingDraft)) {
        user.drafts.remove(existingDraft);
        await Context.em?.persistAndFlush(user);
    }

    res.json(user.drafts.toJSON());
};

export const GetDrafts = async (_: Request, res: Response) => {
    const drafts = await Context.em?.find(Draft, {});

    res.json(drafts);
};
