import { Box, Card, Typography, makeStyles } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { ReactNode } from 'react';

interface ContainerProps {
  title: string | ReactNode;
  variantTitle?: 'inherit' | Variant;
  extra?: ReactNode;
  children?: ReactNode;
}

const useStyles = makeStyles({
  root: {
    borderRadius: 6,
  },
});

function Container(props: ContainerProps) {
  const { title, variantTitle = 'subtitle2', extra, children, ...otherProps } = props;
  const classes = useStyles();

  return (
    <Card classes={{ root: classes.root }} {...otherProps}>
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
