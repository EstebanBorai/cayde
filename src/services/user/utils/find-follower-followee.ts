import Knex from 'knex';

export default async function (
  knex: Knex,
  followerName: string,
  followeeName: string,
): Promise<{ follower: Whizzes.Users.User; followee: Whizzes.Users.User }> {
  const [follower, followee]: [
    Whizzes.Users.User,
    Whizzes.Users.User,
  ] = await Promise.all([
    knex('users')
      .where({
        name: followerName,
      })
      .first(),
    knex('users')
      .where({
        name: followeeName,
      })
      .first(),
  ]);

  return {
    followee,
    follower,
  };
}
