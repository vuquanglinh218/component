import { Box, Card, Typography, makeStyles, CardProps } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { ReactNode } from 'react';

interface ContainerProps extends Omit<CardProps, 'title'> {
  title: string | ReactNode;
  variantTitle?: 'inherit' | Variant;
  extra?: ReactNode;
  children?: ReactNode;
}

function Container(props: ContainerProps) {
  const { title, variantTitle = 'subtitle2', extra, children, ...otherProps } = props;

  return (
    <Card {...otherProps}>
      <Box px='20px' height='60px' display='flex' alignItems='center'>
        {typeof title === 'string' ? <Typography variant={variantTitle}>{title}</Typography> : title}
        {extra}
      </Box>
      <Box px='20px' pb='20px'>
        {children}
      </Box>
    </Card>
  );
}

export default Container;
