import Head from 'next/head';
import { AppProps } from 'next/app';

import { DefaultSeo } from 'next-seo';

import '../styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      {/* Global site metadata */}
      <DefaultSeo
        // titleTemplate={`%s | ${global.siteTitle}`}
        defaultTitle="Gibby Floral Subscriptions"
        description="Welcome the Gibby Floral BE HER HERO subscription service. Designed to make sure you don't miss those important times of the year for the one you love!"
        openGraph={{
          type: 'website',
          site_name: 'Gibby Floral Subscriptions',
        }}
      />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
