import { Box, Button, ButtonGroup, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
import { useState } from 'react';
import clsx from 'clsx';
import { Container } from 'components';
import StoreItem, { StoreType } from './components/StoreItem';
import { useTranslation } from 'next-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonDisabled: {
      color: theme.palette.grey[400],
    },
  }),
);

function ListStore() {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [status, setStatus] = useState<StoreType>(StoreType.paid);

  const handleFilterTrail = () => {
    setStatus(StoreType.trail);
  };

  const handleFilterPaid = () => {
    setStatus(StoreType.paid);
  };

  return (
    <Container title={t('store.detail.descriptionTitle')} variantTitle='body2'>
      <Box marginBottom='12px'>
        <ButtonGroup variant='text'>
          <Button
            classes={{ root: clsx(status !== StoreType.paid && classes.buttonDisabled) }}
            onClick={handleFilterPaid}
          >
            {t('store.detail.paid')}
          </Button>
          <Button
            classes={{ root: clsx(status !== StoreType.trail && classes.buttonDisabled) }}
            onClick={handleFilterTrail}
          >
            {t('store.detail.trail')}
          </Button>
        </ButtonGroup>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <StoreItem disabled />
        </Grid>
        <Grid item xs={4}>
          <StoreItem isLoading />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ListStore;
