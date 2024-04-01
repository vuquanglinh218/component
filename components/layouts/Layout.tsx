import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Box, Container, withStyles, WithStyles } from '@material-ui/core';
import NavBar from './NavBar';
import styles from './styles';
import NavigationHeader, { NavigationHeaderProps } from './NavigationHeader';
import clsx from 'clsx';

export interface LayoutProps extends WithStyles<any> {
  children: ReactNode;
  username: string;
  title: string;
  marginLeftRight: boolean | true;
  hiddenContract: boolean;
  navigationHeaderProps?: NavigationHeaderProps;
}

function Layout(props: LayoutProps) {
  const { classes, children, hiddenContract, navigationHeaderProps } = props;

  return (
    <div className={classes.backgroundDiv}>
      <Head>
        <title>{props.title || 'Sapo'}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link rel='shortcut icon' href={'/static/favicon.png'} />
      </Head>

      <NavBar
        title={navigationHeaderProps ? undefined : props.title}
        username={props.username}
        hiddenContract={hiddenContract}
        navigationHeaderProps={navigationHeaderProps}
      />

      <Container
        className={clsx(
          props.marginLeftRight ? classes.mainContainer : classes.mainContainerMarginTopOnly,
          navigationHeaderProps && classes.mainContainerMarginTopWithNavHeader,
        )}
        maxWidth={false}
      >
        {children}
      </Container>
    </div>
  );
}

export default withStyles(styles)(Layout);
