import { Box, Divider, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { ContactPopup, Container } from 'components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import StorageItem from './StorageItem';
import LocationItem from './LocationItem';
import ChannelItem from './ChannelItem';

const useStyles = makeStyles(
  createStyles({
    textWhite: {
      color: 'white',
    },
  }),
);

function ListOtherSubscription() {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [isOpenContactPopup, setIsOpenContactPopup] = useState<boolean>(false);

  const handleCloseContactPopup = () => {
    setIsOpenContactPopup(false);
  };

  const handleOpenContactPopup = () => {
    setIsOpenContactPopup(true);
  };

  return (
    <Container title={t('packageService.titleOrtherService')}>
      <LocationItem
        label='Chi nhánh ID Location label'
        start_date='2024-03-01T02:20:52Z'
        end_date='2024-03-08T17:00:00Z'
      />
      <Divider />
      <StorageItem
        label='Dung lượng website'
        infoTooltip={{
          type: 'blue',
          title: (
            <Box>
              <Typography variant='body1' classes={{ root: classes.textWhite }}>
                <Typography variant='h6' classes={{ root: classes.textWhite }} component='span'>
                  100GB
                </Typography>{' '}
                tặng kèm: Hạn đến{' '}
                <Typography variant='h6' classes={{ root: classes.textWhite }} component='span'>
                  12/12/2024
                </Typography>
              </Typography>
              <Typography variant='body1' classes={{ root: classes.textWhite }}>
                <Typography variant='h6' classes={{ root: classes.textWhite }} component='span'>
                  50GB
                </Typography>{' '}
                tặng kèm: Hạn đến{' '}
                <Typography variant='h6' classes={{ root: classes.textWhite }} component='span'>
                  12/12/2024
                </Typography>
              </Typography>
            </Box>
          ),
        }}
      />
      <Divider />
      <ChannelItem label='Page Facebook' onClick={handleOpenContactPopup} />
      <ContactPopup
        open={isOpenContactPopup}
        onClose={handleCloseContactPopup}
        staffInfo={{ name: 'Nguyễn Bảo Anh', phoneNumber: '0984 557 489' }}
      />
    </Container>
  );
}

export default ListOtherSubscription;
