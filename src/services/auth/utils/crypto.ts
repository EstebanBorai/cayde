import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const makeHash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, SALT_ROUNDS);

const verify = async (password: string, hash: string): Promise<boolean> =>
  await bcrypt.compare(password, hash);

export default {
  makeHash,
  verify,
};
