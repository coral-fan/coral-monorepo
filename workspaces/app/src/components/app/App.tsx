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
import Router, { useRouter } from 'next/router';
import Script from 'next/script';
import { CLIENT_ENVIRONMENT } from 'consts';

initializeFirebaseApp();

const TAYLA_ALL_ACCESS_PASS_ID =
  CLIENT_ENVIRONMENT === 'development'
    ? '0xcB846098C5f6a86D9775a183F80aFdF174eD1171'
    : '0xcB846098C5f6a86D9775a183F80aFdF174eD1171';

const getHeaderMetadata = (origin: string, route: string) => {
  const imageBaseUrl = `${origin}/images`;
  const metadata = {
    url: `${origin}${route}`,
    title: 'Coral',
    socialMediaPreviewImageUrl: `${imageBaseUrl}/social-media-preview/${Math.ceil(
      Math.random() * 5
    )}.jpg`,
  };

  switch (route) {
    case '/artist/pinder':
      metadata.title += ' | Artist - Pinder';
      metadata.socialMediaPreviewImageUrl = `${imageBaseUrl}/pinder/social-share.jpg`;
      break;
    case '/artist/tayla-parx':
      metadata.title += ' | Artist - Tayla Parx';
      metadata.socialMediaPreviewImageUrl = `${imageBaseUrl}/tayla-parx/social-share/music-video.png`;
      break;
    case `/collection/${TAYLA_ALL_ACCESS_PASS_ID}`:
      metadata.title += ' | Collection - Tayla Parx All Access Pass';
      metadata.socialMediaPreviewImageUrl = `${imageBaseUrl}/tayla-parx/social-share/access-pass.jpeg`;
      break;
  }

  return metadata;
};

export const App = ({ Component, pageProps, initialState, origin }: CustomAppProps) => {
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

  const { asPath: route } = useRouter();

  const { url, title, socialMediaPreviewImageUrl } = getHeaderMetadata(origin, route);

  return (
    <>
      {/* below script is necessary to ensure user return to correct page when logging out with web3auth
        value for logout redirect url is set in deactivate method in connector.ts
     */}
      <Script src="/scripts/redirect.js" strategy="beforeInteractive" />
      <GlobalStyles />
      <Head>
        {/* TODO: update title post sign up campaign */}
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1" />
        <meta name="description" content="Support Your Favorite Artists. Earn Rewards." />
        {/* social media share meta data starts here*/}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Support Your Favorite Artists. Earn Rewards." />
        <meta property="og:image" content={socialMediaPreviewImageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={url} />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content="Support Your Favorite Artists. Earn Rewards." />
        <meta name="twitter:image" content={socialMediaPreviewImageUrl} />
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

  const {
    ctx: { req },
  } = appContext;

  let origin: string;

  if (req === undefined) {
    origin = window.location.origin;
  } else {
    const host = req.headers.host;
    if (host === undefined) {
      throw new Error('host is undefined.');
    }
    origin = `http${host.includes('localhost') ? '' : 's'}://${host}`;
  }

  return {
    ...initialProps,
    initialState: { isSigningUp },
    origin,
  };
};

App.getInitialProps = getInitialProps;

export type ServerSideData = Awaited<ReturnType<typeof getInitialProps>>;

type CustomAppProps = AppProps & ServerSideData;
