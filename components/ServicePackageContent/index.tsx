import { Box } from '@material-ui/core';
import ListOtherSubscription from './components/ListOtherSubscription';
import ListUpSaleSubscription from './components/ListUpSaleSubscription';
import MainSubscription from './components/MainSubscription';

function ServicePackageContent() {
  return (
    <Box display='flex' flexDirection='column' gridGap={16}>
      <MainSubscription />
      <ListOtherSubscription />
      <ListUpSaleSubscription />
    </Box>
  );
}

export default ServicePackageContent;
