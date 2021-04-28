import React from 'react';

import Button from './Button';

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => (
  <Button isSmall variant="primary" >Hola</Button>
);

export default Layout;
