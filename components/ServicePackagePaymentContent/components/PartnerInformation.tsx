import { Box, Typography } from '@material-ui/core';
import { Container, Descriptions } from 'components/SharedComponents';
import { DescriptionProps } from 'components/SharedComponents/Descriptions';
import Website from 'components/icons/Website';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGetStore } from 'swr_api';
import PartnerInformationSkeleton from '../skeletons/PartnerInformationSkeleton';

function PartnerInformation() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { domain } = router.query;
  const [dataPartner, setDataPartner] = useState<DescriptionProps['data']>([]);

  const { dataStore, isLoadingStore } = useGetStore(domain as string);

  useEffect(() => {
    if (dataStore) {
      setDataPartner([
        {
          label: t('servicePackagePayment.customerName'),
          value: dataStore.customer_name,
        },
        {
          label: t('servicePackagePayment.phoneNumber'),
          value: dataStore.customer_phone,
        },
        {
          label: t('servicePackagePayment.email'),
          value: dataStore.customer_email,
        },

        {
          label: t('servicePackagePayment.siteName'),
          value: (
            <Box display='flex' alignItems='center' gridGap={4}>
              <Website />
              <Typography variant='body1'>{dataStore.domain_name}</Typography>
            </Box>
          ),
        },
      ]);
    }
  }, [dataStore]);

  return (
    <>
      {isLoadingStore ? (
        <PartnerInformationSkeleton />
      ) : (
        <Container title={t('servicePackagePayment.partnerInformation')}>
          <Descriptions data={dataPartner} />
        </Container>
      )}
    </>
  );
}

export default PartnerInformation;
