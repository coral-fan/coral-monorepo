import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';
import { FirebaseError } from 'firebase-admin';

import { Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';

import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { destroyCookie, parseCookies } from 'nookies';
import { map, startWith } from 'rxjs';

import { initializeFirebaseApp, getFirebaseAdmin } from 'libraries/utils/firebase';

import { globalTokens } from 'styles/tokens';
import 'styles/global.css';

import { AuthenticationProvider } from 'libraries/authentication/provider';
import { Web3Manager, AuthenticationManager } from 'components/managers';
import { NavigationBar, WrongNetworkModal } from 'components';

import { useGetChainId$ } from 'libraries/hooks/metamask';
import { SUPPORTED_CHAIN_IDS } from 'consts';

initializeFirebaseApp();

const getLibrary = (provider: ExternalProvider | JsonRpcProvider | undefined) => {
  if (provider) {
    return provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider);
  }
  return undefined;
};

const getIsNetworkSupported = (chainId: string) => SUPPORTED_CHAIN_IDS.includes(parseInt(chainId));

const CustomApp = ({
  Component,
  pageProps,
  authenticated,
}: AppProps & { authenticated: boolean }) => {
  const getChainId$ = useGetChainId$();

  const [isNetworkSupported, setIsNetworkSupported] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsNetworkSupported(getIsNetworkSupported(window.ethereum.chainId));
      const isNetworkSupported$ = getChainId$().pipe(
        map(getIsNetworkSupported),
        startWith(isNetworkSupported)
      );

      const subscription = isNetworkSupported$.subscribe(setIsNetworkSupported);

      return () => subscription.unsubscribe();
    }
  }, [getChainId$, setIsNetworkSupported, isNetworkSupported]);
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
          {!isNetworkSupported && <WrongNetworkModal />}
          <AuthenticationProvider authenticated={authenticated}>
            <Web3Manager />
            <AuthenticationManager />
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
    const { res } = ctx;
    if (cookies.token) {
      const admin = await getFirebaseAdmin();
      await admin
        .auth()
        .verifyIdToken(cookies.token)
        .catch((error: FirebaseError) => {
          console.log(error);
          // remove id token cookie if the id token has expired
          destroyCookie({ res }, 'token');
        });
    }
  }

  return { ...initialProps, authenticated: cookies.hasOwnProperty('token') };
};

export default CustomApp;
