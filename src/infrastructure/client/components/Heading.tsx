import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  children: JSX.Element | JSX.Element[] | string;
  variant: 'h2' | 'h3';
}

const headingStyle = `
  margin: 1rem 0;
  padding: 0;
`;

const HTMLSecondHeading = styled.h2`
  ${headingStyle}
  ${tw`font-bold text-2xl`};
`;

const HTMLThirdHeading = styled.h3`
  ${headingStyle}
  ${tw`font-bold text-xl`};
`;

export default function Heading({ children, variant }: Props): JSX.Element {
  const HTMLHeading = variant === 'h2' ? HTMLSecondHeading : HTMLThirdHeading;

  return (
    <HTMLHeading>{children}</HTMLHeading>
  );
}
