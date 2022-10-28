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
import { Provider as ReduxProvider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Managers, Layout, ModalOrComponent, ErrorBoundaryFallback, Toast } from './components';

// state/logic
import { useEffect, useState } from 'react';
import { initializeStore } from 'libraries/state';

// analytics
import * as Fathom from 'fathom-client';
import Router from 'next/router';
import Script from 'next/script';

initializeFirebaseApp();

export const getRandomSocialMediaPreviewImageUrl = () =>
  `https://coral.fan/images/social-media-preview/${Math.ceil(Math.random() * 5)}.jpg`;

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

  Router.events.on('routeChangeComplete', (as, routeProps) => {
    if (!routeProps.shallow) {
      Fathom.trackPageview();
    }
  });

  useEffect(() => {
    Fathom.load('NSNWRVJL', {
      includedDomains: ['www.coral.fan'],
    });
  }, []);

  return (
    <>
      {/* below script is necessary to ensure user return to correct page when logging out with web3auth
        value for logout redirect url is set in deactivate method in connector.ts
     */}
      <Script src="/scripts/redirect.js" strategy="beforeInteractive" />
      <GlobalStyles />
      <Head>
        {/* TODO: update title post sign up campaign */}
        <title>Coral</title>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1" />
        <meta name="description" content="The marketplace for a new era of music." />
        {/* social media share meta data starts here*/}
        <meta property="og:url" content="https://www.coral.fan/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Coral" />
        <meta property="og:description" content="The marketplace for a new era of music." />
        <meta property="og:image" content={getRandomSocialMediaPreviewImageUrl()} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="coral.fan" />
        <meta property="twitter:url" content="https://www.coral.fan/" />
        <meta name="twitter:title" content="Coral" />
        <meta name="twitter:description" content="The marketplace for a new era of music." />
        <meta name="twitter:image" content={getRandomSocialMediaPreviewImageUrl()} />
        {/* social media share meta data ends here*/}

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main>
          <ReduxProvider store={store}>
            <Managers />
            {isMounted ? (
              <Layout>
                <ModalOrComponent component={<Component {...pageProps} />} />
              </Layout>
            ) : null}
          </ReduxProvider>
          <Toast />
        </main>
      </ErrorBoundary>
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
