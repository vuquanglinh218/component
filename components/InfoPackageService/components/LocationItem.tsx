import { Box, Button, Typography } from '@material-ui/core';
import moment from 'moment';
import { useTranslation } from 'next-i18next';

interface LocationItemProps {
  id?: number;
  label?: string;
  start_date?: string;
  end_date?: string;
  onClick?: () => Promise<void> | void;
}

function LocationItem(props: LocationItemProps) {
  const { id, label, start_date, end_date, onClick } = props;
  const { t } = useTranslation('common');
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' height={60}>
      <Box flex={1}>
        <Typography variant='h6'>{label}</Typography>
      </Box>
      <Box flex={1}>
        <Typography variant='body1'>
          {t('packageService.from')} {moment(start_date).format('DD/MM/YYYY')} - {t('packageService.to')}{' '}
          {moment(end_date).format('DD/MM/YYYY')}
        </Typography>
      </Box>
      <Box minWidth={100} display='flex' justifyContent='flex-end'>
        <Button variant='outlined' onClick={onClick}>
          {t('packageService.extend')}
        </Button>
      </Box>
    </Box>
  );
}

export default LocationItem;
