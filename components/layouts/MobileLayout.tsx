import React, { Fragment } from 'react';
import Head from 'next/head';
import { Container, withStyles } from '@material-ui/core';
import MobileHeader from './MobileHeader';
import commonMobileStyles from '../Common/mobile/Common';
import { MobileLayoutProps } from '../Common/mobile/MobileProps';

function Layout(props: MobileLayoutProps) {
  const { classes, children } = props;

  return (
    <Fragment>
      <Head>
        <title>{props.title || 'Sapo'}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href={'/static/favicon.png'} />
      </Head>

      {props.nonHeader ? '' : <MobileHeader {...props} />}

      <Container {...props.propParent} className={classes.mainContainer} maxWidth={false}>
        {children}
      </Container>
    </Fragment>
  );
}

export default withStyles(commonMobileStyles)(Layout);
