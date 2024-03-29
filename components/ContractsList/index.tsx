import { Button, Grid, Paper, withStyles, WithStyles } from '@material-ui/core';
import CategoryText from '../CategoryText/CategoryText';
import React from 'react';
import { useTranslation } from 'next-i18next';
import getConfig from 'next/config';
import commonStyles from '../Common/CommonStyles';
import ContractsListTable from './components/TabTable';
import { User } from '../../services/Model';

const {
  publicRuntimeConfig: { sapoAccountsBaseUrl, coreClientId, coreOAuthCallback, registerUrl },
} = getConfig();

interface ContractsListProps extends WithStyles<any> {
  user: User;
}

function ContractsList(props: ContractsListProps) {
  const { classes, user } = props;
  const { t } = useTranslation('common');

  const contracts = (
    <Grid item xs={12} lg={8} style={{ marginBottom: '1rem', paddingRight: '38px' }}>
      <ContractsListTable email={user.email} phone={user.phone_number} />
    </Grid>
  );

  const descriptionPage = (
    <Grid item xs={12} lg={4}>
      <CategoryText captionText={t('contract.detail.listContract')} detailText={t('contract.detail.description')} />
      <Button
        onClick={() => (window.location.href = 'https://www.sapo.vn/bang-gia.html')}
        variant='outlined'
        className={classes.registerButton}
      >
        {t('contract.detail.tryForFree')}
      </Button>
    </Grid>
  );

  return (
    <Grid
      item
      container
      direction='row'
      style={{ marginBottom: '0', minHeight: '200px', paddingTop: 0, paddingRight: 0 }}
      className={classes.grandFatherGridPaddingTopBot}
    >
      <Grid container direction='column' spacing={2} className={classes.outermostGridDisplayBlock}>
        <Grid
          item
          container
          direction='row'
          spacing={3}
          className={classes.grandFatherGridPaddingTopBot}
          style={{ paddingTop: 0 }}
        >
          {descriptionPage}
          {contracts}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(commonStyles)(ContractsList);
