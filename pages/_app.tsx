import "../styles/global.css";
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from "next/app";
import { ToastContainer } from 'react-toastify';
import createCache from "@emotion/cache";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { Provider } from 'react-redux';
import { store } from "@redux/Redux/Store";
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme } from "@redux/theme";
import { NoSsr } from "@mui/material";
import AppCommonActionsWrapper from "@components/common/appCommonActionsWrapper";


export const muiCache = createCache({
  key: "mui",
  prepend: true,
});

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      {/* <Head>
        <title>{pageProps.pageTitle || "MyRcloud"}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content={lightTheme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico"></link>
      </Head> */}
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Add the Google Fonts link for Poppins here */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider theme={lightTheme}>
        <Provider store={store}>
          <ToastContainer />
          {/* <CacheProvider value={muiCache}> */}
          {/* <CssBaseline enableColorScheme /> */}
          <NoSsr>
            <AppCommonActionsWrapper />
            <Component {...pageProps} />
          {/* </AlertProvider> */}
        </NoSsr>
        {/* </CacheProvider> */}
      </Provider>
    </ThemeProvider >
    </>
  );
}

export default MyApp;


