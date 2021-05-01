import React from 'react';
import tw, { styled } from 'twin.macro';

import AdminSectionContainer from '../components/AdminSectionContainer';
import GradientText from '../../../components/GradientText';

export default function Dashboard(): JSX.Element {
  return (
    <AdminSectionContainer>
      <GradientText>
        Hello
      </GradientText>
    </AdminSectionContainer>
  );
}
