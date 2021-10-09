import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

import { destroyCookie, parseCookies } from 'nookies';

import { Global } from '@emotion/react';

import { Web3Manager, AuthenticationManager } from 'components/managers';

import { FirebaseError } from 'firebase-admin';

import { initializeFirebaseApp, getFirebaseAdmin } from 'libraries/utils/firebase';

import { LOGIN_ROUTE, SUPPORTED_NETWORKS } from 'consts';

import { globalTokens } from 'styles/tokens';

import 'styles/global.css';
import { useEffect } from 'react';
import { map, startWith } from 'rxjs';

import { getChainId$ } from 'libraries/observables/metamask';

initializeFirebaseApp();

const getLibrary = (provider: ExternalProvider | JsonRpcProvider | undefined) => {
  if (provider) {
    return provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider);
  }
  return undefined;
};

const getIsNetworkSupported = (chainId: string) => SUPPORTED_NETWORKS.includes(parseInt(chainId));
const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const isNetworkSupported = getIsNetworkSupported(window.ethereum?.chainId ?? '0xa86a');
    const isNetworkSupported$ = getChainId$().pipe(
      map(getIsNetworkSupported),
      startWith(isNetworkSupported)
    );

    const subscription = isNetworkSupported$.subscribe((isNetworkSupported) =>
      console.log(isNetworkSupported)
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Global styles={globalTokens} />
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3Manager />
          <AuthenticationManager />
          <Component {...pageProps} />
        </Web3ReactProvider>
      </main>
    </>
  );
};

// TODO: move this logic to a reusable createGetServerSideProps functions that can be shared for pages that require authentication?
App.getInitialProps = async (appContext: AppContext) => {
  const { ctx } = appContext;
  // check if running server side since res object only exists on server side
  if (ctx.res) {
    const { res } = ctx;
    const cookies = parseCookies(ctx);
    if (cookies.token) {
      const admin = await getFirebaseAdmin();
      await admin
        .auth()
        .verifyIdToken(cookies.token)
        .catch((error: FirebaseError) => {
          console.log(error);
          // remove id token cookie if the id token has expired
          if (error.code === 'auth/id-token-expired') {
            destroyCookie({ res }, 'token');
          }
          // if the current route isn't the login route, redirect to the login route
          if (ctx.pathname !== LOGIN_ROUTE) {
            res.writeHead(302, {
              Location:
                ctx.pathname === '/'
                  ? LOGIN_ROUTE
                  : `${LOGIN_ROUTE}?redirect=${ctx.pathname.replace('/', '')}`,
            });
            res.end();
          }
        });
      if (ctx.pathname === LOGIN_ROUTE) {
        res.writeHead(302, { Location: '/' });
        res.end();
      }
      // if cookie doesn't exist, redirect to login page
    } else {
      if (ctx.pathname !== LOGIN_ROUTE) {
        res.writeHead(302, {
          Location:
            ctx.pathname === '/'
              ? LOGIN_ROUTE
              : `${LOGIN_ROUTE}?redirect=${ctx.pathname.replace('/', '')}`,
        });
        res.end();
      }
    }
  } else {
    // client side logic goes here
  }
  return {};
};

export default App;
