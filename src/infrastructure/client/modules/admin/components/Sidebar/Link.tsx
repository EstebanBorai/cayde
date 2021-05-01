import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NextLink from 'next/link';

type Props = {
  href: string;
  text: string;
  isActive: boolean;
}

const ListItem = styled.li<{ isActive: boolean; }>`
  ${tw`flex items-center cursor-pointer text-gray-800`}
  ${tw`px-3 py-2 rounded-sm mb-0.5 last:mb-0`};
  ${(props) => props.isActive && tw`translate-x-0`};

  &:hover {
    ${tw`bg-gray-300`};
  }
`;

export default function Link({ href, text, isActive }: Props): JSX.Element {
  return (
      <NextLink href={href}>
        <ListItem isActive={isActive}>
          <span className="text-sm font-medium">{text}</span>
        </ListItem>
      </NextLink>
  );
}
