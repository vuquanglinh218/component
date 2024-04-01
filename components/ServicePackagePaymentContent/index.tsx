import { Box, Grid, createStyles, makeStyles } from '@material-ui/core';
import PartnerInformation from './components/PartnerInformation';
import ServicePackageInformation from './components/ServicePackageInformation';
import Invoice from './components/Invoice';
import { useState } from 'react';
import { CancelPaymentPopup, LoadingPopup, QRCodePopup, TermsOfUsePopup } from 'components/SharedComponents';
import ExceptionPopup from 'components/SharedComponents/ExceptionPopup';

function useFakeFetch(url) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);

    // Tạo một Promise mới
    return new Promise((resolve, reject) => {
      // Giả lập việc gửi request và nhận response sau một khoảng thời gian ngẫu nhiên
      setTimeout(() => {
        // Tạo một response giả bằng cách tạo một object
        const response = {
          status: 200,
          data: `Data fetched from ${url}`, // Đây là dữ liệu giả lập
        };

        // Giả sử nếu status là 200 thì resolve Promise, ngược lại reject
        if (response.status === 200) {
          resolve(response); // Trả về response
        } else {
          reject(new Error('Failed to fetch data')); // Trả về lỗi nếu request không thành công
        }
      }, Math.random() * 3000); // Thời gian ngẫu nhiên từ 0 đến 3 giây
    })
      .then((response) => {
        setData('Hello');
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { data, isLoading, error, fetchData };
}

const useStyles = makeStyles(
  createStyles({
    containerInvoice: {
      width: 400,
    },
  }),
);

function ServicePackagePaymentContent() {
  const { isLoading, data, error, fetchData } = useFakeFetch('hdhfu');
  const classes = useStyles();
  const [isOpenTerms, setIsOpenTerms] = useState<boolean>(false);
  const [isOpenQR, setIsOpenQR] = useState<boolean>(false);
  const [isOpenCancel, setIsOpenCancel] = useState<boolean>(false);
  const [isOpenLoading, setIsOpenLoading] = useState<boolean>(false);
  const [isOpenException, setIsOpenException] = useState<boolean>(false);
  const [dateExpire, setDateExpire] = useState<Date>(new Date());

  const handleOpenTerms = () => {
    setIsOpenTerms(true);
  };
  const handleCloseTerms = () => {
    setIsOpenTerms(false);
  };

  const handleConfirmTerms = async () => {
    handleCloseTerms();
    handleOpenLoading();
    await fetchData();
    handleCloseLoading();
    setDateExpire(new Date(new Date().getTime() + 0.2 * 60000));
    handleCloseTerms();
    handleOpenQR();
  };

  const handleOpenQR = () => {
    setIsOpenQR(true);
  };
  const handleCloseQR = () => {
    setIsOpenQR(false);
    handleOpenCancel();
  };

  const handleOpenCancel = () => {
    setIsOpenCancel(true);
  };

  const handleCloseCancel = () => {
    setIsOpenCancel(false);
    handleOpenQR();
  };

  const handleConfirmCancel = () => {
    setIsOpenCancel(false);
  };

  const handleOpenLoading = () => {
    setIsOpenLoading(true);
  };

  const handleCloseLoading = () => {
    setIsOpenLoading(false);
  };

  const handleExpired = () => {
    setIsOpenQR(false);
    handleOpenException();
  };

  const handleOpenException = () => {
    setIsOpenException(true);
  };

  const handleCloseException = () => {
    setIsOpenException(false);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs>
          <Box display='flex' flexDirection='column' gridGap={16}>
            <PartnerInformation />
            <ServicePackageInformation />
          </Box>
        </Grid>
        <Grid item classes={{ root: classes.containerInvoice }}>
          <Invoice onClick={handleOpenTerms} />
        </Grid>
      </Grid>

      <TermsOfUsePopup
        open={isOpenTerms}
        onClose={handleCloseTerms}
        siteName='sapo.vn'
        clauseType='extend'
        onConfirm={handleConfirmTerms}
      />
      <QRCodePopup open={isOpenQR} onClose={handleCloseQR} targetDate={dateExpire} onExpired={handleExpired} />
      <CancelPaymentPopup open={isOpenCancel} onClose={handleCloseCancel} onConfirm={handleConfirmCancel} />
      <LoadingPopup open={isOpenLoading} onClose={handleCloseLoading} />
      <ExceptionPopup open={isOpenException} onClose={handleCloseException} />
    </Box>
  );
}

export default ServicePackagePaymentContent;
