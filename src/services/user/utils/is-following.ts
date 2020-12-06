import type Knex from 'knex';

/**
 *
 * @param followerId
 * @param followeeId
 *
 * Checks if a `User` (the follower) follows another
 * `User` (the followee) by querying the `user_follows`
 * join table
 */
export default async function (
  knex: Knex,
  followerId: string,
  followeeId: string,
): Promise<boolean> {
  const sqlQuery = `
  SELECT
    COUNT(1)
  FROM
    user_follows
  WHERE
    user_follows."follower" = '${followerId}'
    AND user_follows."followee" = '${followeeId}'
  LIMIT 1`;

  const result = await knex.raw(sqlQuery);
  const count = parseInt(result.rows[0].count, 10);

  return Boolean(count);
}
