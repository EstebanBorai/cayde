import { getManager } from 'typeorm';

/**
 * 
 * @param followerId 
 * @param followeeId 
 * 
 * Checks if a `User` (the follower) follows another
 * `User` (the followee) by querying the `user_follows_user`
 * join table
 */
export default async function isFollowing(followerId: string, followeeId: string): Promise<boolean> {
  const sqlQuery = `
  SELECT
    COUNT(1)
  FROM
    user_follows_user
  WHERE
    user_follows_user."userId_1" = '${followerId}'
    AND user_follows_user."userId_2" = '${followeeId}'
  LIMIT 1`;

  const result: [{ count: string; }] = await getManager().query(sqlQuery);
  const count = parseInt(result[0].count, 10);

  return Boolean(count);
}
