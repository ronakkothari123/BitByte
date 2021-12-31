"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDrafts = exports.AddDraft = void 0;
const index_1 = require("../index");
const Draft_1 = require("../entities/Draft");
const User_1 = require("../entities/User");
const AddDraft = async (req, res) => {
    var _a, _b;
    const { draft, username } = req.body;
    const user = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { username }));
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
    const existingDraft = await index_1.Context.em.findOne(Draft_1.Draft, { name, team });
    console.log(existingDraft);
    if (existingDraft) {
        user.drafts.add(existingDraft);
        res.json(user.drafts.toJSON());
        return;
    }
    const createdDraft = index_1.Context.em.create(Draft_1.Draft, { name, team });
    user.drafts.add(createdDraft);
    (_b = index_1.Context.em) === null || _b === void 0 ? void 0 : _b.persistAndFlush(createdDraft);
    res.json(user.drafts.toJSON());
};
exports.AddDraft = AddDraft;
const GetDrafts = async (_, res) => {
    var _a;
    const drafts = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.find(Draft_1.Draft, {}));
    res.json(drafts);
};
exports.GetDrafts = GetDrafts;
//# sourceMappingURL=draft.js.map