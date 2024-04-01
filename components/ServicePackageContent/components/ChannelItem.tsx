import { Box, Button, Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

interface ChannelItemProps {
  id?: number;
  label: string;
  onClick?: () => Promise<void> | void;
}

function ChannelItem(props: ChannelItemProps) {
  const { id, label, onClick } = props;
  const { t } = useTranslation('common');

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' height={60}>
      <Box flex={1}>
        <Typography variant='h6'>{label}</Typography>
      </Box>
      <Box minWidth={100} display='flex' justifyContent='flex-end'>
        <Button variant='outlined' onClick={onClick}>
          {t('packageService.contact')}
        </Button>
      </Box>
    </Box>
  );
}

export default ChannelItem;
