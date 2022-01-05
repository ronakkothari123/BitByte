"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220104040157 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220104040157 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "trophies" text null;');
    }
}
exports.Migration20220104040157 = Migration20220104040157;
//# sourceMappingURL=Migration20220104040157.js.map