//nextjs imports
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';

// application logic imports
import { destroyCookie, parseCookies } from 'nookies';
import { COOKIE_OPTIONS } from 'consts';
import {
  initializeFirebaseApp,
  initializeFirebaseAdmin,
  getDocumentSnapshot,
} from 'libraries/firebase';

// react imports

// styling
import { GlobalStyles } from 'styles';

// components
import { NavigationBar, Managers, Modals } from 'components/app';

// state/logic
import { Web3ReactProvider } from '@web3-react/core';
import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from 'libraries/state';
import { getLibrary } from 'libraries/utils/provider';
import { getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';

initializeFirebaseApp();

export type ServerSideData = Awaited<ReturnType<typeof getInitialProps>>;

type CustomAppProps = AppProps & ServerSideData;

const CustomApp = ({ Component, pageProps, initialState }: CustomAppProps) => {
  const store = initializeStore(initialState);
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
            <NavigationBar />
            <Component {...pageProps} />
          </ReduxProvider>
        </Web3ReactProvider>
      </main>
    </>
  );
};

const getInitialProps = async (appContext: AppContext) => {
  // below is necessary as per next.js docs (https://nextjs.org/docs/advanced-features/custom-app)
  const initialProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  // keeping as comment in case distinguishing between client side or server side is necesary
  const isServerSide = ctx.hasOwnProperty('res');
  const cookies = parseCookies(ctx);
  const uid = isServerSide
    ? await initializeFirebaseAdmin().then(async () => {
        try {
          const { getApp } = await import('firebase-admin/app');
          const app = getApp();
          const { getAuth } = await import('firebase-admin/auth');
          const { uid } = await getAuth(app).verifyIdToken(cookies.token);
          return uid;
        } catch (_) {
          destroyCookie(ctx, 'token', COOKIE_OPTIONS);
        }
      })
    : getAuth(getApp()).currentUser?.uid;

  const isSigningUp = uid
    ? (await getDocumentSnapshot('is-signing-up', uid)).data() ?? false
    : false;

  return {
    ...initialProps,
    initialState: { isSigningUp },
  };
};

CustomApp.getInitialProps = getInitialProps;

export default CustomApp;
