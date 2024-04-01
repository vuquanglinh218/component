import { Box, Button, Card, Link, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import TrailStore from 'components/icons/TrailStore';
import clsx from 'clsx';
import PaidStore from 'components/icons/PaidStore';
import { ContactPopup, Tag } from 'components';
import { TagType } from 'components/SharedComponents/Tag';
import { useTranslation } from 'next-i18next';
import { Store } from 'services/Model';
import { useRouter } from 'next/router';
import StoreItemSkeleton from '../skeletons/StoreItemSkeleton';
import { useGetUserWithDomain } from 'swr_api';
import { useState } from 'react';

export enum StoreType {
  trial = 'TRIAL',
  paid = 'PAID',
}

interface StoreItemProps {
  isLoading?: boolean;
  fieldData?: Store;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderRadius: 6,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative',
    },
    button: {
      zIndex: 12,
      backgroundColor: 'white',
    },
    overlay: {
      opacity: 0.5,
      backgroundColor: theme.palette.grey[200],
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
    },
  }),
);

export const handleRenderTag = (tag: string | boolean) => {
  switch (tag) {
    case 'Sắp hết hạn':
      return TagType.aboutToExpire;
    case 'Hết hạn 30':
      return TagType.expired;
    case 'Hết hạn':
      return TagType.expired;
    default:
      return TagType.unknown;
  }
};

function StoreItem(props: StoreItemProps) {
  const { isLoading, fieldData, ...otherProps } = props;
  const { domain_name, domain_url, is_trial, action_type, tag } = { ...fieldData };
  const classes = useStyles();
  const { t } = useTranslation('common');
  const [isOpenContactPopup, setIsOpenContactPopup] = useState<boolean>(false);

  const router = useRouter();
  const { dataUserWithDomain } = useGetUserWithDomain(action_type === 'Liên hệ' ? domain_url : null);

  const handleExtend = () => {
    router.push('stores/service-package-information/' + domain_url);
  };

  const handleContact = () => {
    setIsOpenContactPopup(true);
  };

  const handleRenderTypeStore = (isTrial: boolean) => {
    if (isTrial) {
      return <TrailStore />;
    }
    return <PaidStore />;
  };

  const handleDisable = (tag: string | boolean) => {
    if (tag === 'Hết hạn') {
      return true;
    }
    return false;
  };

  const handleRenderAction = (action: string) => {
    switch (action) {
      case 'Gia hạn':
        return {
          text: t('store.detail.extend'),
          action: handleExtend,
        };
      case 'Liên hệ':
        return {
          text: t('store.detail.contact'),
          action: handleContact,
        };

      default:
        return {
          text: t('store.detail.contact'),
          action: handleContact,
        };
    }
  };

  const handleClosePopup = () => {
    setIsOpenContactPopup(false);
  };

  return (
    <>
      {isLoading ? (
        <StoreItemSkeleton />
      ) : (
        <Card variant='outlined' classes={{ root: clsx(classes.root) }} {...otherProps}>
          <Box display='flex' justifyContent='space-between'>
            <Box position='relative' width='fit-content'>
              {handleRenderTypeStore(is_trial)}
            </Box>
            {tag === false ? undefined : <Tag variant='outlined' size='small' status={handleRenderTag(tag)} />}
          </Box>

          <Box>
            <Typography variant='h6'>{domain_name}</Typography>
            <Typography variant='body2'>{domain_url}</Typography>
          </Box>

          <Box display='flex' justifyContent='space-between' alignItems='flex-end' height={36}>
            <Link variant='body1' href={'https://' + domain_url}>
              {t('store.detail.accessStore')}
            </Link>
            <Button
              variant='outlined'
              classes={{ root: classes.button }}
              onClick={handleRenderAction(action_type).action}
            >
              {handleRenderAction(action_type).text}
            </Button>
          </Box>
          {handleDisable(tag) && <Card classes={{ root: classes.overlay }} />}
        </Card>
      )}

      {action_type === 'Liên hệ' && (
        <ContactPopup
          open={isOpenContactPopup}
          onClose={handleClosePopup}
          staffInfo={dataUserWithDomain}
          tag={handleRenderTag(tag)}
        />
      )}
    </>
  );
}

export default StoreItem;
