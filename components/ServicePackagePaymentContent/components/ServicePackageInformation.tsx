import { Container } from 'components/SharedComponents';
import ServicePackageItem from './ServicePackageItem';
import { useTranslation } from 'next-i18next';
import { GetSaleOrderTemplate } from 'services/Model';
import { setSelectedService, useAppDispatch, useAppSelector } from 'redux/store';
import ServicePackageItemSkeleton from '../skeletons/ServicePackageItemSkeleton';
import { useRouter } from 'next/router';

interface ServicePackageInformationProps {
  data: GetSaleOrderTemplate[];
  isLoading?: boolean;
}

function ServicePackageInformation(props: ServicePackageInformationProps) {
  const { data, isLoading } = props;
  const { t } = useTranslation('common');
  const router = useRouter();
  const { Ids } = router.query;

  const dispatch = useAppDispatch();
  const paymentState = useAppSelector((state) => state.paymentState);

  const handleSelect = (id: number) => {
    dispatch(setSelectedService(id));
  };

  return (
    <Container title={t('servicePackagePayment.servicePackageInformation')}>
      {isLoading
        ? (Ids as string).split(',').map((item) => <ServicePackageItemSkeleton />)
        : data.map((item, index) => (
            <ServicePackageItem
              key={index}
              fieldData={{ use_period: item.use_period, product_unit_price: item.product_unit_price }}
              onClick={() => handleSelect(item.sale_order_template_id)}
              isActive={paymentState?.selectedService === item.sale_order_template_id}
            />
          ))}
    </Container>
  );
}

export default ServicePackageInformation;
