import { Migration } from '@mikro-orm/migrations';

export class Migration20220104040157 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "trophies" text null;');
  }

}
