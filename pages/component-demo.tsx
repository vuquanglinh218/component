import {
  Box,
  Button,
  Grid,
  Popover,
  Theme,
  ThemeProvider,
  Typography,
  WithStyles,
  createStyles,
  makeStyles,
  withStyles,
} from '@material-ui/core';
import {
  CancelPaymentPopup,
  ContactPopup,
  ListStore,
  LoadingPopup,
  PaymentSuccessPopup,
  QRCodePopup,
  TermsOfUsePopup,
} from 'components';
import commonStyles from 'components/Common/CommonStyles';
import {
  MainSubscription,
  ListOtherSubscription,
  ListUpSaleSubscription,
  PartnerInformation,
  Invoice,
  RenewalTable,
} from 'components/MerchantPortalComponents';
import AccordionCustom from 'components/MerchantPortalComponents/AccordionCustom';
import TableDataHistory from 'components/MerchantPortalComponents/TableDataHistory';
import TableTest from 'components/MerchantPortalComponents/TableTest';
import Exception from 'components/PurchaseHistoryContent/components/Exception';
import ExceptionPopup from 'components/SharedComponents/ExceptionPopup';

import Layout from 'components/layouts/Layout';
import { InferWithAuthServerSideProps, getAuthAndLocaleServerSideProps } from 'hocs/withAuthServerSideProps';
import merchantPortalTheme from 'merchant-portal-theme';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { countSlice, useAppDispatch, useAppSelector } from 'redux/store';
import { useGetListStore } from 'swr_api';

interface ComponentDemoProps extends WithStyles<any>, InferWithAuthServerSideProps<typeof getServerSideProps> {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

function ComponentDemo(props: ComponentDemoProps) {
  const { user } = props;
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const { t } = useTranslation('common');
  const classes = useStyles();
  const { stores, isLoading } = useGetListStore(['0993758747test-sapostaging.mysapogo.com']);

  useEffect(() => {
    console.log('stores', stores);
  }, [stores]);

  const count = useAppSelector((state) => state[countSlice.name]);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(countSlice.actions.increment());
  };

  const handleDecrement = () => {
    dispatch(countSlice.actions.decrement());
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Layout
      title={t('store.title')}
      username={user.full_name}
      marginLeftRight={false}
      hiddenContract={user.country_code === '66'}
    >
      <ThemeProvider theme={merchantPortalTheme}>
        <Box display='flex' flexDirection='column' gridGap={20}>
          <ListStore user={user} />

          <MainSubscription />
          <ListOtherSubscription />
          <ListUpSaleSubscription />
          <Grid container spacing={2}>
            <Grid item xs>
              <PartnerInformation />
            </Grid>
            <Grid item style={{ width: '400px' }}>
              <Invoice />
            </Grid>
          </Grid>

          <TableTest />
          <RenewalTable />

          <TableDataHistory />

          <Button onClick={handleOpenPopup}>Open Popup</Button>
          <TermsOfUsePopup
            open={openPopup}
            onClose={handleClosePopup}
            siteName='sapo.vn'
            clauseType='addons'
            // staffInfo={{ name: 'Nguyễn Bảo Anh', phoneNumber: '0984 557 489' }}
          />

          <AccordionCustom summary='Xem thêm các gói dịch vụ khác' />

          <div>
            Test Page
            <Button onClick={handleIncrement}>Tăng</Button>
            <Button onClick={handleDecrement}>Giảm</Button>
            <p>Count; {count.count}</p>
          </div>
        </Box>
      </ThemeProvider>
    </Layout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(ComponentDemo);
