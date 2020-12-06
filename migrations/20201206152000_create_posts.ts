import * as Knex from 'knex';

import withUpdateTriggers from './utils/with-update-triggers';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('posts', (table: Knex.TableBuilder) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('content').notNullable();
    table.string('user_id').notNullable();
    table.timestamps(false, true);
  });

  await withUpdateTriggers(knex, 'posts');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('posts');
}
