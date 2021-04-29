import React from 'react';
import Head from 'next/head';

type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

const Layout = ({ children, title }: Props): JSX.Element => (
  <div>
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta property="viewport" content="width=device-width, initial-scale=1" />
      <title>Cayde{title ? ` | ` + title : ''}</title>
    </Head>
    {children}
  </div>
);

export default Layout;
