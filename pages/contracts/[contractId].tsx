import { getAuthAndLocaleServerSideProps, InferWithAuthServerSideProps } from '../../hocs/withAuthServerSideProps';
import Layout from '../../components/layouts/Layout';
import { useTranslation } from 'next-i18next';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';
import ContractDetail from 'components/ContractDetail';
import { useRouter } from 'next/router';
import { User } from '../../services/Model';
import React from 'react';
import { SupportTicketProvider } from '../../components/SupportTicket/SupportTicketContext';

const styles = createStyles({});

interface ContractDetailsPageProps
  extends InferWithAuthServerSideProps<typeof getServerSideProps>,
    WithStyles<typeof styles> {
  user: User;
}

function ContractDetailsPage(props: ContractDetailsPageProps) {
  const { classes, user, isMobileApp } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  const { contractId } = router.query;

  let id = typeof contractId === 'string' ? parseInt(contractId) : 0;

  return (
    <Layout hiddenContract={false} title={t('contract.title')} username={user.full_name} marginLeftRight={false}>
      <SupportTicketProvider>
        <ContractDetail id={id} phone={user.phone_number} email={user.email} fullName={user.full_name} />
      </SupportTicketProvider>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(styles)(ContractDetailsPage);
