import test from 'tape';

import basicAuth from '../../../../src/services/auth/utils/basic-auth';

import type { Test } from 'tape';

test('gets credentials from basic authentication', (t: Test): void => {
  const HTTP_AUTHORIZATION_HEADER_BASIC = 'Basic dXNlcm5hbWU6cGFzc3dvcmQ=';
  const credentials = basicAuth(HTTP_AUTHORIZATION_HEADER_BASIC);

  t.equal(credentials.userId, 'username');
  t.equal(credentials.password, 'password');

  t.end();
});
