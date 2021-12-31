"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211221040251 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211221040251 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "user" add column "name" text null;');
    }
}
exports.Migration20211221040251 = Migration20211221040251;
//# sourceMappingURL=Migration20211221040251.js.map