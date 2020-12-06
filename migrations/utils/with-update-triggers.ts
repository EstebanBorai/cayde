import type Knex from 'knex';

export default function (knex: Knex, tableName: string): Promise<void> {
  return knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
}
