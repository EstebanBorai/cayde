import test from 'tape';

import UserEmail from '../../../../../../src/modules/user/domain/entity/value-object/user-email';

import type { Test } from 'tape';

test('creates a user-email', (t: Test): void => {
  const email = UserEmail.fromString('test@github.com');

  t.equals(email.value, 'test@github.com');
  t.end();
});

test('invalidates a user-email', (t: Test): void => {
  try {
    UserEmail.fromString('test@com');
  } catch (error) {
    t.equals(error.name, 'InvalidEmailFormat');
    t.equals(error.message, `The email "test@com", is not a valid email address`);
  } finally {
    t.end();
  }
});
