import { Box, Grid, createStyles, makeStyles } from '@material-ui/core';
import PartnerInformation from './components/PartnerInformation';
import ServicePackageInformation from './components/ServicePackageInformation';
import Invoice from './components/Invoice';
import { useEffect, useState } from 'react';
import { CancelPaymentPopup, LoadingPopup, QRCodePopup, TermsOfUsePopup } from 'components/SharedComponents';
import ExceptionPopup from 'components/SharedComponents/ExceptionPopup';
import axios from 'axios';
import { GetSaleOrderTemplate, RequestPaymentBody, SaleOrderTemplate } from 'services/Model';
import { useRouter } from 'next/router';
import { useGetPaymentInfo, useGetStore, useSaleOrderTemplate } from 'swr_api';
import { setSelectedService, useAppDispatch, useAppSelector, open, close, PopupType } from 'redux/store';

const useStyles = makeStyles(
  createStyles({
    containerInvoice: {
      width: 400,
    },
  }),
);

function ServicePackagePaymentContent() {
  const classes = useStyles();
  const [dateExpire, setDateExpire] = useState<Date>(new Date());
  const [listService, setListService] = useState<GetSaleOrderTemplate[]>([]);
  const [dataInvoice, setDataInvoice] = useState<SaleOrderTemplate | undefined>();
  const [orderType, setOrderType] = useState<string | undefined>();
  const [imageQR, setImageQR] = useState<string>('');
  const router = useRouter();
  const { Ids, domain } = router.query;

  const paymentState = useAppSelector((state) => state.paymentState);
  const paymentPopupState = useAppSelector((state) => state.paymentPopupState);

  const dispatch = useAppDispatch();

  const { dataStore, isLoadingStore } = useGetStore(domain as string);
  const { dataSaleOrderTemplate, isLoadingSaleOrderTemplate } = useSaleOrderTemplate(
    dataStore?.product_category_id as string,
  );
  const { dataPaymentInfo, isLoadingPaymentInfo } = useGetPaymentInfo(orderType, {
    subscriptionId: dataStore?.subscription_id,
    saleOrderTemplateIds: Ids as string,
  });

  const checkOrderType = (arr: GetSaleOrderTemplate[]) => {
    if (arr.length > 0) {
      return arr.every((item) => item.order_type === arr[0].order_type) ? arr[0].order_type : undefined;
    }
    return undefined;
  };

  useEffect(() => {
    if (dataSaleOrderTemplate) {
      const IdsArray = (Ids as string).split(',');
      const listFiltered = dataSaleOrderTemplate.filter((item) => {
        return IdsArray.includes(item.sale_order_template_id.toString());
      });

      setOrderType(checkOrderType(listFiltered));
      setListService(listFiltered);
    }
  }, [dataSaleOrderTemplate]);

  useEffect(() => {
    const service24Month = listService.find((item) => item.use_period === 24);
    if (service24Month) {
      dispatch(setSelectedService(service24Month.sale_order_template_id));
    }
  }, [listService]);

  useEffect(() => {
    if (dataPaymentInfo) {
      const dataInvoice = dataPaymentInfo.find((item) => item.sale_order_template_id === paymentState.selectedService);
      if (dataInvoice) {
        setDataInvoice(dataInvoice);
      }
    }
  }, [paymentState, dataPaymentInfo]);

  const handleCreateRequestPayment = async (data: RequestPaymentBody) => {
    try {
      const response = await axios({
        method: 'post',
        url: '/api/create_request_payment_with_qr',
        data,
      });
      console.log('data create payment', response.data);
      setImageQR(response.data.result.data.qr_code);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenTerms = () => {
    dispatch(open(PopupType.TERMS_OF_USE));
  };

  const handleCloseTerms = () => {
    dispatch(close(PopupType.TERMS_OF_USE));
  };

  const handleOpenQR = () => {
    dispatch(open(PopupType.QR));
  };

  const handleCloseQR = () => {
    dispatch(close(PopupType.QR));
    dispatch(open(PopupType.CANCEL));
  };

  const handleCloseCancel = () => {
    dispatch(close(PopupType.CANCEL));
    dispatch(open(PopupType.QR));
  };

  const handleConfirmCancel = () => {
    dispatch(close(PopupType.CANCEL));
  };

  const handleOpenLoading = () => {
    dispatch(open(PopupType.LOADING));
  };

  const handleCloseLoading = () => {
    dispatch(close(PopupType.LOADING));
  };

  const handleExpired = () => {
    dispatch(close(PopupType.QR));
    dispatch(open(PopupType.EXCEPTION));
  };

  const handleCloseException = () => {
    dispatch(close(PopupType.EXCEPTION));
  };

  const handleConfirmTerms = async () => {
    handleCloseTerms();
    handleOpenLoading();
    await handleCreateRequestPayment({
      subscription_id: dataStore.subscription_id,
      sale_order_template_id: paymentState.selectedService,
      order_type: orderType,
      amount: dataInvoice?.sale_order_temp_total,
    });
    handleCloseLoading();
    setDateExpire(new Date(new Date().getTime() + 0.2 * 60000));
    handleCloseTerms();
    handleOpenQR();
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs>
          <Box display='flex' flexDirection='column' gridGap={16}>
            <PartnerInformation />
            <ServicePackageInformation
              data={listService}
              isLoading={isLoadingPaymentInfo || isLoadingStore || isLoadingSaleOrderTemplate}
            />
          </Box>
        </Grid>
        <Grid item classes={{ root: classes.containerInvoice }}>
          <Invoice
            onClick={handleOpenTerms}
            data={dataInvoice}
            isLoading={isLoadingPaymentInfo || isLoadingStore || isLoadingSaleOrderTemplate}
          />
        </Grid>
      </Grid>

      <TermsOfUsePopup
        open={paymentPopupState.TERMS_OF_USE}
        onClose={handleCloseTerms}
        siteName='sapo.vn'
        clauseType='extend'
        onConfirm={handleConfirmTerms}
      />
      <QRCodePopup
        open={paymentPopupState.QR}
        onClose={handleCloseQR}
        targetDate={dateExpire}
        onExpired={handleExpired}
        imageQR={imageQR}
      />
      <CancelPaymentPopup open={paymentPopupState.CANCEL} onClose={handleCloseCancel} onConfirm={handleConfirmCancel} />
      <LoadingPopup open={paymentPopupState.LOADING} onClose={handleCloseLoading} />
      <ExceptionPopup open={paymentPopupState.EXCEPTION} onClose={handleCloseException} />
    </Box>
  );
}

export default ServicePackagePaymentContent;
