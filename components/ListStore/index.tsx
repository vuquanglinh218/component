import { Box, Button, ButtonGroup, Grid, Theme, createStyles, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Container } from 'components';
import StoreItem, { StoreType } from './components/StoreItem';
import { useTranslation } from 'next-i18next';
import { ListStore as ListStoreType, User } from 'services/Model';
import { useGetListStore } from 'swr_api';
import Exception from './components/Exception';

const dataTest = {
  '0993758747test-sapostaging.mysapogo.com': {
    domain_url: '0993758747test-sapostaging.mysapogo.com',
    package_name: 'RETAIL_STARTUP',
    package_description: 'RETAIL STARTUP',
    start_date: '2024-03-12T00:00:00Z',
    end_date: null,
    customer_id: 35161,
    customer_name: 'Active DV',
    customer_address: '57\n\n\n Vietnam',
    customer_phone: '0997786545',
    customer_email: '0997786545@gmail.com',
    customer_identity_card: '57573572773457',
    customer_vat: '',
    subscription_id: 5577,
    action_type: 'Gia hạn',
    tag: false,
    domain_name: '0993758747test-sapostaging',
    is_trial: false,
  },
  'hauat1-sapostaging.mysapo.net': {
    domain_url: 'hauat1-sapostaging.mysapo.net',
    package_name: 'WEB_BRAND_V3',
    package_description: 'Web Brand V3',
    start_date: '2024-03-06T13:44:02Z',
    end_date: '2025-03-20T17:00:00Z',
    customer_id: 34786,
    customer_name: 'TCH15',
    customer_address: '12\n\n\n Vietnam',
    customer_phone: '0966234135',
    customer_email: 'TCH15@gmail.com',
    customer_identity_card: 'TCH15',
    customer_vat: '',
    subscription_id: 5568,
    action_type: 'Liên hệ',
    tag: 'Hết hạn',
    domain_name: 'hauat1-sapostaging',
    is_trial: true,
  },
};

interface ListStoreProps {
  user: User;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonDisabled: {
      color: theme.palette.grey[400],
    },

    container: {
      minHeight: 'calc(100vh - 150px)',
    },
  }),
);

function ListStore(props: ListStoreProps) {
  const { user } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [status, setStatus] = useState<StoreType>(StoreType.paid);

  const domain = user.tenants.map((item) => item.domain + item.service_domain);

  const [filteredListStore, setFilteredListStore] = useState<ListStoreType>({});
  // const { dataListStore, isLoadingListStore } = useGetListStore(domain);
  const { dataListStore, isLoadingListStore } = useGetListStore([
    '0993758747test-sapostaging.mysapogo.com',
    'hauat1-sapostaging.mysapo.net',
  ]);

  useEffect(() => {
    if (dataListStore) {
      const filteredData = Object.entries(dataListStore as ListStoreType)
        .filter(([key, value]) => value.is_trial === (StoreType.trial === status))
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      setFilteredListStore(filteredData);
    }
  }, [status, isLoadingListStore]);

  const handleFilter = (type: StoreType) => {
    setStatus(type);
  };

  const handleRenderContent = () => {
    if (isLoadingListStore) {
      return domain.map((_, index) => {
        return (
          <Grid item xs={4} key={index}>
            <StoreItem isLoading />
          </Grid>
        );
      });
    } else {
      if (Object.keys(filteredListStore).length === 0) {
        return <Exception />;
      } else {
        return Object.keys(filteredListStore).map((item, index) => {
          return (
            <Grid item xs={4} key={index}>
              <StoreItem fieldData={filteredListStore[item]} />
            </Grid>
          );
        });
      }
    }
  };

  return (
    <Container title={t('store.detail.descriptionTitle')} variantTitle='body2' classes={{ root: classes.container }}>
      <Box marginBottom='12px'>
        <ButtonGroup variant='text'>
          <Button
            classes={{ root: clsx(status !== StoreType.paid && classes.buttonDisabled) }}
            onClick={() => handleFilter(StoreType.paid)}
          >
            {t('store.detail.paid')}
          </Button>
          <Button
            classes={{ root: clsx(status !== StoreType.trial && classes.buttonDisabled) }}
            onClick={() => handleFilter(StoreType.trial)}
          >
            {t('store.detail.trial')}
          </Button>
        </ButtonGroup>
      </Box>
      <Grid container spacing={2}>
        {handleRenderContent()}
      </Grid>
    </Container>
  );
}

export default ListStore;
