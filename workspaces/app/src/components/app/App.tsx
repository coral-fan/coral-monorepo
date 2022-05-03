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
import { Managers, Layout, ModalOrComponent, ErrorBoundaryFallback } from './components';

// state/logic
import { useEffect, useState } from 'react';
import { initializeStore } from 'libraries/state';

initializeFirebaseApp();

const getRandomSocialMediaPreviewImageUrl = () =>
  `/images/social-media-preview/${Math.ceil(Math.random() * 5)}.png`;

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
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      <GlobalStyles />
      <Head>
        {/* TODO: update title post sign up campaign */}
        <title>Early Sign Up Campaign | CORAL</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A modern marketplace for music, collectibles, events and experiences, is coming soon. Sign up for early access."
        />
        <meta property="og:image" content={getRandomSocialMediaPreviewImageUrl()} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ReduxProvider store={store}>
          <Managers />
          {isMounted ? (
            <Layout>
              <ModalOrComponent component={<Component {...pageProps} />} />
            </Layout>
          ) : null}
        </ReduxProvider>
      </main>
    </ErrorBoundary>
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
