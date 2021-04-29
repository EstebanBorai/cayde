import React from 'react';
import { styled } from 'twin.macro';

import type { CSSProp } from 'styled-components';

export type Profile = 'Coast' | 'Fire' | 'Morning';

type Props = {
  children: string;
  css?: CSSProp;
  profile?: Profile;
}

const PROFILES: Record<Profile, { gradient: string; fallback: string; }> = {
  'Coast': {
    fallback: `rgb(34,193,195);`,
    gradient: `linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%);`,
  },
  'Fire': {
    fallback: `rgb(131,58,180);`,
    gradient: `linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);`,
  },
  'Morning': {
    fallback: `rgb(238,174,202);`,
    gradient: `radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);`,
  }
}

const Text = styled.span<{ profile: Profile }>`
  background-color: ${({ profile }) => PROFILES[profile].fallback};
  background-image: ${({ profile }) => PROFILES[profile].gradient};
  background-size: 100%;
  background-repeat: repeat;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

export default function RainbowText({ children, css, profile }: Props): JSX.Element {
  return (
    <Text css={css} profile={profile || 'Coast'}>{children}</Text>
  );
}
