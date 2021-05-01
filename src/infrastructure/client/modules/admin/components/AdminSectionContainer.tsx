import React from 'react';
import tw, { styled } from 'twin.macro';

import Sidebar from './Sidebar';

type Props = {
  children: JSX.Element | JSX.Element[];
}

const Section = styled.section`
  ${tw`flex h-screen overflow-hidden`};
`;

export default function Signup({ children }: Props): JSX.Element {
  return (
    <Section>
      <Sidebar />
      <main className="p-4 w-full">
        {children}
      </main>
    </Section>
  );
}
