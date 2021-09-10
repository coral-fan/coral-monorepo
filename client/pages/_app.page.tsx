import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Web3Manager from 'pages/Web3Manager';

export default function App({ Component, pageProps }: AppProps) {
  // return fragment to ensure DOM isn't polluted with unnecessary elements
  return (
    <>
      <Head>
        <title></title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main>
        <Web3ReactProvider
          getLibrary={(provider: ExternalProvider | JsonRpcProvider) =>
            provider instanceof JsonRpcProvider ? provider : new Web3Provider(provider)
          }
        >
          <Web3Manager>
            <Component {...pageProps} />
          </Web3Manager>
        </Web3ReactProvider>
      </main>
    </>
  );
}
