import { Box, Button, Card, Grid, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { ContactPopup, Container } from 'components';
import { TypeAction, listUpSale } from '../data/listUpsale';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useGetListStore, useGetStore, useGetUserWithDomain } from 'swr_api';
import { currentDomainSlice, useAppSelector } from 'redux/store';
import { useRouter } from 'next/router';

interface UpSaleSubscriptionItemProps {
  name: string;
  price: string;
  unit: string;
  action: TypeAction;
  onClick: () => Promise<void> | void;
  text: string;
}

const useStylesItem = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderRadius: 6,
    },
  }),
);

function UpSaleSubscriptionItem(props: UpSaleSubscriptionItemProps) {
  const { name, price, unit, action, text, onClick, ...otherProps } = props;
  const classes = useStylesItem();
  const { t } = useTranslation('common');

  return (
    <Card variant='outlined' classes={{ root: classes.root }}>
      <Box display='flex' flexDirection='column' gridGap={8}>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='subtitle1'>
          {price}{' '}
          <Typography variant='body2' component='span'>
            {unit}
          </Typography>
        </Typography>
        <Box>
          <Button variant='outlined' onClick={onClick}>
            {text}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

function ListUpSaleSubscription() {
  const { t } = useTranslation('common');
  const [isOpenContactPopup, setIsOpenContactPopup] = useState<boolean>(false);
  const router = useRouter();
  const { domain } = router.query;

  const { dataStore } = useGetStore(domain as string);
  const { dataUserWithDomain } = useGetUserWithDomain(domain as string);

  const handleCloseContactPopup = () => {
    setIsOpenContactPopup(false);
  };

  const handleOpenContactPopup = () => {
    setIsOpenContactPopup(true);
  };

  const handleContact = () => {
    handleOpenContactPopup();
  };

  const handleExtend = () => {
    console.log('extend');
  };

  const handleByMore = () => {
    console.log('by more');
  };

  const handleRenderAction = (type: TypeAction) => {
    switch (type) {
      case TypeAction.extend:
        return {
          text: t('packageService.extend'),
          onClick: handleExtend,
        };
      case TypeAction.contact:
        return {
          text: t('packageService.contact'),
          onClick: handleContact,
        };
      case TypeAction.byMore:
        return {
          text: t('packageService.byMore'),
          onClick: handleByMore,
        };
    }
  };

  return (
    <Container title={t('packageService.titleAdditionalService')}>
      <Grid container spacing={2}>
        {listUpSale.map((item, index) => (
          <Grid key={index} item xs={4}>
            <UpSaleSubscriptionItem {...handleRenderAction(item.action)} {...item} />
          </Grid>
        ))}
      </Grid>

      <ContactPopup
        open={isOpenContactPopup}
        onClose={handleCloseContactPopup}
        staffInfo={dataUserWithDomain}
        tag={dataStore?.tag}
      />
    </Container>
  );
}
export default ListUpSaleSubscription;
