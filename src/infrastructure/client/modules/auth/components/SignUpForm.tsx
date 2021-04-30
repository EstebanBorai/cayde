import React from 'react';
import Button from '../../../components/Button';
import Checkbox from '../../../components/Checkbox';

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
      <Checkbox
        label="Terms and Conditions"
        name="terms"
        value={false}
        hint="Do you accept terms and conditions?"
        tabIndex={3}
        onChange={() => {}}
      />
      <Button variant="primary" type="submit" tabIndex={4}>Sign up</Button>
      <Button variant="secondary" tabIndex={5}>I have an account, log me in</Button>
    </Form>
  );
}
