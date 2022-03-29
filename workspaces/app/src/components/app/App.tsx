//nextjs imports
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import Head from 'next/head';

// application logic imports
import { initializeFirebaseApp } from 'libraries/firebase';
import { getIsUserSigningUp } from 'libraries/models';
import { isServerSide } from 'libraries/utils';
import { getUidClientSide, getUidServerSide } from 'libraries/models';

// styling
import { GlobalStyles } from 'styles';

// components
import { Managers, Layout, Modals } from './components';

// state/logic
import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { initializeStore } from 'libraries/state';

initializeFirebaseApp();

const conditionallyRenderComponent = (a: JSX.Element, b: JSX.Element) => {
  const shouldRenderA = Object.keys(a.props).length > 0;
  return shouldRenderA ? a : b;
};

export const App = ({ Component, pageProps, initialState }: CustomAppProps) => {
  const store = initializeStore(initialState);

  /*
    is mounted check logic is necessary to prevent SSRed html from diverging to CSRed html.
    see: https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  */
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
        <ReduxProvider store={store}>
          <Managers />
          {isMounted ? (
            <Layout>
              {conditionallyRenderComponent(<Modals />, <Component {...pageProps} />)}
            </Layout>
          ) : null}
        </ReduxProvider>
      </main>
    </>
  );
};

const getInitialProps = async (appContext: AppContext) => {
  // below is necessary as per next.js docs (https://nextjs.org/docs/advanced-features/custom-app)
  const initialProps = await NextApp.getInitialProps(appContext);
  const { ctx } = appContext;
  const uid = isServerSide() ? await getUidServerSide(ctx) : getUidClientSide();
  const isSigningUp: boolean = uid ? await getIsUserSigningUp(uid) : false;

  return {
    ...initialProps,
    initialState: { isSigningUp },
  };
};

App.getInitialProps = getInitialProps;

export type ServerSideData = Awaited<ReturnType<typeof getInitialProps>>;

type CustomAppProps = AppProps & ServerSideData;
