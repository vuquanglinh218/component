import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { TabContext } from '@material-ui/lab';
import ChevronDualRight from 'components/icons/ChevronDualRight';
import ShoppingCart from 'components/icons/ShoppingCart';
import { SapoTab, SapoTabList, SapoTabPanel } from 'components/SapoTab';
import { SapoTableCell } from 'components/SapoTable';
import { DangerChip, SuccessChip, WarningChip } from 'components/StyledChip';
import React, { Fragment, useEffect, useState } from 'react';
import styles from '../styles';
import { Contract } from '../../../services/contract/model';
import { NumberUtil } from '../../../utils/NumberUtil';
import { DateTimeUtil } from '../../../utils/DateTimeUtil';
import Link from 'next/link';
import { useSupportTicket } from '../../SupportTicket/SupportTicketContext';
import { NextClientService } from '../../../services/NextClientService';
import { getTypeSupport, getWebSiteSupport } from '../../SupportTicket/TopicSupportConst';
import NotificationContent from '../../Utils/NotificationContent';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface ContractDetailTabDetailInfoProps extends WithStyles<typeof styles> {
  contract: Contract;
  appendix: Contract[];
  loadingAppendix: boolean;
}

function TabDetailInfo(props: ContractDetailTabDetailInfoProps) {
  const { classes, contract, appendix, loadingAppendix } = props;
  const [tabValue, setTabValue] = useState<string>('products');
  const [loadingAccount, setLoadingAccount] = useState<boolean>(false);
  const router = useRouter();
  const currentTab: string | string[] = router.query.currentTab;
  useEffect(() => {
    if (currentTab) {
      setTabValue(currentTab.toString());
    }
  }, []);
  const handleTabChange = (event, newValue) => {
    router
      .push(
        {
          pathname: '/contracts/' + contract.so_data.id,
          query: 'currentTab=' + newValue,
        },
        undefined,
        { shallow: true },
      )
      .then(() => {
        setTabValue(newValue);
      });
  };

  const productsTab = (
    <Box padding='0 16px'>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <SapoTableCell align='left'>Sản phẩm</SapoTableCell>
              <SapoTableCell align='center' width='10%'>
                Số lượng
              </SapoTableCell>
              <SapoTableCell align='left' width='8%'>
                Đơn vị
              </SapoTableCell>
              <SapoTableCell align='right' width='10%'>
                Đơn giá
              </SapoTableCell>
              <SapoTableCell align='right' width='10%'>
                Thuế
              </SapoTableCell>
              <SapoTableCell align='right' width='12%'>
                Chiết khấu
              </SapoTableCell>
              <SapoTableCell align='right' width='12%'>
                Thành tiền
              </SapoTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contract.lines_data.map((line) => {
              return (
                <TableRow key={line.id} style={{ height: '48px' }}>
                  <SapoTableCell align='left'>
                    <Typography variant='body2'>{line.product_template_id.name || '---'}</Typography>
                  </SapoTableCell>
                  <SapoTableCell align='center'>
                    <Typography variant='body2'>{line.product_uom_qty}</Typography>
                  </SapoTableCell>
                  <SapoTableCell align='left'>
                    <Typography variant='body2'>{line.product_uom.name || '---'}</Typography>
                  </SapoTableCell>
                  <SapoTableCell align='right'>
                    <Typography variant='body2'>{NumberUtil.formatMoney(line.price_unit)}</Typography>
                  </SapoTableCell>
                  <SapoTableCell align='right'>
                    <Typography variant='body2'>{NumberUtil.formatMoney(line.price_tax)}</Typography>
                  </SapoTableCell>
                  <SapoTableCell align='right'>
                    <Typography variant='body2'>{NumberUtil.formatMoney(line.z_amount_discount)}</Typography>
                  </SapoTableCell>
                  <SapoTableCell align='right'>
                    <Typography variant='body2'>{NumberUtil.formatMoney(line.price_subtotal)}</Typography>
                  </SapoTableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <SapoTableCell align='right' colSpan={7} style={{ border: 'unset' }}>
                <Typography component='span' variant='body1' className={classes.productTabsTotalAmountLabel}>
                  Tổng tiền:
                </Typography>
                <Typography component='span' variant='body1'>
                  {NumberUtil.formatMoney(contract.so_data.amount_total)}
                </Typography>
              </SapoTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const appendixTab = () => {
    return (
      <Box>
        <TableContainer>
          {loadingAppendix ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '75px' }}>
              <CircularProgress />
            </div>
          ) : appendix.length ? (
            <Table>
              <TableHead>
                <TableRow>
                  <SapoTableCell className={classes.nonBorderBottom} width='1%' />
                  <SapoTableCell align='left'>Mã hợp đồng</SapoTableCell>
                  <SapoTableCell align='right'>Tổng tiền</SapoTableCell>
                  <SapoTableCell align='center'>Ngày bắt đầu</SapoTableCell>
                  <SapoTableCell align='left'>Tình trạng</SapoTableCell>
                  <SapoTableCell className={classes.nonBorderBottom} width='1%' />
                </TableRow>
              </TableHead>
              <TableBody>
                {appendix.map((appendix) => (
                  <RelatedContractRow key={appendix.so_data.id} appendix={appendix} />
                ))}
              </TableBody>
            </Table>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '55px' }}>
              <Typography style={{ fontWeight: 500, fontSize: '14px' }}>Không có hợp đồng liên quan nào</Typography>
            </div>
          )}
        </TableContainer>
      </Box>
    );
  };

  function RelatedContractRow(props: { appendix: Contract }) {
    const [open, setOpen] = React.useState(false);
    const { appendix } = props;
    return (
      <Fragment key={'appendix' + appendix.so_data.id}>
        <TableRow style={{ height: '48px' }} className={open ? classes.tableClearBottomAppendix1 : ''}>
          <SapoTableCell className={classes.nonBorderBottom} width='1%' />
          <SapoTableCell align='left'>
            <Button
              variant='text'
              style={{ padding: 0 }}
              className={classes.buttonShowAppendix}
              endIcon={
                open ? (
                  <ChevronDualRight style={{ width: '18px', height: '18px' }} className={classes.rotate90} />
                ) : (
                  <ChevronDualRight style={{ width: '18px', height: '18px' }} />
                )
              }
              onClick={() => setOpen(!open)}
            >
              <Tooltip title={appendix.so_data.dms_contract_code} arrow>
                <Typography variant='body2' component='span'>
                  {appendix.so_data.dms_contract_code}
                </Typography>
              </Tooltip>
            </Button>
          </SapoTableCell>
          <SapoTableCell align='right'>
            <Typography variant='body2'>{NumberUtil.formatMoney(appendix.so_data.amount_total)}</Typography>
          </SapoTableCell>
          <SapoTableCell align='center'>
            <Typography variant='body2'>{DateTimeUtil.format(appendix.so_data.validity_date)}</Typography>
          </SapoTableCell>
          <SapoTableCell align='left'>
            <SuccessChip className={classes.relatedConstractStatus} label='Còn hiệu lực' />
          </SapoTableCell>
          <SapoTableCell className={classes.nonBorderBottom} width='1%' />
        </TableRow>
        <TableRow>
          <SapoTableCell
            style={{
              padding: 0,
              borderBottom: open ? '1px solid rgba(224, 224, 224, 1)' : 'none',
              display: open ? 'table-cell' : 'none',
            }}
            colSpan={7}
            className={classes.detailRelatedContractContainer}
          >
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box padding='12px 16px' width='max-content'>
                <Paper elevation={0} className={classes.detailRelatedContractPaper}>
                  <Typography className={classes.detailRelatedContractLabel}>Chi tiết Phụ lục hợp đồng</Typography>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <SapoTableCell align='left'>Sản phẩm</SapoTableCell>
                          <SapoTableCell align='center'>Số lượng</SapoTableCell>
                          <SapoTableCell align='center'>Đơn vị</SapoTableCell>
                          <SapoTableCell align='right'>Đơn giá</SapoTableCell>
                          <SapoTableCell align='right'>Thuế</SapoTableCell>
                          <SapoTableCell align='right'>Chiết khấu</SapoTableCell>
                          <SapoTableCell align='right'>Thành tiền</SapoTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {appendix.lines_data.map((lineData) => (
                          <TableRow key={lineData.id}>
                            <SapoTableCell align='left'>
                              <Tooltip title={lineData.product_template_id.name} arrow>
                                <Typography variant='body2' className={classes.detailRelatedConstractItemName}>
                                  {lineData.product_template_id.name || '---'}
                                </Typography>
                              </Tooltip>
                            </SapoTableCell>
                            <SapoTableCell align='center'>
                              <Typography variant='body2'>{lineData.product_uom_qty}</Typography>
                            </SapoTableCell>
                            <SapoTableCell align='center'>
                              <Typography variant='body2'>{lineData.product_uom.name || '---'}</Typography>
                            </SapoTableCell>
                            <SapoTableCell align='right'>
                              <Typography variant='body2'>{NumberUtil.formatMoney(lineData.price_unit)}</Typography>
                            </SapoTableCell>
                            <SapoTableCell align='right'>
                              <Typography variant='body2'>{NumberUtil.formatMoney(lineData.price_tax)}</Typography>
                            </SapoTableCell>
                            <SapoTableCell align='right'>
                              <Typography variant='body2'>
                                {NumberUtil.formatMoney(lineData.z_amount_discount)}
                              </Typography>
                            </SapoTableCell>
                            <SapoTableCell align='right'>
                              <Typography variant='body2'>{NumberUtil.formatMoney(lineData.price_subtotal)}</Typography>
                            </SapoTableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </Collapse>
          </SapoTableCell>
        </TableRow>
      </Fragment>
    );
  }

  const contactsTab = () => {
    const cellContent = (value: string) => {
      return <Typography variant='body2'>{value || '---'}</Typography>;
    };
    return (
      <Box padding='0 16px'>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <SapoTableCell align='left'>Họ và tên</SapoTableCell>
                <SapoTableCell align='left'>Số điện thoại</SapoTableCell>
                <SapoTableCell align='left'>Email</SapoTableCell>
                <SapoTableCell align='left'>Chức vụ</SapoTableCell>
                <SapoTableCell align='left'>Địa chỉ</SapoTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.tableClearBottom} style={{ height: '48px' }}>
                <SapoTableCell align='left'>{cellContent(contract.so_data.z_partner_represent_name)}</SapoTableCell>
                <SapoTableCell align='left'>{cellContent(contract.so_data.z_partner_represent_phone)}</SapoTableCell>
                <SapoTableCell align='left'>{cellContent(contract.so_data.z_partner_represent_email)}</SapoTableCell>
                <SapoTableCell align='left'>{cellContent(contract.so_data.z_partner_represent_job)}</SapoTableCell>
                <SapoTableCell align='left'>{cellContent(contract.so_data.z_partner_represent_address)}</SapoTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };
  const { handleSupportTicket } = useSupportTicket();
  const { enqueueSnackbar } = useSnackbar();
  const guaranteeRequest = (deviceName: string, serial: string) => {
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
        topic: 'Hỗ trợ thiết bị phần cứng',
        data: `<p>Tên thiết bị: ${deviceName} &amp; LAN<br>Serial: ${serial}<br>Vấn đề cần hỗ trợ:</p>`,
      }).open();
      setLoadingAccount(false);
    });
  };

  const hardwareTab = () => {
    let lotData = [...contract.lot_data];
    appendix.map((apd) => (lotData = [...lotData, ...apd.lot_data]));
    const shownRequestSupport = contract.lines_data
      .map((line) => line.z_website_name)
      .filter((website) => website && website !== '').length;
    return (
      <Box padding='0 16px' position='relative'>
        <Link href={'https://shop.sapo.vn'} passHref={false}>
          <a target='_blank'>
            <Button
              variant='text'
              color='primary'
              startIcon={<ShoppingCart style={{ width: '24px', height: '24px' }} />}
              className={classes.hardwareTabBuyDeviceButton}
            >
              <Typography variant='body2' component='span'>
                Mua thêm thiết bị
              </Typography>
            </Button>
          </a>
        </Link>

        <TableContainer>
          {lotData && lotData.length ? (
            <Table>
              <TableHead>
                <TableRow>
                  <SapoTableCell align='left'>Sản phẩm</SapoTableCell>
                  <SapoTableCell align='left' width='15%'>
                    Số lô/Serial
                  </SapoTableCell>
                  <SapoTableCell align='left' width='15%'>
                    Ngày bắt đầu bảo hành
                  </SapoTableCell>
                  <SapoTableCell align='left' width='15%'>
                    Ngày hết hạn bảo hành
                  </SapoTableCell>
                  {shownRequestSupport ? <SapoTableCell align='right' width='180px'></SapoTableCell> : ''}
                </TableRow>
              </TableHead>
              <TableBody>
                {lotData.map((lotData) => {
                  return (
                    <TableRow key={lotData.lot_id} style={{ height: '48px' }} className={classes.tableClearBottom}>
                      <SapoTableCell className='device' align='left'>
                        <Typography variant='body2'>{lotData.name}</Typography>
                      </SapoTableCell>
                      <SapoTableCell className='device' align='left'>
                        <Typography variant='body2'>{lotData.lot_id}</Typography>
                      </SapoTableCell>
                      <SapoTableCell className='device' align='left'>
                        <Typography variant='body2'>
                          {DateTimeUtil.format(lotData.sale_start_warranty_date) || '---'}
                        </Typography>
                      </SapoTableCell>
                      <SapoTableCell className='device' align='left'>
                        <Typography variant='body2'>
                          {DateTimeUtil.format(lotData.sale_expiration_warranty_date) || '---'}
                        </Typography>
                      </SapoTableCell>
                      {shownRequestSupport ? (
                        <SapoTableCell align='right' className={classes.hardwareTabActionCell}>
                          <Button
                            onClick={() => guaranteeRequest(lotData.name, lotData.lot_id)}
                            style={{ width: '100%' }}
                            variant='contained'
                            color='primary'
                            type='submit'
                            size='medium'
                          >
                            {loadingAccount ? (
                              <CircularProgress size={20} color={'inherit'} thickness={4} />
                            ) : (
                              'Yêu cầu bảo hành'
                            )}
                          </Button>
                        </SapoTableCell>
                      ) : (
                        ''
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '55px' }}>
              <Typography style={{ fontWeight: 500, fontSize: '14px' }}>
                Hợp đồng không có thiết bị phần cứng nào
              </Typography>
            </div>
          )}
        </TableContainer>
      </Box>
    );
  };

  const contactArea = (area: 'tabTitle' | 'detail') => {
    if (contract.so_data.z_partner_type === 'company') {
      if (area === 'tabTitle') return <SapoTab label='Liên hệ' value='contacts' />;
      return (
        <SapoTabPanel value='contacts' tabIndex={2}>
          {contactsTab()}
        </SapoTabPanel>
      );
    }
    return <div />;
  };
  return (
    <Paper variant='outlined' style={{ border: 'unset' }}>
      <TabContext value={tabValue}>
        <SapoTabList onChange={handleTabChange} indicatorColor='primary' textColor='primary'>
          <SapoTab style={{ marginLeft: '16px' }} label='Sản phẩm dịch vụ' value='products' />
          <SapoTab label='Hợp đồng liên quan' value='relatedContracts' />
          {contactArea('tabTitle')}

          <SapoTab label='Thiết bị phần cứng' value='hardware' />
        </SapoTabList>
        <SapoTabPanel value='products' tabIndex={0}>
          {productsTab}
        </SapoTabPanel>
        <SapoTabPanel value='relatedContracts' tabIndex={1}>
          {appendixTab()}
        </SapoTabPanel>
        {contactArea('detail')}
        <SapoTabPanel value='hardware' tabIndex={3}>
          {hardwareTab()}
        </SapoTabPanel>
      </TabContext>
    </Paper>
  );
}

export default withStyles(styles)(TabDetailInfo);
