import React, { Component } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { CssBaseline, NoSsr } from '@material-ui/core';
import theme from '../theme';
import { AppContext } from 'next/app';
import { SnackbarProvider } from 'notistack';
import { AppSource } from '../utils/AppSource';
import themeMobile from '../theme/mobileIndex';
const useStyles = makeStyles((theme) => ({
  variantSuccess: { backgroundColor: '#0FD186 !important' },
  variantError: { backgroundColor: '#FF4D4D !important' },
}));

const SnackbarProviderCustom = ({ App }) => {
  const classes = useStyles();
  return (
    <SnackbarProvider maxSnack={1} hideIconVariant={true} classes={classes}>
      {App}
    </SnackbarProvider>
  );
};
export function withMuiApp(App) {
  return class AppWithMui extends Component {
    public static async getInitialProps(appContext: AppContext) {
      let initialProps = {};

      if (typeof App.getInitialProps === 'function') {
        initialProps = await App.getInitialProps(appContext);
      }

      return { ...initialProps };
    }

    public componentDidMount() {
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    public render() {
      let $theme = theme;
      if (this.props['pageProps'].appSource && AppSource[this.props['pageProps'].appSource]) $theme = themeMobile;
      return (
        <NoSsr>
          <ThemeProvider theme={$theme}>
            <CssBaseline />
            <SnackbarProviderCustom App={<App {...this.props} />} />
          </ThemeProvider>
        </NoSsr>
      );
    }
  };
}
