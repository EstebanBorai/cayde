import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import Heading from '../../../../components/Heading';
import Link from './Link';

const SidebarWrapper = styled.section`
  ${tw`lg:w-64`};
`;

// ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}

const Navigation = styled.nav<{ isOpen: boolean; }>`
  ${tw`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto ease-in-out`};
  ${tw`lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto`};
  ${tw`w-64 flex-shrink-0 bg-gray-200 p-4 transition-transform duration-200`};
  ${(props) => props.isOpen ? tw`translate-x-0` : tw`-translate-x-64`};
`;

export default function Sidebar(): JSX.Element {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <SidebarWrapper>
      <Navigation isOpen={isOpen}>
        <ul className="m-0 list-style-none">
          <Link text="General" href="/admin" isActive />
          <Link text="Users" href="/admin/users" isActive />
        </ul>
      </Navigation>
    </SidebarWrapper>
  );
}
