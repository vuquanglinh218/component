import React, { Fragment } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core';
import commonMobileStyles from '../Common/mobile/Common';

function BlankLayout(props: { title: string; children: any }) {
  const { children } = props;
  return (
    <Fragment>
      <Head>
        <title>{props.title || 'Sapo'}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href={'/static/favicon.png'} />
      </Head>
      <body>{children}</body>
    </Fragment>
  );
}

export default withStyles(commonMobileStyles)(BlankLayout);
