"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTrophy = void 0;
const User_1 = require("../entities/User");
const index_1 = require("../index");
const AvailableTrophies = ["ultimate", "silver", "league"];
const AddTrophy = async (req, res) => {
    var _a;
    const { trophy: { type, amount }, username, } = req.body;
    const user = await index_1.Context.em.findOne(User_1.User, { username });
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
    await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.persistAndFlush(user));
    res.json({
        trophies: user.trophies,
    });
};
exports.AddTrophy = AddTrophy;
//# sourceMappingURL=trophies.js.map