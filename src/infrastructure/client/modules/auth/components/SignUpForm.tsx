import React from 'react';

import TextField from '../../../components/TextField';
import Form from './Form';

export default function SignupForm(): JSX.Element {
  return (
    <Form>
      <TextField
        autoFocus
        name="password"
        label="Email"
        type="email"
        value="cayde@cayde.com"
        tabIndex={1}
        onChange={() => {}}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value="cayde@cayde.com"
        tabIndex={2}
        onChange={() => {}}
      />
    </Form>
  );
}
