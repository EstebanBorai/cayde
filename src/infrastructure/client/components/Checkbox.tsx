import React from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  autoFocus?: boolean;
  disabled?: boolean;
  label: string;
  name: string;
  error?: string;
  hint?: string;
  value: boolean;
  tabIndex?: number;
  onChange(): void;
}

const Wrapper = styled.div`
  ${tw`flex flex-col mb-5`};
`;

const CheckboxWrapper = styled.div`
  ${tw`flex items-center`}
`;

const Label = styled.label`
  ${tw`text-xs text-gray-600 uppercase mb-1`};
`;

const Input = styled.input<{ error: string; }>`
  ${tw`mr-2`};
`;

const Error = styled.small`
  ${tw`font-medium text-red-400 mb-1`};
`;

const Hint = styled.small`
  ${tw`inline-block font-light text-gray-400`};
`;

export default function Checkbox({ autoFocus, disabled, name, hint, label, tabIndex, error, value, onChange }: Props): JSX.Element {
  return (
    <Wrapper>
      <Label htmlFor={label}>{label}</Label>
      <CheckboxWrapper>
        <Input
          autoFocus={autoFocus}
          checked={value}
          disabled={disabled}
          error={error}
          name={name}
          type="checkbox"
          value={value.toString()}
          tabIndex={tabIndex}
          onChange={onChange}
        />
        {hint && <Hint>{hint}</Hint>}
      </CheckboxWrapper>
      <Error>{error || ' '}</Error>
    </Wrapper>
  );
}
