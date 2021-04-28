import tw, { styled, css, theme } from 'twin.macro';

type Props = {
  variant: 'primary' | 'secondary';
  isSmall?: boolean;
}

const Button = styled.button(({ variant, isSmall }: Props) => [
  tw`px-8 py-2 rounded focus:outline-none transform duration-75`,
  tw`hocus:(scale-105 text-yellow-400)`,
  variant === 'primary' && tw`bg-black text-white border-black`,
  variant === 'secondary' && [
    css`
      box-shadow: 0 0.1em 0 0 rgba(0, 0, 0, 0.25);
    `,
    tw`border-2 border-yellow-600`,
  ],
  isSmall ? tw`text-sm` : tw`text-lg`,
  css`
    color: ${theme`colors.white`};
  `,
]);

export default Button
