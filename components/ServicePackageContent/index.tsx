import { Box } from '@material-ui/core';
import ListOtherSubscription from './components/ListOtherSubscription';
import ListUpSaleSubscription from './components/ListUpSaleSubscription';
import MainSubscription from './components/MainSubscription';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGetStore } from 'swr_api';
import Exception, { ExceptionServicePackage } from './components/Exception';

function ServicePackageContent() {
  const router = useRouter();
  const { domain } = router.query;
  const { dataStore, isLoadingStore } = useGetStore(domain as string);

  return (
    <Box display='flex' flexDirection='column' gridGap={16}>
      {dataStore === false ? (
        <Exception type={ExceptionServicePackage.dataNotFound} />
      ) : (
        <>
          <MainSubscription />
          <ListOtherSubscription />
          <ListUpSaleSubscription />
        </>
      )}
    </Box>
  );
}

export default ServicePackageContent;
