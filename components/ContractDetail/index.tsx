import {
  Box,
  Button,
  Grid,
  Typography,
  withStyles,
  WithStyles,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import GridItem from 'components/Grid/GridItem';
import { DangerChip, SuccessChip, WarningChip } from 'components/StyledChip';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';
import { Contract } from 'services/Model';
import { NextClientService } from 'services/NextClientService';
import GeneralInfo from './components/GeneralInfo';
import TabDetailInfo from './components/TabDetailInfo';
import styles from './styles';
import { useSupportTicket } from '../SupportTicket/SupportTicketContext';
import {
  getGeneralInformation,
  getTypeSupport,
  getWebSiteSupport,
  TypeTicketSupport,
} from '../SupportTicket/TopicSupportConst';
import NotificationContent from '../Utils/NotificationContent';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface ContractDetailProps extends WithStyles<typeof styles> {
  id: number;
  phone: string;
  email: string;
  fullName: string;
}

function ContractDetail(props: ContractDetailProps) {
  const { classes, id } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
  const [contract, setContract] = useState<Contract>(null);
  const [appendix, setAppendix] = useState<Contract[]>([]);
  const [loadingAppendix, setLoadingAppendix] = useState<boolean>(true);
  const [contractStatus, setContractStatus] = useState<string | null>(null);
  const { handleSupportTicket } = useSupportTicket();
  useEffect(() => {
    setLoading(true);
    NextClientService.getContractsDetail(id).then((res) => {
      setContract(res.data);
      setLoading(false);
    });
  }, [id]);
  useEffect(() => {
    if (!loading && contract.so_data.z_pl_ids) {
      setLoadingAppendix(contract.so_data.z_pl_ids && contract.so_data.z_pl_ids.length > 0);
      contract.so_data.z_pl_ids.map((id, index, items) => {
        NextClientService.getContractsDetail(id).then((resAppendix) => {
          appendix.push(resAppendix.data);
          setAppendix([...appendix]);
          if (items.length - 1 === index) setLoadingAppendix(false);
        });
      });
    }
  }, [loading]);
  useEffect(() => {
    if (!loadingAppendix) {
      const generalInformation = getGeneralInformation(contract, appendix);
      setContractStatus(generalInformation.status);
    }
  }, [contract, appendix, loadingAppendix]);
  const { enqueueSnackbar } = useSnackbar();
  const onRequestSupport = () => {
    if (!contract.lines_data.map((line) => line.z_website_name || null).filter((line) => line).length) {
      enqueueSnackbar(
        <NotificationContent
          content={'Yêu cầu không thành công do hợp đồng chưa có thông tin website'}
          variant={'error'}
        />,
        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          autoHideDuration: 4000,
        },
      );
      return;
    }
    setLoadingAccount(true);
    NextClientService.getAccount().then((response) => {
      const user = response.data;
      const typeSupport = getTypeSupport(contract);
      const webSite = getWebSiteSupport(contract);
      handleSupportTicket({
        typeSupport: typeSupport,
        fullName: user.full_name,
        phoneNumber: user.phone_number,
        email: user.email,
        webSite: webSite,
      }).open();
      setLoadingAccount(false);
    });
  };
  const getLinkChangePackage = () => {
    if (contract.so_data.sale_order_template_id.name === 'FnB') return 'fnb.mysapo.vn/admin/store/servicePackage';
    for (const line of contract.lines_data) {
      if (line.z_website_name && line.z_website_name.includes('mysapogo.com'))
        return (
          contract.lines_data.find((line, index, lines) => {
            return (line.z_website_name && line.z_website_name.includes('.mysapogo.com')) || lines.length - 1 === index;
          }).z_website_name + '/admin/settings/package_name/upgrade'
        );
    }
    return (
      contract.lines_data.find((line, index, lines) => {
        return (line.z_website_name && line.z_website_name.includes('.mysapo.net')) || lines.length - 1 === index;
      }).z_website_name + '/admin/settings/plans/website'
    );
  };

  if (!loading) {
    return (
      <Fragment>
        <Box display='flex' justifyContent='space-between' marginBottom='16px'>
          <Box>
            <Link href={'/contracts'} prefetch>
              <ListItem button style={{ padding: 0 }}>
                <ListItemIcon style={{ minWidth: 'unset' }}>
                  <ArrowBackIos className={classes.breadcrumbIcon} />
                </ListItemIcon>
                <ListItemText>
                  <Typography className={classes.breadcrumbLabel}>Danh sách Hợp đồng</Typography>
                </ListItemText>
              </ListItem>
            </Link>
            <Box display='flex' alignItems='center' marginTop='8px'>
              <Typography className={classes.contractCode}>{contract?.so_data.dms_contract_code}</Typography>
              {contractStatus === 'valid' && <SuccessChip className={classes.contractStatus} label='Còn hiệu lực' />}
              {contractStatus === 'about_to_expire' && (
                <WarningChip className={classes.contractStatus} label='Sắp hết hiệu lực' />
              )}
              {contractStatus === 'expired' && <DangerChip className={classes.contractStatus} label='Hết hiệu lực' />}
            </Box>
          </Box>
          {contract.lines_data.map((line) => line.z_website_name).filter((website) => website && website !== '')
            .length ? (
            <Box>
              <Link href={`https://${getLinkChangePackage()}`} passHref={false}>
                <Button
                  variant='outlined'
                  color='primary'
                  type='submit'
                  size='large'
                  className={classes.btnChangePackage}
                >
                  <a style={{ textDecoration: 'none' }} target='_blank'>
                    Thay đổi gói dịch vụ
                  </a>
                </Button>
              </Link>
              <Button
                onClick={onRequestSupport}
                variant='contained'
                color='primary'
                type='submit'
                size='large'
                className={classes.btnRequestSupport}
              >
                {loadingAccount ? <CircularProgress size={20} color={'inherit'} thickness={4} /> : 'Yêu cầu hỗ trợ'}
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Box>
        <Grid container direction='column' spacing={2}>
          <GridItem>
            <GeneralInfo contract={contract} appendix={appendix} loadingAppendix={loadingAppendix} />
          </GridItem>
          <GridItem>
            <TabDetailInfo
              key={contract.so_data.id}
              contract={contract}
              appendix={appendix}
              loadingAppendix={loadingAppendix}
            />
          </GridItem>
        </Grid>
      </Fragment>
    );
  } else {
    return (
      <Box display='flex' alignItems='center' justifyContent='center' height='calc(100vh - 200px)'>
        <CircularProgress style={{ color: '#637381' }} />
      </Box>
    );
  }
}

export default withStyles(styles)(ContractDetail);
