import { Migration } from '@mikro-orm/migrations';

export class Migration20220105043936 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
  }

}
