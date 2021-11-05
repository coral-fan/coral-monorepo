import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { FirebaseError } from 'firebase-admin';

import { Global } from '@emotion/react';
import { Web3ReactProvider } from '@web3-react/core';

import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { destroyCookie, parseCookies } from 'nookies';

import { initializeFirebaseApp, getFirebaseAdmin } from 'libraries/firebase';

import { globalTokens } from 'styles/tokens';
import 'styles/global.css';

import { AuthenticationProvider } from 'libraries/authentication/provider';
import { Web3Manager, AuthenticationManager } from './components/managers';
import { NavigationBar, WrongNetworkModal } from 'pages/components';
import { COOKIE_OPTIONS } from 'consts';
import { SignUpModal } from './components/SignUpModal';
import { PurchaseModal } from './components/PurchaseModal';

initializeFirebaseApp();

const getLibrary = (provider: ExternalProvider | JsonRpcProvider | undefined) => {
  if (provider) {
    return provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider);
  }
  return undefined;
};

const CustomApp = ({
  Component,
  pageProps,
  isTokenAuthenticated,
}: AppProps & { isTokenAuthenticated: boolean }) => {
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
          <AuthenticationProvider tokenAuthenticated={isTokenAuthenticated}>
            <Web3Manager />
            <AuthenticationManager />
            <WrongNetworkModal />
            <SignUpModal />
            <PurchaseModal />
            <NavigationBar />
            <Component {...pageProps} />
          </AuthenticationProvider>
        </Web3ReactProvider>
      </main>
    </>
  );
};

CustomApp.getInitialProps = async (appContext: AppContext) => {
  // below is necessary as per next.js docs (https://nextjs.org/docs/advanced-features/custom-app)
  const initialProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const isServerSide = ctx.hasOwnProperty('res');
  // conditional logic to retrieve cookies as retrieval is handled differently on the server & client
  const cookies = isServerSide ? parseCookies(ctx) : parseCookies();
  if (isServerSide) {
    if (cookies.token) {
      const admin = await getFirebaseAdmin();
      await admin
        .auth()
        .verifyIdToken(cookies.token)
        .catch((error: FirebaseError) => {
          console.log(error);
          // remove id token cookie if the id token has expired
          destroyCookie(ctx, 'token', COOKIE_OPTIONS);
        });
    }
  }

  return { ...initialProps, isTokenAuthenticated: cookies.hasOwnProperty('token') };
};

export default CustomApp;
