//nextjs imports
import type { AppProps } from 'next/app';
import Head from 'next/head';

// application logic imports
import { initializeFirebaseApp } from 'libraries/firebase';

// styling
import { GlobalStyles } from 'styles';

// components
import { NavigationBar, Managers, Modals } from 'components/app';

// state/logic
import { useEffect, useState } from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from 'libraries/state';

initializeFirebaseApp();

import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';

export const getLibrary = (provider: ExternalProvider | JsonRpcProvider | undefined) => {
  if (provider) {
    return provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider);
  }
  return undefined;
};

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const store = initializeStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // `useEffect` never runs on the server, so we must be on the client if
    // we hit this block
    setIsMounted(true);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Web3ReactProvider getLibrary={getLibrary}>
          <ReduxProvider store={store}>
            <Managers />
            <Modals />
            {isMounted ? (
              <>
                <NavigationBar />
                <Component {...pageProps} />
              </>
            ) : null}
          </ReduxProvider>
        </Web3ReactProvider>
      </main>
    </>
  );
};

export default CustomApp;
