import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  autoFocus?: boolean;
  children: JSX.Element | JSX.Element | string;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  tabIndex?: number;
  variant: 'primary' | 'secondary';
  onClick?(): void;
}

type Variant = 'primary' | 'secondary';

const HTMLButton = styled.button<{ variant: Variant; }>`
  ${tw`bg-gray-50 px-4 py-2.5 rounded outline-none`};
  ${tw`border  mb-1 uppercase text-sm mx-2`};
  ${(props) => props.variant === 'primary' ? tw`bg-indigo-500 text-white` : ''};
  ${(props) => props.variant === 'secondary' ? tw`bg-green-500 text-white` : ''};

  &:hover {
    ${tw`cursor-pointer`};
    ${(props) => props.variant === 'primary' ? tw`bg-indigo-600 text-white` : ''};
    ${(props) => props.variant === 'secondary' ? tw`bg-green-600 text-white` : ''};

    transition: 250ms background-color ease;
  }

  &:first-of-type {
    ${tw`ml-0`};
  }

  &:last-of-type {
    ${tw`mr-0`};
  }
`;

export default function Button({ autoFocus, children, disabled, type="button", tabIndex, variant="primary", onClick }: Props): JSX.Element {
  return (
    <HTMLButton
      autoFocus={autoFocus}
      disabled={disabled}
      type={type}
      tabIndex={tabIndex}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </HTMLButton>
  );
}
