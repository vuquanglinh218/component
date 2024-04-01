import { Box, Typography } from '@material-ui/core';
import { useTranslation } from 'next-i18next';

function Exception() {
  const { t } = useTranslation('common');
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height={200} width='100%'>
      <Typography variant='body2'>{t('store.exception.empty')}</Typography>
    </Box>
  );
}

export default Exception;
