import { Button, ThemeProvider, WithStyles, withStyles } from '@material-ui/core';
import { ServicePackageContent } from 'components';
import commonStyles from 'components/Common/CommonStyles';
import Layout from 'components/layouts/Layout';
import { InferWithAuthServerSideProps, getAuthAndLocaleServerSideProps } from 'hocs/withAuthServerSideProps';
import merchantPortalTheme from 'merchant-portal-theme';
import { useTranslation } from 'next-i18next';
import { User } from 'services/Model';

interface ServicePackageInformationProps
  extends WithStyles<any>,
    InferWithAuthServerSideProps<typeof getServerSideProps> {
  user: User;
}

function ServicePackageInformation(props: ServicePackageInformationProps) {
  const { user, ...otherProps } = props;
  const { t } = useTranslation('common');

  return (
    <Layout
      title={t('store.title')}
      username={user.full_name}
      marginLeftRight={false}
      hiddenContract={user.country_code === '66'}
      navigationHeaderProps={{ title: 'Thông tin gói dịch vụ', isGoBack: true }}
    >
      <ThemeProvider theme={merchantPortalTheme}>
        <ServicePackageContent />
      </ThemeProvider>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(ServicePackageInformation);
