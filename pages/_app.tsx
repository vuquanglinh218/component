import React from 'react';
import App, { AppContext } from 'next/app';
import { withMuiApp } from '../hocs/withMui';
import '../public/static/customSelect.css';
import { appWithTranslation } from 'next-i18next';
import { wrapper } from 'redux/store';
import { SWRConfig } from 'swr';
class MyApp extends App {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    // @ts-ignore
    pageProps.namespacesRequired = ['common'];
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default wrapper.withRedux(withMuiApp(appWithTranslation(MyApp)));
