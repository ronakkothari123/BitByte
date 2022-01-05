"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220104040127 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220104040127 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "trophies" text not null;');
    }
}
exports.Migration20220104040127 = Migration20220104040127;
//# sourceMappingURL=Migration20220104040127.js.map