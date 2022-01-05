import { Request, Response } from "express";
import { User } from "../entities/User";
import { Context } from "../index";

const AvailableTrophies = ["ultimate", "silver", "league"];

export const AddTrophy = async (req: Request, res: Response) => {
    const {
        trophy: { type, amount },
        username,
    } = req.body;

    const user = await Context.em!.findOne(User, { username });

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

    if (!AvailableTrophies.includes(type)) {
        res.json({
            errors: [
                {
                    field: "type",
                    message: "that type does not exist",
                },
            ],
        });
        return;
    }

    if (user.trophies === null) {
        user.trophies = "0-0-0";
    }

    const trophyString = user.trophies.split("-");
    const [ultimate, silver, league] = trophyString;

    var newAmount = 0;
    var finalString = "";

    switch (type) {
        case "ultimate": {
            newAmount = parseInt(ultimate) + amount;
            finalString = `${newAmount}-${silver}-${league}`;
            break;
        }
        case "silver": {
            newAmount = parseInt(silver) + amount;
            finalString = `${ultimate}-${newAmount}-${league}`;
            break;
        }
        case "league": {
            newAmount = parseInt(league) + amount;
            finalString = `${ultimate}-${silver}-${newAmount}`;
            break;
        }
    }

    user.trophies = finalString;

    await Context.em?.persistAndFlush(user);

    res.json({
        trophies: user.trophies,
    });
};
