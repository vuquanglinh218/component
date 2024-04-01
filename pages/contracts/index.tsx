import commonStyles from '../../components/Common/CommonStyles';
import { Grid, withStyles, WithStyles } from '@material-ui/core';
import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import Layout from '../../components/layouts/Layout';
import { useTranslation } from 'next-i18next';
import ContractsList from '../../components/ContractsList';

type ContractsProps = WithStyles<any> & InferWithAuthServerSideProps<typeof getServerSideProps>;

function Contracts(props: ContractsProps) {
  const { classes, user, isMobileApp } = props;
  const { t } = useTranslation('common');

  return (
    <Layout
      hiddenContract={user.country_code === '66'}
      title={t('contract.title')}
      username={user.full_name}
      marginLeftRight={false}
    >
      <Grid
        container
        direction='column'
        spacing={2}
        className={classes.outermostGridDisplayBlock}
        style={{ marginBottom: 0 }}
      >
        <ContractsList user={user} />
      </Grid>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(Contracts);
