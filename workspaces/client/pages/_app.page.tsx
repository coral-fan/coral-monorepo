//nextjs imports
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';

// application logic imports
import { destroyCookie, parseCookies } from 'nookies';
import { COOKIE_OPTIONS } from 'consts';
import { initializeFirebaseApp, getFirebaseAdmin } from 'libraries/firebase';

// react imports

// styling
import { Global } from '@emotion/react';
import { globalTokens } from 'styles/tokens';
import 'styles/global.css';

// components
import { NavigationBar, Managers, Modals } from 'components/global';

// state/logic
import { Web3ReactProvider } from '@web3-react/core';
import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from 'libraries/state';
import { getLibrary } from 'libraries/utils/provider';

initializeFirebaseApp();

const CustomApp = ({
  Component,
  pageProps,
  isTokenAuthenticated,
}: AppProps & { isTokenAuthenticated: boolean }) => {
  const store = initializeStore(isTokenAuthenticated);
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
          <ReduxProvider store={store}>
            <Managers />
            <Modals />
            <NavigationBar />
            <Component {...pageProps} />
          </ReduxProvider>
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
        .catch((error) => {
          console.log(error);
          // remove id token cookie if the id token has expired
          destroyCookie(ctx, 'token', COOKIE_OPTIONS);
        });
    }
  }

  return { ...initialProps, isTokenAuthenticated: cookies.hasOwnProperty('token') };
};

export default CustomApp;
