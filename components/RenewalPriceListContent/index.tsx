import { Box } from '@material-ui/core';
import RenewalTable from './components/RenewalTable';
import AlertInfo from './components/AlertInfo';
import { useEffect, useState } from 'react';
import { getRenewalPriceTable, retail, Service } from './data/retail';
import AccordionContainerTable from './components/AccordionContainerTable';
import { useSaleOrderTemplate } from 'swr_api';
import { GetSaleOrderTemplate } from 'services/Model';
import { useRouter } from 'next/router';

const data = [
  {
    sale_order_template_id: 323,
    order_type: 'nc',
    category_name: 'OMNI_PLUS',
    use_period: 0,
    priority: 1,
    sale_order_template_type: 'Omni Plus',
    product_name: 'Omni Plus',
    product_unit_price: 1499000.0,
    product_lst_price: 1499000.0,
  },
  {
    sale_order_template_id: 323,
    order_type: 'nc',
    category_name: 'OMNI_PLUS',
    use_period: 0,
    priority: 1,
    sale_order_template_type: 'Omni Plus',
    product_name: 'Omni Plus',
    product_unit_price: 1499000.0,
    product_lst_price: 1499000.0,
  },
  {
    sale_order_template_id: 323,
    order_type: 'nc',
    category_name: 'OMNI_PLUS',
    use_period: 0,
    priority: 1,
    sale_order_template_type: 'Omni Plus',
    product_name: 'Omni Plus',
    product_unit_price: 1499000.0,
    product_lst_price: 1499000.0,
  },
];

const data2 = [
  {
    sale_order_template_id: 323,
    order_type: 'nc',
    category_name: 'OMNI_PLUS',
    use_period: 0,
    priority: 1,
    sale_order_template_type: 'Omni Plus',
    product_name: 'Omni Plus',
    product_unit_price: 1499000.0,
    product_lst_price: 1499000.0,
  },
];

function RenewalPriceListContent() {
  const [dataTable, setDataTable] = useState<(string | Service)[][]>([]);
  const [dataTable2, setDataTable2] = useState<(string | Service)[][]>([]);

  const router = useRouter();
  const { categoryId } = router.query;

  const { dataSaleOrderTemplate, isLoadingSaleOrderTemplate, errorSaleOrderTemplate } = useSaleOrderTemplate(
    categoryId as string,
  );

  const [mainRenewalList, setMainRenewalList] = useState<GetSaleOrderTemplate[]>([]);

  useEffect(() => {
    if (dataSaleOrderTemplate) {
      dataSaleOrderTemplate.sort((a, b) => {
        if (a.order_type === 'gh' && b.order_type !== 'gh') {
          return -1;
        } else if (a.order_type !== 'gh' && b.order_type === 'gh') {
          return 1;
        } else if (a.order_type === 'nc' && b.order_type !== 'nc') {
          return -1;
        } else if (a.order_type !== 'nc' && b.order_type === 'nc') {
          return 1;
        } else {
          if (a.use_period === 24 && b.use_period !== 24) {
            return -1;
          } else if (a.use_period !== 24 && b.use_period === 24) {
            return 1;
          } else {
            return 0;
          }
        }
      });

      dataSaleOrderTemplate.forEach((item) => {
        if (!mainRenewalList.includes(item.category_name)) {
          setMainRenewalList((prev) => [...prev, item]);
        }
      });

      console.log('dataSaleOrderTemplate', dataSaleOrderTemplate);
    }
  }, [isLoadingSaleOrderTemplate]);

  useEffect(() => {
    const dataTable = getRenewalPriceTable(dataSaleOrderTemplate?.slice(0, 3) || [], retail);
    const dataTable2 = getRenewalPriceTable(data2, retail);
    setDataTable(dataTable);
    setDataTable2(dataTable2);
  }, [isLoadingSaleOrderTemplate]);

  return (
    <Box display='flex' flexDirection='column' gridGap={12}>
      <AlertInfo
        title='Sapo365.net đang sử dụng gói dịch vụ Web Basic'
        body='Gói dịch vụ và tính năng đi kèm có thể thay đổi. Vui lòng lựa chọn gói dịch vụ phù hợp vơi nhu cầu của bạn.'
      />
      <RenewalTable data={dataTable} numberColumnCompare={4} />
      <AccordionContainerTable>
        <RenewalTable data={dataTable} numberColumnCompare={4} />
        <RenewalTable data={dataTable2} numberColumnCompare={4} />
      </AccordionContainerTable>
      {/* <Exception type={ExceptionRenewalPriceList.dataNotFound} /> */}
    </Box>
  );
}

export default RenewalPriceListContent;
