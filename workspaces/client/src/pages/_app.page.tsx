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
import { GlobalStyles } from 'styles';

// components
import { NavigationBar, Managers, Modals } from 'components/app';

// state/logic
import { Web3ReactProvider } from '@web3-react/core';
import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from 'libraries/state';
import { getLibrary } from 'libraries/utils/provider';

initializeFirebaseApp();

export type ServerSideData = Awaited<ReturnType<typeof getInitialProps>>;

type CustomAppProps = AppProps & ServerSideData;

const CustomApp = ({ Component, pageProps, data }: CustomAppProps) => {
  const store = initializeStore(data);
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
  // const isServerSide = ctx.hasOwnProperty('res');
  const cookies = parseCookies(ctx);
  // logic to remove cookie if the cookie is invalid server-side
  const isSigningUp: boolean = cookies.token
    ? await getFirebaseAdmin()
        .then(async (admin) => {
          const { uid } = await admin.auth().verifyIdToken(cookies.token);
          const isSigningUpRef = await admin.firestore().doc(`is-signing-up/${uid}`).get();
          if (isSigningUpRef.exists) {
            return isSigningUpRef.data()?.isSigningUp ?? false;
          }
          return false;
        })
        .catch(() => {
          destroyCookie(ctx, 'token', COOKIE_OPTIONS);
          return false;
        })
    : false;

  return {
    ...initialProps,
    data: {
      isTokenAuthenticated: cookies.hasOwnProperty('token') ?? false,
      isSigningUp,
    },
  };
};

CustomApp.getInitialProps = getInitialProps;

export default CustomApp;
