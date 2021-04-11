import React from 'react';
import Link from 'next/link';

import styles from './layout.module.scss';

const Layout = ({ children }: { children: JSX.Element }): JSX.Element => (
  <div id={styles.site_layout}>
    <header id={styles.site_header}>
      <Link href="/">
        <h1>🏡</h1>
      </Link>
      <ul>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/api/v1">API</Link>
        </li>
      </ul>
    </header>
    <main id={styles.site_main}>{children}</main>
    <footer id={styles.site_footer}>
      <p>
        If you find any issue or improvement opportunity, please feel free to
        either open a Pull Request or Issue on this project's&nbsp;
        <a
          href="https://github.com/EstebanBorai/fastify-nextjs-project"
          target="_blank"
        >
          repository
        </a>
      </p>
      <small>
        This template is licensed under the MIT License in order to follow
        NextJS's and Fastify's Licenses &nbsp;&copy;&nbsp;
        {new Date().getFullYear()}&nbsp;|&nbsp;
        <a href="https://github.com/vercel/next.js/blob/canary/license.md">
          NextJS's License
        </a>
        &nbsp;|&nbsp;
        <a href="https://github.com/fastify/fastify/blob/master/LICENSE">
          Fastify's License
        </a>
      </small>
    </footer>
  </div>
);

export default Layout;
