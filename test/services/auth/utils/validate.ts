import test from 'tape';

import validate from '../../../../src/services/auth/utils/validate';

import type { Test } from 'tape';

test('checks for valid usernames', (t: Test): void => {
  const usernames = [
    'foobarbaz',
    'washington',
    'DeeCeeComics',
    'testTesttest',
    'AaAeEeOoO',
    'NewYorkState',
  ];

  usernames.forEach((username) => {
    t.assert(validate.isValidUserName(username));
  });

  t.end();
});

test('checks for invalid usernames', (t: Test): void => {
  const usernames = [
    'not@tsymbols',
    'no spaces please',
    'no_special_characters',
    'sh',
    '123',
  ];

  usernames.forEach((username) => {
    t.assert(!validate.isValidUserName(username));
  });

  t.end();
});

test('checks for valid emails', (t: Test): void => {
  const emails = [
    'dan.vangelis@gmail.com',
    'anuser@aol.com',
    'johny_cash@america.us',
    'eatsleepcoderepeat@m.ar',
  ];

  emails.forEach((email) => {
    t.assert(validate.isValidEmail(email));
  });

  t.end();
});

test('checks for invalid emails', (t: Test): void => {
  const emails = [
    'this is not valid@email.com',
    'aaaa.eee@eeeeeaaaaa',
    'w@.com',
  ];

  emails.forEach((email) => {
    t.assert(!validate.isValidEmail(email));
  });

  t.end();
});
