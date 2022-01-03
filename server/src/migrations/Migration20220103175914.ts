import { Migration } from '@mikro-orm/migrations';

export class Migration20220103175914 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "draft" drop constraint if exists "draft_user_id_check";');
    this.addSql('alter table "draft" alter column "user_id" type int4 using ("user_id"::int4);');
    this.addSql('alter table "draft" alter column "user_id" drop not null;');
  }

}
