"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDrafts = exports.RemoveDraft = exports.AddDraft = void 0;
const index_1 = require("../index");
const Draft_1 = require("../entities/Draft");
const User_1 = require("../entities/User");
const AddDraft = async (req, res) => {
    var _a, _b, _c;
    const { draft, username } = req.body;
    const user = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { username }));
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
    const existingDraft = await index_1.Context.em.findOne(Draft_1.Draft, { name, team });
    console.log(existingDraft);
    if (existingDraft) {
        user.drafts.add(existingDraft);
        res.json(user.drafts.toJSON());
        await ((_b = index_1.Context.em) === null || _b === void 0 ? void 0 : _b.persistAndFlush(user));
        return;
    }
    const createdDraft = index_1.Context.em.create(Draft_1.Draft, { name, team });
    user.drafts.add(createdDraft);
    (_c = index_1.Context.em) === null || _c === void 0 ? void 0 : _c.persistAndFlush(createdDraft);
    res.json(user.drafts.toJSON());
};
exports.AddDraft = AddDraft;
const RemoveDraft = async (req, res) => {
    var _a, _b, _c;
    const { draft, username } = req.body;
    const { name, team } = draft;
    const user = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { username }));
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
    const existingDraft = await ((_b = index_1.Context.em) === null || _b === void 0 ? void 0 : _b.findOne(Draft_1.Draft, { name, team }));
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
        await ((_c = index_1.Context.em) === null || _c === void 0 ? void 0 : _c.persistAndFlush(user));
    }
    res.json(user.drafts.toJSON());
};
exports.RemoveDraft = RemoveDraft;
const GetDrafts = async (_, res) => {
    var _a;
    const drafts = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.find(Draft_1.Draft, {}));
    res.json(drafts);
};
exports.GetDrafts = GetDrafts;
//# sourceMappingURL=draft.js.map