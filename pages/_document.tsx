import React from 'react';
import { ServerStyleSheets } from '@material-ui/styles';
import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
  public static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collect(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      ctx.renderPage(sheet);
    }
  }
  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.props.initialLanguage}>
        <Head>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
            viewport-fit='cover'
          />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
          <meta name='HandheldFriendly' content='true' />
          <link rel='preload' href={'/static/font/helveticaneue.ttf'} as='font' crossOrigin='' />
          <link rel='preload' href={'/static/font/helveticaneue_bold.ttf'} as='font' crossOrigin='' />
          <link rel='preload' href={'/static/font/helveticaneue_light.ttf'} as='font' crossOrigin='' />
          <link rel='preload' href={'/static/font/helveticaneue_medium.ttf'} as='font' crossOrigin='' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
