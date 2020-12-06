import * as Knex from 'knex';

import withUpdateTriggers from './utils/with-update-triggers';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_follows', (table: Knex.TableBuilder) => {
    table.uuid('follower').notNullable();
    table.uuid('followee').notNullable();
    table.timestamps(false, true);
  });

  await withUpdateTriggers(knex, 'user_follows');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_follows');
}
