import { Box, Button, Typography, createStyles, makeStyles } from '@material-ui/core';
import { Service } from '../data/retail';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';

const useStyles = makeStyles(
  createStyles({
    container: (props: { color?: string }) => ({
      '&::before': {
        content: '""',
        display: 'block',
        height: '4px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: props.color || '#0088FF',
        color: 'red',
      },
    }),
    captionLineThrough: {
      textDecoration: 'line-through',
    },
    caption: {
      fontStyle: 'normal',
    },
  }),
);

interface RenewalHeaderItemProps extends Service {
  onClick?: () => Promise<void> | void;
  color?: string;
}

function RenewalHeaderItem(props: RenewalHeaderItemProps) {
  const { product_name, product_unit_price, product_lst_price, use_period, order_type, onClick, color, ...otherProps } =
    props;
  const classes = useStyles({ color });
  const { t } = useTranslation('common');

  const handleRenderAction = (type: string) => {
    switch (type) {
      case 'gh':
        return 'Gia hạn';
      case 'nc':
        return 'Nâng cấp';
      default:
        return 'Nâng cấp';
    }
  };

  return (
    <Box
      className={classes.container}
      display='flex'
      flexDirection='column'
      alignItems='center'
      position='relative'
      paddingY='16px'
      minHeight={180}
      gridGap={8}
    >
      <Typography variant='subtitle2'>{product_name}</Typography>
      <Box display='flex' flexDirection='column' alignItems='center' flex={1}>
        <Typography variant='h1'>
          {product_unit_price}
          <Typography variant='body2' component='span'>
            /{t('renewalPriceList.month')}
          </Typography>
        </Typography>
        <Typography variant='caption' classes={{ root: clsx(classes.captionLineThrough, classes.caption) }}>
          {product_lst_price}/{t('renewalPriceList.month')}
        </Typography>
      </Box>
      {use_period === 24 && (
        <Typography variant='caption' classes={{ root: classes.caption }}>
          {t('renewalPriceList.applicableFrom2Year')}
        </Typography>
      )}
      <Button variant='contained' onClick={onClick}>
        {handleRenderAction(order_type)}
      </Button>
    </Box>
  );
}

export default RenewalHeaderItem;
