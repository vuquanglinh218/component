import Image from 'next/image';
import React from 'react';
import { Fragment } from 'react';
import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

let notFoundStyle = (theme) => {
  return createStyles({
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingLeft: '15px',
      paddingRight: '15px',
      maxWidth: '595px',
      position: 'relative',
      width: '100%',
    },
    labelNotFound: {
      fontWeight: 500,
      color: '#1E5B89',
      fontSize: '24px',
      lineHeight: '34px',
      paddingTop: '38px',
      textAlign: 'center',
    },
    imageNotFound: {
      width: 600,
      paddingTop: '12px',
      [theme.breakpoints.up('sm')]: {
        paddingTop: '48px',
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: '173px',
      },
    },
  });
};

function NotFoundPage(props) {
  const { classes } = props;
  const { t } = useTranslation('common');
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.imageNotFound}>
          <Image src='/static/404.svg' alt='not-found' width='600' height='350' />
        </div>
        <p className={classes.labelNotFound}>{t('error.notFound')}</p>
      </div>
    </Fragment>
  );
}
export const getStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.location || 'vi', ['common'])),
    },
  };
};

export default withStyles(notFoundStyle)(appWithTranslation(NotFoundPage));
