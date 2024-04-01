import { Box, Button, Typography } from '@material-ui/core';
import { Container, Descriptions } from 'components/SharedComponents';
import { useTranslation } from 'next-i18next';
import { SaleOrderTemplate } from 'services/Model';
import { NumberUtil } from 'utils/NumberUtil';
import InvoiceSkeleton from '../skeletons/InvoiceSkeleton';

interface InvoiceProps {
  onClick: () => Promise<void> | void;
  data: SaleOrderTemplate;
  isLoading?: boolean;
}

function Invoice(props: InvoiceProps) {
  const { onClick, data, isLoading = true } = props;
  const { t } = useTranslation('common');

  const handleRenderInvoiceGH = () => {
    if (data) {
      const saleOrderTempLine = data.sale_order_temp_line;
      const productLine = {
        label: '',
        value: 0,
      };

      saleOrderTempLine.forEach((item) => {
        if (item.z_sale_order_temp_core_product) {
          productLine.label = `${item.name} (${item.product_uom_qty} ${t('servicePackagePayment.month')})`;
          productLine.value = item.price_total;
        }
      });

      return [
        productLine,
        {
          label: t('servicePackagePayment.tax'),
          value: data?.sale_order_temp_tax,
        },
        {
          label: t('servicePackagePayment.totalDiscount'),
          value: data?.sale_order_temp_discount,
        },
      ].map((item) => ({ ...item, value: NumberUtil.formatMoney(item.value) }));
    }
  };

  const handleRenderInvoiceNC = () => {
    if (data) {
      const saleOrderTempLine = data.sale_order_temp_line;
      const productLine = {
        label: '',
        value: 0,
      };
      const initializationFeeLine = {
        label: t('servicePackagePayment.initializationFee'),
        value: 0,
      };
      const refundLine = {
        label: t('servicePackagePayment.refund'),
        value: data?.sale_order_temp_tax,
      };
      const giftLine = {
        label: '',
        value: 0,
      };

      saleOrderTempLine.forEach((item) => {
        if (item.z_sale_order_temp_core_product) {
          productLine.label = `${item.name} (${item.product_uom_qty} ${t('servicePackagePayment.month')})`;
          productLine.value = item.price_total;
        }

        if (!item.is_reward_line && !item.is_refund_line && !item.z_sale_order_temp_core_product) {
          initializationFeeLine.value = item.price_total;
        }

        if (item.is_refund_line) {
          refundLine.value = item.price_total;
        }

        if (item.is_reward_line) {
          const coreProduct = saleOrderTempLine.find((item) => item.z_sale_order_temp_core_product === true);
          if (coreProduct && item.name === coreProduct.name) {
            giftLine.label = `${t('servicePackagePayment.gift')} ${item.product_uom_qty} ${t(
              'servicePackagePayment.month',
            )}`;
            giftLine.value = item.price_total;
          }
        }
      });

      const result = [
        productLine,
        initializationFeeLine,
        giftLine,
        {
          label: t('servicePackagePayment.tax'),
          value: data?.sale_order_temp_tax,
        },
        refundLine,
        {
          label: t('servicePackagePayment.totalDiscount'),
          value: -data?.sale_order_temp_discount,
        },
      ].map((item) => ({ ...item, value: NumberUtil.formatMoney(item.value) }));

      if (giftLine.label === '') {
        result.splice(2, 1);
      }
      return result;
    }
  };

  return (
    <>
      {isLoading ? (
        <InvoiceSkeleton />
      ) : (
        <Container title={t('servicePackagePayment.order')}>
          <Descriptions
            data={data?.sale_order_template_order_type === 'nc' ? handleRenderInvoiceNC() : handleRenderInvoiceGH()}
          />

          <Box display='flex' justifyContent='space-between' component='li' marginY='16px'>
            <Typography variant='body1'>{t('servicePackagePayment.totalPayment')}</Typography>
            <Typography variant='subtitle1'>{NumberUtil.formatMoney(data?.sale_order_temp_total)}</Typography>
          </Box>

          <Button variant='contained' size='large' fullWidth onClick={onClick} disabled={isLoading}>
            {t('servicePackagePayment.continue')}
          </Button>
        </Container>
      )}
    </>
  );
}

export default Invoice;
