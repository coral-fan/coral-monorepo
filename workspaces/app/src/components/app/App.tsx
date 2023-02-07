//nextjs imports
import type { AppContext, AppProps } from 'next/app';
import NextApp from 'next/app';
import NextHead from 'next/head';

// application logic imports
import { initializeFirebaseApp } from 'libraries/firebase';
import { isServerSide } from 'libraries/utils';
import { getIsUserSigningUp, getUidClientSide, getUidServerSide } from 'libraries/models';

// styling
import { GlobalStyles } from 'styles';

// components
import { Provider as ReduxProvider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Managers, Layout, ModalOrComponent, ErrorBoundaryFallback, Toast } from './components';

// state/logic
import { useEffect, useState } from 'react';
import { initializeStore } from 'libraries/state';
import {
  getInitialTaylaParxStoreState,
  TaylaParxProvider,
  useCreateTaylaParxStore,
  useTaylaParxStore,
} from '../../../pages/artist/tayla-parx/store';

// analytics
import * as Fathom from 'fathom-client';
import Router, { useRouter } from 'next/router';
import Script from 'next/script';

initializeFirebaseApp();

const useHeaderMetadata = (origin: string) => {
  const imageBaseUrl = `${origin}/images`;
  const { asPath: route } = useRouter();
  const {
    metadata: {
      id: { allAccessPass: taylaParxAllAccessPadId },
    },
  } = useTaylaParxStore();

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
    case `/collection/${taylaParxAllAccessPadId}`:
      metadata.title += ' | Collection - Tayla Parx All Access Pass';
      metadata.socialMediaPreviewImageUrl = `${imageBaseUrl}/tayla-parx/social-share/access-pass.jpeg`;
      break;
  }

  return metadata;
};

interface HeadProps {
  origin: string;
}

const Head = ({ origin }: HeadProps) => {
  const { title, url, socialMediaPreviewImageUrl } = useHeaderMetadata(origin);
  return (
    <NextHead>
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
    </NextHead>
  );
};

export const App = ({
  Component,
  pageProps,
  origin,
  initialState,
  initialTaylaParxStoreState,
}: CustomAppProps) => {
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

  const store = initializeStore(initialState);

  const createTaylaParxStore = useCreateTaylaParxStore(initialTaylaParxStoreState);

  return (
    <>
      {/* below script is necessary to ensure user return to correct page when logging out with web3auth
        value for logout redirect url is set in deactivate method in connector.ts
     */}
      <Script src="/scripts/redirect.js" strategy="beforeInteractive" />
      <GlobalStyles />
      <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
        <main>
          <TaylaParxProvider createStore={createTaylaParxStore}>
            <Head origin={origin} />
            <ReduxProvider store={store}>
              <Managers />
              {isMounted ? (
                <Layout>
                  <ModalOrComponent component={<Component {...pageProps} />} />
                </Layout>
              ) : null}
            </ReduxProvider>
          </TaylaParxProvider>
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
  const initialTaylaParxStoreState = await getInitialTaylaParxStoreState(uid);

  return {
    ...initialProps,
    initialState: { isSigningUp },
    initialTaylaParxStoreState,
    origin,
  };
};

App.getInitialProps = getInitialProps;

export type ServerSideData = Awaited<ReturnType<typeof getInitialProps>>;

type CustomAppProps = AppProps<{ origin: string }> & ServerSideData;
