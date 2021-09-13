import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import Web3Manager from 'pages/Web3Manager';
import { parseCookies } from 'nookies';

import { initializeFirebaseApp, getFirebaseAdmin } from 'utils/firebase';
import { LOGIN_ROUTE } from 'utils/consts/routes';

initializeFirebaseApp();

const getLibrary = (provider: ExternalProvider | JsonRpcProvider) =>
  provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider);

const App = ({ Component, pageProps }: AppProps) => {
  // return fragment to ensure DOM isn't polluted with unnecessary elements
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3Manager>
            <Component {...pageProps} />
          </Web3Manager>
        </Web3ReactProvider>
      </main>
    </>
  );
};

/* implementation inspired by:
  - https://colinhacks.com/essays/nextjs-firebase-authentication
*/
App.getInitialProps = async (appContext: AppContext) => {
  if (typeof window === 'undefined') {
    const { ctx } = appContext;
    const admin = await getFirebaseAdmin();
    try {
      const cookies = parseCookies(ctx);
      await admin.auth().verifyIdToken(cookies.token);
      if (ctx.pathname === LOGIN_ROUTE) {
        ctx.res?.writeHead(302, { Location: '/' });
        ctx.res?.end();
      }
    } catch (error) {
      if (ctx.pathname !== LOGIN_ROUTE) {
        ctx.res?.writeHead(302, { Location: LOGIN_ROUTE });
        ctx.res?.end();
      }
    }
  }

  return {};
};

export default App;
