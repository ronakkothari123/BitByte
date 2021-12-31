"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211231214611 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211231214611 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "draft" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "team" text not null, "user_id" int4 not null);');
        this.addSql('alter table "draft" add constraint "draft_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    }
}
exports.Migration20211231214611 = Migration20211231214611;
//# sourceMappingURL=Migration20211231214611.js.map