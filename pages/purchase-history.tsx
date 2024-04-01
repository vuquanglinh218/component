import { ThemeProvider, WithStyles, withStyles } from '@material-ui/core';
import { PurchaseHistoryContent } from 'components';
import commonStyles from 'components/Common/CommonStyles';
import Layout from 'components/layouts/Layout';
import { InferWithAuthServerSideProps, getAuthAndLocaleServerSideProps } from 'hocs/withAuthServerSideProps';
import merchantPortalTheme from 'merchant-portal-theme';
import { useTranslation } from 'next-i18next';

interface PurchaseHistoryProps extends WithStyles<any>, InferWithAuthServerSideProps<typeof getServerSideProps> {}

function PurchaseHistory(props: PurchaseHistoryProps) {
  const { user, ...otherProps } = props;
  const { t } = useTranslation('common');

  return (
    <Layout
      title={t('store.title')}
      username={user.full_name}
      marginLeftRight={false}
      hiddenContract={user.country_code === '66'}
      navigationHeaderProps={{ title: 'Lịch sử giao dịch' }}
    >
      <ThemeProvider theme={merchantPortalTheme}>
        <PurchaseHistoryContent />
      </ThemeProvider>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(PurchaseHistory);
