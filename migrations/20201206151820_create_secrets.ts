import * as Knex from 'knex';

import withUpdateTriggers from './utils/with-update-triggers';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('secrets', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('hash').notNullable();
    table.string('user_id').notNullable();
    table.timestamps(false, true);
  });

  await withUpdateTriggers(knex, 'secrets');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('secrets');
}
