import test from 'tape';

import { makeServer } from '../../../src/server';

import type { FastifyInstance } from 'fastify';
import type { Test } from 'tape';
import type { Response } from 'light-my-request';

let server: FastifyInstance;

test('bootstrap: prepare server instance', async (t: Test) => {
  server = makeServer();

  t.end();
});

test('auth: sign up an user', async (t: Test) => {
  const response: Response = await server.inject({
    method: 'POST',
    url: 'auth/signup',
    payload: {
      firstName: 'John',
      surname: 'Appleseed',
      name: 'johnappleseed',
      email: 'j.appleseed@example.com',
      password: 'abc123',
    },
  });

  const responseBody: Whizzes.Users.User = JSON.parse(response.body);

  t.strictEqual(responseBody.firstName, 'John');
  t.strictEqual(responseBody.surname, 'Appleseed');
  t.strictEqual(responseBody.name, 'johnappleseed');
  t.strictEqual(responseBody.email, 'j.appleseed@example.com');
  t.strictEqual(responseBody.followerCount, 0);
  t.strictEqual(response.statusCode, 201);

  t.end();
});

test('auth: login an user and gets JWT', async (t: Test) => {
  const response: Response = await server.inject({
    method: 'GET',
    url: 'auth/login',
    headers: {
      authorization: `Basic am9obmFwcGxlc2VlZDphYmMxMjM=`,
    },
  });

  const responseBody: { token: string } = JSON.parse(response.body);

  t.not(responseBody.token, undefined);
  t.strictEquals(typeof responseBody.token, 'string');

  t.end();
});

test('cleanup: clean database and free resources', async (t: Test) => {
  await server.whipeDatabase();

  t.end();
});
