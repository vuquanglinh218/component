import { Box, Grid } from '@material-ui/core';
import PartnerInformation from './components/PartnerInformation';
import ServicePackageInformation from './components/ServicePackageInformation';
import Invoice from './components/Invoice';

function ContentServicePackagePayment() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs>
          <Box display='flex' flexDirection='column' gridGap={16}>
            <PartnerInformation />
            <ServicePackageInformation />
          </Box>
        </Grid>
        <Grid item style={{ width: '400px' }}>
          <Invoice />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContentServicePackagePayment;
