import { Migration } from '@mikro-orm/migrations';

export class Migration20211221040251 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "name" text null;');
  }

}
