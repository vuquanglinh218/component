import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../../hocs/withAuthServerSideProps';
import { AppBar, CircularProgress, Grid, Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import updateProfileStyles from '../../../components/Common/mobile/UpdateProfile';
import MobileLayout from '../../../components/layouts/MobileLayout';
import { OrderType, User } from '../../../services/Model';
import React, { useEffect, useState, Fragment } from 'react';
import { ContractListRow } from '../../../components/ContractsList/components/TabTable';
import { useRouter } from 'next/router';
import { NextClientService } from '../../../services/NextClientService';
import GridItem from '../../../components/Grid/GridItem';
import {
  ContractExpiredDateIcon,
  ContractServiceIcon,
  ContractWebsiteIcon,
} from '../../../components/icons/mobile/ContractIcon';
import GridContainer from '../../../components/Grid/GridContainer';
import { TabContext } from '@material-ui/lab';
import { SapoMobileTab, SapoMobileTabList, SapoMobileTabPanel } from '../../../components/SapoTab';
import commonStyles from '../../../components/Common/CommonStyles';
import NoteContractsIcon from '../../../components/icons/mobile/NoteContractsIcon';
import { DateTimeUtil } from '../../../utils/DateTimeUtil';

interface MobileMobileContractsProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
}
function MobileContracts(props: MobileMobileContractsProps & InferWithAuthServerSideProps<typeof getServerSideProps>) {
  const { classes, user } = props;
  const [tabIndex, setTabIndex] = useState<string>('all');
  const [isEmptyContracts, setEmptyContracts] = useState<boolean>(false);
  const [contractsList, setContractsList] = useState<Array<ContractListRow>>(null);
  const router = useRouter();
  const currentTab: string | string[] = router.query.currentTab;
  useEffect(() => {
    if (currentTab) {
      setTabIndex(currentTab.toString());
      router
        .push(
          {
            pathname: router.pathname,
          },
          undefined,
          { shallow: true },
        )
        .then(() => {});
    }
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    NextClientService.getContractsList(tabIndex)
      .then((res) => {
        if (!res.data || !res.data.length) {
          setEmptyContracts(true);
        } else {
          const hashMapContracts: { [key: number]: ContractListRow } = {};
          res.data.forEach((contract) => {
            const contractsOriginId = contract.data.so_data.z_original_order_id
              ? contract.data.so_data.z_original_order_id
              : contract.id;
            hashMapContracts[contractsOriginId] = contract;
          });
          setContractsList(Object.values(hashMapContracts).sort((a, b) => b.id - a.id));
        }
      })
      .catch((err) => {
        setEmptyContracts(true);
      });
  }, [tabIndex]);
  const handleTabChange = (event, newValue) => {
    setContractsList(null);
    setEmptyContracts(false);
    setTabIndex(newValue);
  };
  const contractInformation = (type: 'service' | 'website' | 'expired', value: any, color: string = '#182537') => {
    return (
      <GridItem key={type}>
        <Grid container direction='row' justify='space-between'>
          <Grid item style={{ minWidth: '146px', display: 'flex', justifyContent: 'left', paddingTop: '4px' }}>
            {type === 'service' ? (
              <ContractServiceIcon width={14} height={10} />
            ) : type === 'website' ? (
              <ContractWebsiteIcon width={14} height={10} />
            ) : (
              <ContractExpiredDateIcon width={14} height={10} />
            )}
            <Typography
              style={{
                paddingLeft: '8px',
                fontSize: '13px',
                paddingTop: '3px',
                color: type === 'expired' ? '#33A0FF' : '#747C87',
              }}
            >
              {type === 'service' ? 'Gói dịch vụ ' : type === 'website' ? 'Website' : 'Ngày hết hạn'}
            </Typography>
          </Grid>
          <Grid item style={{ width: 'calc(100% - 146px)', display: 'flex', alignItems: 'flex-end' }}>
            <Typography
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '13px',
                paddingTop: '3px',
                color: color,
              }}
            >
              : {value && value.length ? value : '---'}
            </Typography>
          </Grid>
        </Grid>
      </GridItem>
    );
  };
  const contractItems = (contractsList: ContractListRow[]) => {
    return (
      <div
        style={{
          backgroundColor: '#F6F7FB',
          padding: 0,
          color: '#8F9096',
          fontSize: '13px',
          minHeight: 'calc(100vh - 44px)',
        }}
      >
        <Typography style={{ padding: '10px 0 8px 16px', fontSize: '13px' }}>
          {contractsList.length} hợp đồng
        </Typography>
        {contractsList
          .sort((a, b) => new Date(a.data.so_data.z_sign_day).getTime() - new Date(b.data.so_data.z_sign_day).getTime())
          .map((contract) => {
            return (
              <div
                key={contract.id}
                onClick={() =>
                  router.push({
                    pathname: 'contracts/' + contract.id,
                    query: 'currentTab=' + tabIndex,
                  })
                }
                style={{
                  backgroundColor: '#fff',
                  margin: '0 8px 12px 8px',
                  borderRadius: '5px',
                  boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.102)',
                }}
              >
                <GridContainer className={classes.containerContract}>
                  <GridItem>
                    <Typography className={classes.contractTitle}>Hợp đồng {contract.dms_contract_code}</Typography>
                  </GridItem>
                  {contractInformation('service', contract.sale_order_template_name || '---')}
                  {contractInformation('website', contract.z_website_name ? contract.z_website_name.join(', ') : '---')}
                  {contractInformation(
                    'expired',
                    DateTimeUtil.format(contract.z_contract_expiry_date),
                    contract.status === 'expired'
                      ? '#EB3838'
                      : contract.status === 'about_to_expire'
                        ? '#FF9351'
                        : '#33A0FF',
                  )}
                </GridContainer>
              </div>
            );
          })}
      </div>
    );
  };

  const detailTab = () => {
    if (!contractsList) {
      return (
        <Paper>
          <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
            <CircularProgress />
          </div>
        </Paper>
      );
    }
    if (isEmptyContracts)
      return (
        <Paper style={{ backgroundColor: '#ffffff', height: 'calc(100vh - 65px)' }}>
          <div style={{ paddingTop: '33%', textAlign: 'center' }}>
            <NoteContractsIcon style={{ width: 'max-content', height: 'max-content' }} width='243' height='192' />
            <Typography style={{ width: '100%', marginTop: '20px' }}>
              {tabIndex === 'expired' ? 'Chưa có hợp đồng hết hiệu lực nào' : 'Chưa có hợp đồng còn hiệu lực nào'}
            </Typography>
          </div>
        </Paper>
      );
    return contractItems(contractsList);
  };
  const tabs = () => {
    return (
      <Fragment>
        <SapoMobileTabPanel value='all' tabIndex={0}>
          {detailTab()}
        </SapoMobileTabPanel>
        <SapoMobileTabPanel value='valid' tabIndex={1}>
          {detailTab()}
        </SapoMobileTabPanel>
        <SapoMobileTabPanel value='expired' tabIndex={2}>
          {detailTab()}
        </SapoMobileTabPanel>
      </Fragment>
    );
  };
  const menu = (
    <SapoMobileTabList
      onChange={handleTabChange}
      indicatorColor='primary'
      variant='fullWidth'
      style={{ backgroundColor: '#ffffff', margin: '0 16px', borderBottom: 'unset' }}
      textColor='primary'
    >
      <SapoMobileTab style={{ width: '33%' }} label='Tất cả' value='all' />
      <SapoMobileTab style={{ width: '33%' }} label='Còn hiệu lực' value='valid' />
      <SapoMobileTab style={{ width: '34%' }} label='Hết hiệu lực' value='expired' />
    </SapoMobileTabList>
  );

  if (isEmptyContracts && tabIndex === 'all')
    return (
      <MobileLayout
        title='Danh sách hợp đồng'
        leftArea={{}}
        propParent={{ style: { backgroundColor: '#ffffff', height: 'calc(100vh - 44px)' } }}
      >
        <div style={{ marginTop: '33%', textAlign: 'center' }}>
          <NoteContractsIcon style={{ width: 'max-content', height: 'max-content' }} width='243' height='192' />
          <Typography style={{ width: '100%', marginTop: '20px' }}>Chưa có hợp đồng nào</Typography>
        </div>
      </MobileLayout>
    );
  return (
    <TabContext value={tabIndex}>
      <MobileLayout
        propParent={{ style: { backgroundColor: '#F6F7FB', padding: '64px 0 0 0' } }}
        title='Danh sách hợp đồng'
        leftArea={{}}
        appBarStyle={{ height: 'auto', minHeight: '30px' }}
        stickyElement={menu}
      >
        {tabs()}
      </MobileLayout>
    </TabContext>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(commonStyles)(MobileContracts);
