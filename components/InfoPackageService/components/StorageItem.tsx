import { Box, Button, LinearProgress, Tooltip, Typography, createStyles, makeStyles } from '@material-ui/core';
import InfoCircleOutline from 'components/icons/InfoCircleOutline';
import InfoCircleOutlineYellow from 'components/icons/InfoCircleOutlineYellow';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';

interface StorageItemProps {
  id?: number;
  label: string;
  onClick?: () => Promise<void> | void;
  infoTooltip?: {
    type?: 'blue' | 'yellow';
    title?: ReactNode;
  };
}

const useStyles = makeStyles(
  createStyles({
    rootLinearProgress: {
      height: '8px',
      borderRadius: '8px',
      width: '300px',
      backgroundColor: '#F3F4F5',
    },
    bar: {
      borderRadius: '8px',
    },
  }),
);

function StorageItem(props: StorageItemProps) {
  const { id, label, onClick, infoTooltip } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' height={60}>
      <Box flex={1}>
        <Typography variant='h6'>{label}</Typography>
      </Box>
      <Box flex={1}>
        <Box display='flex' flexDirection='column' gridGap={2}>
          <Box display='flex' gridGap={12}>
            <Typography variant='body1'>
              {t('packageService.usedCapacity')}{' '}
              <Typography variant='h6' component='span'>
                19.17/5120.00GB
              </Typography>
            </Typography>
            {infoTooltip && (
              <Tooltip arrow title={infoTooltip.title}>
                <Box component='span'>
                  {infoTooltip.type === 'yellow' ? <InfoCircleOutlineYellow /> : <InfoCircleOutline />}
                </Box>
              </Tooltip>
            )}
          </Box>
          <LinearProgress
            classes={{ root: classes.rootLinearProgress, bar: classes.bar }}
            variant='determinate'
            value={40}
          />
        </Box>
      </Box>
      <Box minWidth={100} display='flex' justifyContent='flex-end'>
        <Button variant='outlined' onClick={onClick}>
          {t('packageService.byMore')}
        </Button>
      </Box>
    </Box>
  );
}

export default StorageItem;
