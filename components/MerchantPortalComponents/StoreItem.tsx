import { Box, Button, Card, Link, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import TrailStore from 'components/icons/TrailStore';
import clsx from 'clsx';
import PaidStore from 'components/icons/PaidStore';
import { Skeleton } from '@material-ui/lab';
import { Tag } from 'components';
import { TagType } from 'components/SharedComponents/Tag';
import { Tenant } from 'services/Model';

interface StoreItemProps {
  disabled?: boolean;
  type?: 'trail' | 'paid';
  isLoading?: boolean;
  fieldData?: Tenant;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderRadius: 6,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative',
    },
    disabled: {},
    button: {
      zIndex: 12,
      backgroundColor: 'white',
    },
    overlay: {
      opacity: 0.5,
      backgroundColor: theme.palette.grey[200],
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
    },
  }),
);

const handleRenderTypeStore = (type: StoreItemProps['type']) => {
  switch (type) {
    case 'trail':
      return <TrailStore />;
    case 'paid':
      return <PaidStore />;
    default:
      return <TrailStore />;
  }
};

function StoreItem(props: StoreItemProps) {
  const { disabled = false, type, isLoading, fieldData, ...otherProps } = props;
  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <Card variant='outlined' classes={{ root: classes.root }} {...otherProps}>
          <Box display='flex' justifyContent='space-between' marginBottom='5px'>
            <Skeleton variant='rect' width={39} height={39} animation='wave' />
          </Box>

          <Box>
            <Typography variant='h6'>
              <Skeleton animation='wave' />
            </Typography>
            <Typography variant='body2'>
              <Skeleton animation='wave' width={220} />
            </Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='flex-end' height={36}>
            <Typography variant='body2'>
              <Skeleton width={120} />
            </Typography>
          </Box>
        </Card>
      ) : (
        <Card variant='outlined' classes={{ root: clsx(classes.root, disabled && classes.disabled) }} {...otherProps}>
          <Box display='flex' justifyContent='space-between'>
            <Box position='relative' width='fit-content'>
              {handleRenderTypeStore(type)}
            </Box>
            <Tag variant='outlined' size='small' status={TagType.expired} />
          </Box>

          <Box>
            <Typography variant='h6'>CN01 - Chi nhánh 137 Huỳnh Thúc Kháng</Typography>
            <Typography variant='body2'>0978948197.sapo365.net</Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='flex-end' height={36}>
            <Link variant='body1' href='#'>
              Vào cửa hàng
            </Link>
            <Button variant='outlined' classes={{ root: classes.button }}>
              Gia hạn
            </Button>
          </Box>
          {disabled && <Card classes={{ root: classes.overlay }} />}
        </Card>
      )}
    </>
  );
}

export default StoreItem;
