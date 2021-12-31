"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const draft_1 = require("../controllers/draft");
const router = express_1.default.Router();
router.post("/add", draft_1.AddDraft);
router.get("/all", draft_1.GetDrafts);
exports.default = router;
//# sourceMappingURL=draft.js.map