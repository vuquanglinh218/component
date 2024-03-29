import { Box, Typography } from '@material-ui/core';
import RenewalTable from './components/RenewalTable';
import { Alert, AlertTitle } from '@material-ui/lab';
import AlertInfo from './components/AlertInfo';
import { useEffect, useState } from 'react';
import { getRenewalPriceTable, getRenewalPriceTable2, retail, services } from './data/retail';
import AccordionContainerTable from './components/AccordionContainerTable';
import Exception, { ExceptionRenewalPriceList } from './components/Exception';

const data = [
  {
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

function InfoRenewalPriceList() {
  const [dataTable, setDataTable] = useState<(string | services)[][]>([]);
  const [dataTable2, setDataTable2] = useState<(string | services)[][]>([]);
  useEffect(() => {
    const dataTable = getRenewalPriceTable2(data, retail);
    const dataTable2 = getRenewalPriceTable2(data2, retail);
    setDataTable(dataTable);
    setDataTable2(dataTable2);
  }, []);
  return (
    <Box display='flex' flexDirection='column' gridGap={12}>
      {/* <AlertInfo
        title={<Typography variant='h6'>Sapo365.net đang sử dụng gói dịch vụ Web Basic</Typography>}
        body={
          <Typography variant='body1'>
            Gói dịch vụ và tính năng đi kèm có thể thay đôỉ. Vui lòng lựa chọn gói dịch vụ phù hợp vơi nhu cầu của bạn.
          </Typography>
        }
      />
      <RenewalTable data={dataTable} numberColumnCompare={4} />
      <AccordionContainerTable>
        <RenewalTable data={dataTable} numberColumnCompare={4} />
        <RenewalTable data={dataTable2} numberColumnCompare={4} />
      </AccordionContainerTable> */}
      <Exception type={ExceptionRenewalPriceList.dataNotFound} />
    </Box>
  );
}

export default InfoRenewalPriceList;
