import React from 'react';
import Head from 'next/head';
import '../styles/styles.css';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import getBaseURL from '../utils/baseURL';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const themeLight = createMuiTheme({
  palette: {
    background: {
      default: "#FFFFFF"
    }
  }
});

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [baseURL, setBaseURL] = React.useState(null);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    setBaseURL(getBaseURL(window));
  }, []);

  return (
    <MuiThemeProvider theme={themeLight}>
      <CssBaseline />
    <React.Fragment>
      <Head>
        <title>WiFi App</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {baseURL ? <Component {...pageProps} baseURL={baseURL} /> : null}
    </React.Fragment>
    </MuiThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
