//nextjs imports
import type { AppProps } from 'next/app';
import Head from 'next/head';

// application logic imports
import { initializeFirebaseApp } from 'libraries/firebase';

// styling
import { GlobalStyles } from 'styles';

// components
import { NavigationBar, Managers, Modals } from './components';

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

export const App = ({ Component, pageProps }: AppProps) => {
  const store = initializeStore();
  /*
    is mounted check logic is necessary to prevent SSRed html from diverging to CSRed html.
    see: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
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
