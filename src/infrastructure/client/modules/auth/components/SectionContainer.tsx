import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const Section = styled.section`
  ${tw`flex flex-col justify-center items-center`};
  min-height: 100vh;
`;

export default function Signup({ children }: Props): JSX.Element {
  return (
    <Section>
      {children}
    </Section>
  );
}
