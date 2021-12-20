"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get("/me", user_1.Me);
router.get("/", user_1.GetAllUsers);
router.get("/:id", user_1.GetOne);
router.post("/register", user_1.Register);
router.post("/login", user_1.Login);
router.post("/delete", user_1.DeleteUser);
exports.default = router;
//# sourceMappingURL=user.js.map