import { CircularProgress, Paper, Tab, Typography, withStyles, WithStyles } from '@material-ui/core';
import { TabContext } from '@material-ui/lab';
import React, { useEffect, useState, Fragment } from 'react';
import commonStyles from '../../Common/CommonStyles';
import { NextClientService } from '../../../services/NextClientService';
import ContractTable from './ContractTable';
import { SapoTab, SapoTabList, SapoTabPanel } from '../../SapoTab';
import { Contract, OrderType } from '../../../services/contract/model';
import SearchIcon from '../../icons/SearchIcon';
import { useRouter } from 'next/router';
export type ContractListRow = {
  id: number;
  dms_contract_code: string;
  z_workflow_deployment: string;
  z_website_name: Array<string>;
  validity_date: string;
  z_contract_expiry_date: string;
  status: 'valid' | 'about_to_expire' | 'expired' | null;
  z_order_type: false | 'km' | 'gh' | 'nc' | 'pl';
  sale_order_template_name: string;
  data: Contract;
};

interface TabTable extends WithStyles<any> {
  phone: string;
  email: string;
}

function TabTable(props: TabTable) {
  const { classes, phone, email } = props;
  const router = useRouter();
  const currentTab: string | string[] = router.query.currentTab;
  const [tabIndex, setTabIndex] = useState<string>(currentTab?.toString() || 'all');
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTab, setLoadingTab] = useState<boolean>(true);
  const [contractsList, setContractsList] = useState<Array<ContractListRow>>([]);
  useEffect(() => {
    setLoadingTab(true);
    const hashMapContracts: { [key: number]: ContractListRow } = {};
    NextClientService.getContractsList(tabIndex).then((res) => {
      res.data.forEach((contract) => {
        const contractsOriginId = contract.data.so_data.z_original_order_id
          ? contract.data.so_data.z_original_order_id
          : contract.id;
        hashMapContracts[contractsOriginId] = contract;
      });
      setContractsList(Object.values(hashMapContracts).sort((a, b) => b.id - a.id));

      setLoading(false);
      setLoadingTab(false);
    });
  }, [phone, email, tabIndex]);
  const handleTabChange = (event, newValue) => {
    setLoadingTab(true);
    setTabIndex(newValue);
    router
      .push(
        {
          pathname: router.pathname,
          query: 'currentTab=' + newValue,
        },
        undefined,
        { shallow: true },
      )
      .then();
  };

  const details = () => {
    if (loadingTab) {
      return (
        <Paper style={{ border: 'unset' }}>
          <div className={classes.paper} style={{ height: 200 }}>
            <CircularProgress style={{ marginTop: 80, color: '#637381' }} />
          </div>
        </Paper>
      );
    }
    if (contractsList.length === 0)
      return (
        <div style={{ textAlign: 'center', padding: '50px 0 100px 0' }}>
          <SearchIcon style={{ width: 'max-content', height: 'max-content' }} width='64' height='64' />
          <Typography style={{ width: '100%' }}>Không có hợp đồng nào phù hợp với điều kiện tìm kiếm</Typography>
        </div>
      );
    return (
      <Fragment>
        <SapoTabPanel value='all' tabIndex={0}>
          <ContractTable contracts={contractsList} />
        </SapoTabPanel>
        <SapoTabPanel value='valid' tabIndex={1}>
          <ContractTable contracts={contractsList} />
        </SapoTabPanel>
        <SapoTabPanel value='expired' tabIndex={2}>
          <ContractTable contracts={contractsList} />
        </SapoTabPanel>
      </Fragment>
    );
  };

  if (loading) {
    return (
      <Paper style={{ boxShadow: 'unset', border: '0.5px solid #A3A8AF' }}>
        <div className={classes.paper} style={{ height: 200 }}>
          <CircularProgress style={{ marginTop: 80, color: '#637381' }} />
        </div>
      </Paper>
    );
  }

  if (!loadingTab && contractsList.length === 0 && tabIndex == 'all') {
    return (
      <Paper style={{ boxShadow: 'unset', border: '0.5px solid #A3A8AF' }}>
        <div className={classes.paper}>
          <Typography style={{ fontWeight: 500, fontSize: '14px', textAlign: 'center', margin: 'auto' }}>
            Tài khoản đang đăng nhập chưa liên kết với hợp đồng nào
          </Typography>
        </div>
      </Paper>
    );
  }

  return (
    <Paper style={{ boxShadow: 'unset', border: '1px solid rgba(224, 224, 224, 1)' }}>
      <TabContext value={tabIndex}>
        <SapoTabList onChange={handleTabChange} indicatorColor='primary' textColor='primary'>
          <SapoTab label='Tất cả hợp đồng' value='all' />
          <SapoTab label='Còn hiệu lực' value='valid' />
          <SapoTab label='Hết hiệu lực' value='expired' />
        </SapoTabList>
        {details()}
      </TabContext>
    </Paper>
  );
}

export default withStyles(commonStyles)(TabTable);
