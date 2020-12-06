import * as Knex from 'knex';

import withUpdateTriggers from './utils/with-update-triggers';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')),
    table.string('email').notNullable().unique();
    table.string('name').notNullable().unique();
    table.string('first_name').notNullable().unique();
    table.string('surname').notNullable().unique();
    table.integer('follower_count').notNullable().defaultTo(0);
    table.timestamps(false, true);
  });

  await withUpdateTriggers(knex, 'users');
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
