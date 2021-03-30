import Layout from '../components/Layout';

import type { NextComponentType } from 'next';

import '../styles/global.scss';

function App({
  Component,
  pageProps,
}: {
  Component: NextComponentType;
  pageProps: Record<string, unknown>;
}): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
