import React from 'react';
import tw, { styled } from 'twin.macro';

import Heading from '../../../components/Heading';
import GradientText from '../../../components/GradientText';
import SignupForm from '../components/SignUpForm';

const Section = styled.section`
  background-image: url('https://source.unsplash.com/daily');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  grid-template-columns: minmax(300px, 500px) auto;
  height: 100vh;
`;

const FormPanel = styled.div`
  ${tw`bg-white flex items-center justify-center flex-col shadow-xl`};

  grid-template-columns: 1 / 1;
  height: 100%;
  width: 100%;
`;

export default function Signup(): JSX.Element {
  return (
    <Section>
      <FormPanel>
        <Heading variant="h2">
          <>
            Welcome to Cayde!
            <br />
            <GradientText profile="Morning">Sign up and join the fun!</GradientText>
          </>
        </Heading>
        <SignupForm />
      </FormPanel>
    </Section>
  );
}
