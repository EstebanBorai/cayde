import React from 'react';

import Layout from '../../components/Layout';
import Signup from '../../modules/auth/screens/Signup';

export default function SignupPage(): JSX.Element {
  return (
    <Layout title="Sign up">
      <Signup />
    </Layout>
  );
}
