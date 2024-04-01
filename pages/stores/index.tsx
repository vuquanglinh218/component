import { Button, ThemeProvider, WithStyles, withStyles } from '@material-ui/core';
import { ListStore } from 'components';
import commonStyles from 'components/Common/CommonStyles';
import Layout from 'components/layouts/Layout';
import { InferWithAuthServerSideProps, getAuthAndLocaleServerSideProps } from 'hocs/withAuthServerSideProps';
import merchantPortalTheme from 'merchant-portal-theme';
import { useTranslation } from 'next-i18next';
import getConfig from 'next/config';

type StoresProps = WithStyles<any> & InferWithAuthServerSideProps<typeof getServerSideProps>;

const {
  publicRuntimeConfig: { sapoAccountsBaseUrl, coreClientId, coreOAuthCallback, registerUrl, homePageUrl },
} = getConfig();

function Stores(props: StoresProps) {
  const { user } = props;
  const { t } = useTranslation('common');

  const handleRegisterTrial = () => {
    return (window.location.href =
      user.country_code === '84'
        ? `${sapoAccountsBaseUrl}/oauth/authorize?client_id=${coreClientId}&redirect_uri=${coreOAuthCallback}&state={%22redirectUrl%22:%22${registerUrl}%22,%22type%22:%22signup%22}&scope=profile&response_type=code`
        : homePageUrl);
  };

  return (
    <Layout
      title={t('store.title')}
      username={user.full_name}
      marginLeftRight={false}
      hiddenContract={user.country_code === '66'}
      navigationHeaderProps={{
        title: t('store.listStore'),
        actionRight: (
          <Button onClick={handleRegisterTrial} variant='contained'>
            {t('store.detail.tryForFree')}
          </Button>
        ),
      }}
    >
      <ThemeProvider theme={merchantPortalTheme}>
        <ListStore user={user} />
      </ThemeProvider>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(Stores);
