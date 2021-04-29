import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  autoFocus?: boolean;
  label: string;
  name: string;
  type?: 'text' | 'password' | 'email' | 'number';
  error?: string;
  hint?: string;
  value: string | number;
  tabIndex?: number;
  onChange(): void;
}

const TextFieldWrapper = styled.div`
  ${tw`flex flex-col mb-5`};
`;

const Label = styled.label`
  ${tw`text-xs text-gray-600 uppercase mb-1`};
`;

const Input = styled.input<{ error: string; }>`
  ${(props) => !!props.error ? tw`border-red-400` : tw`border-gray-200`};
  ${tw`bg-gray-50 px-4 py-2.5 rounded outline-none`};
  ${tw`border  mb-1`};

  &:hover, &:focuse, &:active {
    ${(props) => !!props.error ? tw`border-red-400` : tw`border-gray-200`};
  }

  &:hover {
    ${tw`cursor-pointer`};
  }

  &:focus {
    ${tw`bg-gray-100 px-4 py-2.5 rounded outline-none`};

    transition: 250ms background-color ease;
  }
`;

const Error = styled.small`
  ${tw`font-medium text-red-400 mb-1`};
`;

const Hint = styled.small`
  ${tw`font-light text-blue-400 mb-1`};
`;

export default function TextField({ autoFocus, name, hint, label, tabIndex, type = 'text', error, value, onChange }: Props): JSX.Element {
  return (
    <TextFieldWrapper>
      <Label htmlFor={label}>{label}</Label>
      <Input autoFocus={autoFocus} error={error} name={name} type={type} value={value} tabIndex={tabIndex} onChange={onChange} />
      { hint && <Hint>{hint}</Hint> }
      <Error>{error || ' '}</Error>
    </TextFieldWrapper>
  );
}
