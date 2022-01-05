"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUser = void 0;
const index_1 = require("./index");
const User_1 = require("./entities/User");
const ValidateUser = async (username) => {
    var _a;
    const user = await ((_a = index_1.Context.em) === null || _a === void 0 ? void 0 : _a.findOne(User_1.User, { username: username }));
    if (!user) {
        return false;
    }
    return true;
};
exports.ValidateUser = ValidateUser;
//# sourceMappingURL=utils.js.map