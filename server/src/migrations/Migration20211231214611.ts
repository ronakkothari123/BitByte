import { Migration } from '@mikro-orm/migrations';

export class Migration20211231214611 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "draft" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" text not null, "team" text not null, "user_id" int4 not null);');

    this.addSql('alter table "draft" add constraint "draft_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
