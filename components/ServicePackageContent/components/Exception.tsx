import { Box, Card, Typography } from '@material-ui/core';
import ContactIcon from 'components/icons/ContactIcon';
import { useTranslation } from 'next-i18next';

export enum ExceptionServicePackage {
  dataNotFound = 'DATA_NOT_FOUND',
}

interface ExceptionProps {
  type: ExceptionServicePackage;
}

function Exception(props: ExceptionProps) {
  const { type } = props;
  const { t } = useTranslation('common');

  return (
    <Card>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        gridGap={16}
        height={'calc(100vh - 150px)'}
      >
        <ContactIcon />
        <Box display='flex' flexDirection='column' alignItems='center' gridGap={8}>
          <Typography variant='subtitle1'>{t('packageService.exception.title')}</Typography>
          <Typography variant='body1'>
            {t('packageService.exception.body1')}{' '}
            <Typography variant='h6' component='span'>
              19006750
            </Typography>{' '}
            {t('packageService.exception.body2')}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default Exception;
