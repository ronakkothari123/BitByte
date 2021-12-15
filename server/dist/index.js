"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const express_1 = __importDefault(require("express"));
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routers/user"));
const app = express_1.default();
const PORT = 5000;
dotenv_1.default.config();
exports.Context = {
    em: undefined,
};
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    exports.Context.em = orm.em;
    app.use(express_1.default.json());
    app.listen(PORT, () => {
        console.log(`Alive on http://localhost:${PORT}`);
    });
    app.get("/", (_, res) => {
        res.send("Hello World");
    });
    app.use("/user", user_1.default);
};
main().catch(console.error);
//# sourceMappingURL=index.js.map