import { Box, BoxProps, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

const dataDemo = [
  {
    label: 'Tên khách hàng',
    value: 'Nguyễn Bảo Anh',
  },
  {
    label: 'Tên site/ID cửa hàng',
    value: 'Bejpang2020',
  },
  {
    label: 'Số điện thoại',
    value: '0981701198',
  },
  {
    label: 'Email',
    value: 'baoanhnguyen@gmail.com',
  },
  {
    label: 'Địa chỉ',
    value: '266 Đội Cấn, Phường Liễu Giai, Quận Ba Đình, HN',
  },
];

interface DescriptionProps extends BoxProps {
  data?: {
    label: string;
    value: string | ReactNode;
  }[];
}

function Descriptions(props: DescriptionProps) {
  const { data = dataDemo, ...otherProps } = props;
  return (
    <Box
      {...otherProps}
      component='ul'
      display='flex'
      flexDirection='column'
      gridGap={10}
      style={{ padding: 0, margin: 0 }}
    >
      {data &&
        data.map((dataItem, index) => {
          return (
            <Box key={index} display='flex' justifyContent='space-between' component='li'>
              <Typography variant='body2'>{dataItem.label}</Typography>
              <Typography variant='body1'>{dataItem.value}</Typography>
            </Box>
          );
        })}
    </Box>
  );
}

export default Descriptions;
