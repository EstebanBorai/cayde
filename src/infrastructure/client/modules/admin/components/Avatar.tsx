import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  src?: string;
  squareSize: number;
}

const Image = styled.img`
  ${tw`rounded-full`};
`;

const Figure = styled.figure<{ squareSize: number; }>`
  height: ${(props) => props.squareSize}px;
  width: ${(props) => props.squareSize}px;
`;

export default function Signup({ src, squareSize }: Props): JSX.Element {
  return (
    <Figure squareSize={squareSize}>
      <Image
        alt="Avatar"
        src={src || 'https://via.placeholder.com/' + squareSize}
        height={squareSize}
        width={squareSize}
      />
    </Figure>
  );
}
