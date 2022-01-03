"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220103175914 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220103175914 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "draft" drop constraint if exists "draft_user_id_check";');
        this.addSql('alter table "draft" alter column "user_id" type int4 using ("user_id"::int4);');
        this.addSql('alter table "draft" alter column "user_id" drop not null;');
    }
}
exports.Migration20220103175914 = Migration20220103175914;
//# sourceMappingURL=Migration20220103175914.js.map