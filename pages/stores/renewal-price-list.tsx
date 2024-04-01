import { ThemeProvider, WithStyles, withStyles } from '@material-ui/core';
import commonStyles from 'components/Common/CommonStyles';
import Layout from 'components/layouts/Layout';
import { InferWithAuthServerSideProps, getAuthAndLocaleServerSideProps } from 'hocs/withAuthServerSideProps';
import { useTranslation } from 'next-i18next';
import merchantPortalTheme from 'merchant-portal-theme';
import { RenewalPriceListContent } from 'components';
import { useRouter } from 'next/router';

interface RenewalPriceListProps extends WithStyles<any>, InferWithAuthServerSideProps<typeof getServerSideProps> {}

function RenewalPriceList(props: RenewalPriceListProps) {
  const { user } = props;
  const { t } = useTranslation('common');

  return (
    <Layout
      title={t('store.title')}
      username={user.full_name}
      marginLeftRight={false}
      hiddenContract={user.country_code === '66'}
      navigationHeaderProps={{ title: 'Bảng giá', isGoBack: true }}
    >
      <ThemeProvider theme={merchantPortalTheme}>
        <RenewalPriceListContent />
      </ThemeProvider>
    </Layout>
  );
}
export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(RenewalPriceList);
