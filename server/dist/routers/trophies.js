"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trophies_1 = require("../controllers/trophies");
const router = express_1.default.Router();
router.post("/add", trophies_1.AddTrophy);
exports.default = router;
//# sourceMappingURL=trophies.js.map