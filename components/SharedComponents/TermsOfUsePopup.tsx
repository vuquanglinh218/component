import { Button, Checkbox, DialogContentText, makeStyles, Box, FormControlLabel, Typography } from '@material-ui/core';
import Popup, { PopupProps } from './Popup';
import { UIEventHandler, useState } from 'react';
import { useTranslation } from 'next-i18next';

const terms = {
  extend: [
    'Cảm ơn Quý khách hàng đã tin tưởng lựa chọn sản phẩm của Sapo. Với việc nhấn "Xác nhận và thanh toán" dưới đây, Quý Khách hàng đồng ý gia hạn sử dụng site/ID: SITE_NAME với các nội dung sau:',
    'Quý khách đã kiểm tra chính xác thông tin site/ID, gói sản phẩm đã lựa chọn, đơn hàng sẽ không được hoàn, hủy và giá trị đơn hàng không được hoàn lại khi không có lỗi từ Sapo.',
    'Bằng việc xác nhận Đơn đặt hàng này, Khách hàng đồng ý tuân thủ Quy định sử dụng, chính sách bảo mật và các quy định khác tại website Sapo.vn. Mọi hành vi không tuân thủ theo những quy định này đều bị coi là vi phạm hợp đồng.',
    'Đơn hàng này là 1 phần không tách rời của Hợp đồng đã ký bởi 2 bên, phụ lục (được gửi qua email của Quý khách). Các nội dung tại hợp đồng, phụ lục không bị sửa đổi, bổ sung, mâu thuẫn với đơn hàng này vẫn giữ nguyên hiệu lực.',
  ],
  upgrade: [
    'Cảm ơn Quý khách hàng đã tin tưởng lựa chọn sản phẩm của Sapo. Với việc nhấn "Xác nhận và thanh toán" dưới đây, Quý Khách hàng đồng ý nâng cấp site/ID: SITE_NAME  với các nội dung sau:',
    'Quý khách đã kiểm tra chính xác thông tin site/ID, gói sản phẩm đã lựa chọn, đơn hàng sẽ không được hoàn, hủy và giá trị đơn hàng không được hoàn lại khi không có lỗi từ Sapo.',
    'Bằng việc xác nhận Đơn đặt hàng này, Khách hàng đồng ý tuân thủ Quy định sử dụng, chính sách bảo mật và các quy định khác tại website Sapo.vn. Mọi hành vi không tuân thủ theo những quy định này đều bị coi là vi phạm hợp đồng.',
    'Đơn hàng này là 1 phần không tách rời của Hợp đồng đã ký bởi 2 bên, phụ lục (được gửi qua email của Quý khách). Các nội dung tại hợp đồng, phụ lục không bị sửa đổi, bổ sung, mâu thuẫn với đơn hàng này vẫn giữ nguyên hiệu lực.',
  ],
  addons: [
    'Cảm ơn Quý khách hàng đã tin tưởng lựa chọn sản phẩm của Sapo. Với việc nhấn "Xác nhận và thanh toán" dưới đây, Quý Khách hàng đồng ý mua thêm các tính năng/dịch vụ sử dụng cho site/ID: SITE_NAME với các nội dung sau:',
    'Quý khách đã kiểm tra chính xác thông tin site/ID, gói sản phẩm, dịch vụ đã lựa chọn, đơn hàng sẽ không được hoàn, hủy và giá trị đơn hàng không được hoàn lại khi không có lỗi từ Sapo.',
    'Bằng việc xác nhận Đơn đặt hàng này, Khách hàng đồng ý tuân thủ Quy định sử dụng, chính sách bảo mật và các quy định khác tại website Sapo.vn. Mọi hành vi không tuân thủ theo những quy định này đều bị coi là vi phạm hợp đồng.',
    'Đơn hàng này là 1 phần không tách rời của Hợp đồng đã ký bởi 2 bên, phụ lục (được gửi qua email của Quý khách). Các nội dung tại hợp đồng, phụ lục không bị sửa đổi, bổ sung, mâu thuẫn với đơn hàng này vẫn giữ nguyên hiệu lực.',
  ],
};

interface TermsOfUsePopupProps extends PopupProps {
  siteName: string;
  clauseType: string;
  onConfirm?: () => Promise<void> | void;
}

const useStyles = makeStyles({
  dialogContentRoot: {
    maxHeight: '400px',
    maxWidth: '700px',
  },
});

function TermsOfUsePopup(props: TermsOfUsePopupProps) {
  const { onConfirm, siteName, clauseType, ...otherProps } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [isAgreeToTerms, setIsAgreeToTerms] = useState<boolean>(false);
  const [haveReadTerms, setHaveReadTerms] = useState<boolean>(true);

  const handleRenderContent = (contents: string[], siteName: string) => {
    return (
      <Box display='flex' flexDirection='column' gridGap={12}>
        {contents.map((item, index) => {
          if (index === 0) {
            return <Typography>{item.replace('SITE_NAME', siteName)}</Typography>;
          }
          return <Typography>{item}</Typography>;
        })}
      </Box>
    );
  };

  const handleRenderTerms = (type: string) => {
    switch (type) {
      case 'extend':
        return handleRenderContent(terms.extend, siteName);
      case 'upgrade':
        return handleRenderContent(terms.upgrade, siteName);
      case 'addons':
        return handleRenderContent(terms.addons, siteName);
      default:
        return handleRenderContent(terms.extend, siteName);
    }
  };

  const handleCheckTerms = () => {
    setIsAgreeToTerms(!isAgreeToTerms);
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as EventTarget & { scrollHeight: number; scrollTop: number; clientHeight: number };
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setHaveReadTerms(true);
    }
  };

  const DialogAction = (
    <Box display={'flex'} flexDirection='column' flex={1} alignItems='flex-end' paddingX='12px' paddingBottom='12px'>
      <Box marginRight='auto' width={'100%'} display='flex' alignItems='center'>
        <FormControlLabel
          control={<Checkbox checked={isAgreeToTerms} onChange={handleCheckTerms} size='small' color='primary' />}
          label={t('popup.termsOfUse.label')}
          disabled={!haveReadTerms}
        />
      </Box>
      <Button variant='contained' onClick={onConfirm} disabled={!isAgreeToTerms}>
        {t('popup.termsOfUse.confirm')}
      </Button>
    </Box>
  );

  return (
    <Popup
      maxWidth='md'
      title={t('popup.termsOfUse.title')}
      actionElement={DialogAction}
      dialogContentProps={{
        onScroll: handleScroll,
        classes: {
          root: classes.dialogContentRoot,
        },
      }}
      {...otherProps}
    >
      <DialogContentText tabIndex={-1}>{handleRenderTerms(clauseType)}</DialogContentText>
    </Popup>
  );
}

export default TermsOfUsePopup;
