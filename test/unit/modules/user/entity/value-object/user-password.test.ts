import test from 'tape';

import UserPassword from '../../../../../../src/modules/user/domain/entity/value-object/user-password';

import type { Test } from 'tape';

test('creates a user-password', async (t: Test): Promise<void> => {
  const pwd = await UserPassword.fromString('my-Beautiful_P4ssW0rd');

  t.true(typeof pwd.value === 'string');
  t.end();
});

test('verifies a user-password', async (t: Test): Promise<void> => {
  const plain = 'my-Beautiful_P4ssW0rd';
  const pwd = await UserPassword.fromString(plain);
  const result = await pwd.verify(plain);

  t.true(result);
  t.end();
});

test('verifies a invalid user-password', async (t: Test): Promise<void> => {
  const plain = 'my-Beautiful_P4ssW0rd';
  const pwd = await UserPassword.fromString('myP4ssWordI$n0t_that');
  const result = await pwd.verify(plain);

  t.false(result);
  t.end();
});

test('complains if password doesn\'t have uppercase', async (t: Test): Promise<void> => {
  try {
    await UserPassword.fromString('my-beautiful_p4ssw0rd');
  } catch (error) {
    t.equals(error.name, 'InvalidPassword');
    t.equals(error.message, `The password provided does\'t accomplish policy requirements.\nAt least one upper case character,At least one lower case character,At least one digit,At least one special character or space,Minimum eight characters,\n`);
  } finally {
    t.end();
  }
});

test('complains if password doesn\'t have lowercase', async (t: Test): Promise<void> => {
  try {
    await UserPassword.fromString('MY-BEAUTIFUL_P4SSW0RD');
  } catch (error) {
    t.equals(error.name, 'InvalidPassword');
    t.equals(error.message, `The password provided does\'t accomplish policy requirements.\nAt least one upper case character,At least one lower case character,At least one digit,At least one special character or space,Minimum eight characters,\n`);
  } finally {
    t.end();
  }
});

test('complains if password doesn\'t have numbers', async (t: Test): Promise<void> => {
  try {
    await UserPassword.fromString('My-bEAUTIFUL_Pa$$WoRD');
  } catch (error) {
    t.equals(error.name, 'InvalidPassword');
    t.equals(error.message, `The password provided does\'t accomplish policy requirements.\nAt least one upper case character,At least one lower case character,At least one digit,At least one special character or space,Minimum eight characters,\n`);
  } finally {
    t.end();
  }
});

test('complains if password doesn\'t have symbols', async (t: Test): Promise<void> => {
  try {
    await UserPassword.fromString('My-b34UTIFUL_P4SSW0RD');
  } catch (error) {
    t.equals(error.name, 'InvalidPassword');
    t.equals(error.message, `The password provided does\'t accomplish policy requirements.\nAt least one upper case character,At least one lower case character,At least one digit,At least one special character or space,Minimum eight characters,\n`);
  } finally {
    t.end();
  }
});
