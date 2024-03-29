import { Box, Card, Typography } from '@material-ui/core';
import ContactIcon from 'components/icons/ContactIcon';
import SystemUpgradingIcon from 'components/icons/SystemUpgradingIcon';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

export enum ExceptionRenewalPriceList {
  dataNotFound = 'DATA_NOT_FOUND',
  systemIsUpgrading = 'SYSTEM_IS_UPGRADING',
}

interface ExceptionProps {
  type: ExceptionRenewalPriceList;
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
        height={'calc(100vh - 110px)'}
      >
        {type === ExceptionRenewalPriceList.dataNotFound ? <ContactIcon /> : <SystemUpgradingIcon />}

        <Box display='flex' flexDirection='column' alignItems='center' gridGap={8}>
          <Typography variant='subtitle1'>
            {type === ExceptionRenewalPriceList.dataNotFound
              ? t('renewalPriceList.exception.dataNotFound')
              : t('renewalPriceList.exception.systemIsUpgrading')}
          </Typography>
          <Box display='flex' alignItems='center' gridGap={4}>
            <Typography variant='body1'>{t('renewalPriceList.exception.body1')} </Typography>
            <Box display='flex' alignItems='center' gridGap={4}>
              <Typography variant='h6' component='span'>
                Nguyễn Bảo Anh:
              </Typography>
              <Box display='flex' alignItems='center'>
                <Image width={24} height={24} alt='Picture of the author' src='/static/zalo.svg' />
                <Image width={24} height={24} src='/static/whatsapp.svg' />
              </Box>
              <Typography variant='h6' component='span'>
                0984 557 489
              </Typography>
            </Box>
          </Box>
          <Typography variant='body1'>
            {t('renewalPriceList.exception.body2')}{' '}
            <Typography variant='h6' component='span'>
              19006750
            </Typography>{' '}
            {t('renewalPriceList.exception.body3')}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default Exception;
