"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211211045132 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211211045132 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
    }
}
exports.Migration20211211045132 = Migration20211211045132;
//# sourceMappingURL=Migration20211211045132.js.map