import { Box, Button, Divider, Grid, LinearProgress, Typography, makeStyles } from '@material-ui/core';
import Container from './Container';

interface ListOtherSubscriptionProps {}

interface OtherSubscriptionItemProps {
  type?: 'memory' | 'service' | 'other';
  name: string;
  onClick?: () => Promise<void> | void;
}

const useStylesServiceItem = makeStyles({
  rootLinearProgress: {
    height: '8px',
    borderRadius: '8px',
    width: '300px',
    backgroundColor: '#F3F4F5',
  },
  bar: {
    borderRadius: '8px',
  },
});

function OtherSubscriptionItem(props: OtherSubscriptionItemProps) {
  const { type, name, onClick, ...otherProps } = props;

  const classes = useStylesServiceItem();

  const handleRenderType = (type: OtherSubscriptionItemProps['type']) => {
    switch (type) {
      case 'memory':
        return (
          <Box display='flex' flexDirection='column' gridGap={2}>
            <Typography variant='body1'>Dung lượng đã sử dụng: 19.17/5120.00MB</Typography>
            <LinearProgress
              classes={{ root: classes.rootLinearProgress, bar: classes.bar }}
              variant='determinate'
              value={40}
            />
          </Box>
        );
      case 'service':
        return <Typography variant='body1'>Từ: 20/11/2023 - Đến: 20/11/2024</Typography>;

      default:
        return null;
    }
  };

  const handleRenderAction = (type: OtherSubscriptionItemProps['type']) => {
    switch (type) {
      case 'memory':
        return 'Mua thêm';
      case 'service':
        return 'Gia hạn';
      default:
        return 'Liên hệ';
    }
  };

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' height={60}>
      <Box flex={1}>
        <Typography variant='h6'>{name}</Typography>
      </Box>
      <Box flex={1}>{handleRenderType(type)}</Box>
      <Box minWidth={100} display='flex' justifyContent='flex-end'>
        <Button variant='outlined' onClick={onClick}>
          {handleRenderAction(type)}
        </Button>
      </Box>
    </Box>
  );
}

function ListOtherSubscription(props: ListOtherSubscriptionProps) {
  return (
    <Container title='Thông tin dịch vụ khác'>
      <OtherSubscriptionItem type='service' name='Chi nhánh ID Location Name' />
      <Divider />
      <OtherSubscriptionItem type='memory' name='Dung lượng website' />
      <Divider />
      <OtherSubscriptionItem name='Quản trị viên' />
      <Divider />
      <OtherSubscriptionItem name='Gian hàng trên sàn TMĐT' />
      <Divider />
      <OtherSubscriptionItem name='Page Instagram' />
      <Divider />
      <OtherSubscriptionItem name='Page Facebook' />
    </Container>
  );
}

export default ListOtherSubscription;
