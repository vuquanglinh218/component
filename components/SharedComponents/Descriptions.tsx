import { Box, BoxProps, Typography } from '@material-ui/core';
import { ReactNode } from 'react';

export interface DescriptionProps extends BoxProps {
  data?: {
    label: string;
    value: string | ReactNode;
  }[];
}

function Descriptions(props: DescriptionProps) {
  const { data, ...otherProps } = props;

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
