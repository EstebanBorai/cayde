import test from 'tape';

import User from '../../../../../src/modules/user/domain/entity/user';
import UserEmail from '../../../../../src/modules/user/domain/entity/value-object/user-email';
import UserPassword from '../../../../../src/modules/user/domain/entity/value-object/user-password';

import type { Test } from 'tape';

test('creates an user', async (t: Test): Promise<void> => {
  const email = UserEmail.fromString('johnappleseed@teatime.com');
  const password = await UserPassword.fromString('Root@12A');
  const user = User.create({
    email,
    password,
  });

  t.true(email.isEqual(user.email));
  t.true(password.isEqual(user.password));
  t.equals(email.value, 'johnappleseed@teatime.com');
  t.end();
});
