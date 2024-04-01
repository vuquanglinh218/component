import { Button, CircularProgress, Divider, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import updateProfileStyles from '../../../components/Common/mobile/UpdateProfile';
import { useRouter } from 'next/router';
import React, { useEffect, useState, Fragment, CSSProperties } from 'react';
import { Contract, User } from '../../../services/Model';
import { getAuthAndLocaleServerSideProps, withAuthServerSideProps } from '../../../hocs/withAuthServerSideProps';
import { NextClientService } from '../../../services/NextClientService';
import MobileLayout from '../../../components/layouts/MobileLayout';
import { TabContext } from '@material-ui/lab';
import { SapoMobileTab, SapoMobileTabList, SapoMobileTabPanel } from '../../../components/SapoTab';
import GridItem from '../../../components/Grid/GridItem';
import NoteContractsIcon from '../../../components/icons/mobile/NoteContractsIcon';
import { DateTimeUtil } from '../../../utils/DateTimeUtil';
import { NumberUtil } from '../../../utils/NumberUtil';
import {
  getGeneralInformation,
  getTypeSupport,
  getWebSiteSupport,
} from '../../../components/SupportTicket/TopicSupportConst';

interface ContractDetailProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
}

class InformationType {
  key: string;
  value: string[];
  valueStyle: CSSProperties = {
    paddingTop: '4px',
    fontSize: '16px',
    color: '#343741',
    lineHeight: '18px',
  };
  keyStyle: CSSProperties = {
    color: '#8F9096',
    fontSize: '13px',
  };
  leftValue?: string;
  leftValueStyle?: CSSProperties = {
    color: '#343741',
    fontSize: '16px',
    fontWeight: 500,
    width: '33%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'end',
  };
  constructor(key: string, ...value: string[]) {
    this.key = key;
    this.value = value;
  }
  withLeftValue(value: any, valueStyle?: CSSProperties) {
    this.leftValue = value;
    this.leftValueStyle = { ...this.leftValueStyle, ...valueStyle };
    this.valueStyle.width = '66%';

    return this;
  }
  withValueStyle(valueStyle: CSSProperties) {
    this.valueStyle = { ...this.valueStyle, ...valueStyle };
    return this;
  }
  moreInformation() {
    this.valueStyle.color = '#8F9096';
    this.valueStyle.fontSize = '13px';
    this.keyStyle.color = '#343741';
    this.keyStyle.fontSize = '16px';
    return this;
  }
}

function ContractDetail(props: ContractDetailProps) {
  const { classes, user } = props;
  const [contract, setContract] = useState<Contract>();
  const [appendix, setAppendix] = useState<Contract[]>([]);
  const [loadingAppendix, setLoadingAppendix] = useState(true);
  const [generalInformation, setGeneralInformation] = useState<InformationType[]>([]);
  const [customerInformation, setCustomerInformation] = useState<InformationType[]>([]);
  const [contactInformation, setContactInformation] = useState<InformationType[]>([]);
  const [hardwareInformation, setHardwareInformation] = useState<InformationType[]>([]);
  const [tabIndex, setTabIndex] = useState<string>('detail');
  const router = useRouter();
  const { contractId, currentTab } = router.query;
  const [title, setTitle] = useState('Hợp đồng');
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log('get data');
    NextClientService.getContractsDetail(contractId)
      .then((res) => {
        setContract(res.data);
        if (res.data?.so_data?.z_pl_ids.length) {
          res.data.so_data.z_pl_ids.map((id, index, items) => {
            NextClientService.getContractsDetail(id)
              .then((resAppendix) => {
                appendix.push(resAppendix.data);
                setAppendix(appendix);
              })
              .finally(() => {
                if (items.length - 1 === index) setLoadingAppendix(false);
              });
          });
        } else {
          setLoadingAppendix(false);
        }
      })
      .catch(() => {
        setLoadingAppendix(false);
      });
  }, []);

  useEffect(() => {
    if (!loadingAppendix) {
      const generalInformation = getGeneralInformation(contract, appendix);

      const contractExpiryDate = new InformationType(
        'Hiệu lực hợp đồng',
        generalInformation.contractExpiryDate ? DateTimeUtil.format(generalInformation.contractExpiryDate) : '---',
      );
      contractExpiryDate.withValueStyle({
        color:
          generalInformation.status === 'valid'
            ? '#33A0FF'
            : generalInformation.status === 'about_to_expire'
              ? '#FF9351'
              : '#EB3838',
      });

      const amountPaid = new InformationType(
        'Tổng tiền đã nộp',
        NumberUtil.formatMoney(contract.so_data.z_amount_paid),
      ).withValueStyle(
        contract.so_data.amount_total - contract.so_data.z_amount_paid > 0 ? { color: '#EB3838' } : { fontWeight: 500 },
      );

      setGeneralInformation([
        new InformationType(
          'Gói dịch vụ',
          generalInformation.saleOrderTemplateName ? generalInformation.saleOrderTemplateName : '---',
        ),
        new InformationType('Website', ...generalInformation.contractWebsite),
        contractExpiryDate,
        new InformationType('Tổng tiền hợp đồng', NumberUtil.formatMoney(contract.so_data.amount_total)).withValueStyle(
          { fontWeight: 500 },
        ),
        amountPaid,
      ]);
    }
  }, [contract, appendix, loadingAppendix]);

  useEffect(() => {
    if (contract) {
      setTitle('Hợp đồng ' + contract.so_data.dms_contract_code);

      setCustomerInformation([
        new InformationType('Khách hàng', contract.so_data.z_partner_name),
        new InformationType(
          'Mã số thuế',
          contract.so_data.z_partner_job_tax ? contract.so_data.z_partner_job_tax.toString() : '---',
        ),
        new InformationType('Địa chỉ', contract.so_data.z_partner_street || '---'),
        new InformationType('Số điện thoại', contract.so_data.z_partner_phone),
        new InformationType('Email', contract.so_data.z_partner_mail),
      ]);
      const _contactInformation = [];
      if (contract.so_data.z_partner_represent_name) {
        const partnerRepresentValue = [];
        if (contract.so_data.z_partner_represent_job)
          partnerRepresentValue.push(contract.so_data.z_partner_represent_job);
        if (contract.so_data.z_partner_represent_phone)
          partnerRepresentValue.push(contract.so_data.z_partner_represent_phone);
        _contactInformation.push(
          new InformationType(contract.so_data.z_partner_represent_name, ...partnerRepresentValue).moreInformation(),
        );
      }
      setContactInformation(_contactInformation);
      if (contract.lot_data && contract.lot_data.length) {
        setHardwareInformation(
          contract.lot_data.map((lot) => {
            return new InformationType(
              lot.name,
              lot.lot_id,
              DateTimeUtil.format(lot.sale_expiration_warranty_date),
            ).moreInformation();
          }),
        );
      }
    }
  }, [contract]);

  const serviceDetailInformation = (key: string, value: string, isLastItem: boolean = false) => {
    return (
      <Fragment key={key}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
          <Typography>{key}</Typography>
          <Typography>{value}</Typography>
        </div>
        {isLastItem ? '' : <Divider />}
      </Fragment>
    );
  };
  const serviceInformation = () => {
    if (!contract.lines_data || !contract.lines_data.length) return '';
    return (
      <div style={{ backgroundColor: '#F6F7FB', padding: 0, width: '100%' }}>
        <Typography style={{ padding: '8px 0 8px 12px', color: '#343741', fontSize: '16px', fontWeight: 500 }}>
          Thông tin sản phẩm dịch vụ
        </Typography>
        <div
          style={{
            padding: '0 16px',
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E8EAEB',
            borderBottom: '1px solid #E8EAEB',
          }}
        >
          {contract.lines_data.map((data) => {
            return (
              <Fragment key={data.id}>
                {serviceDetailInformation(
                  data.product_template_id.name || '---',
                  NumberUtil.formatMoney(data.price_subtotal),
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    );
  };
  const detailArea = () => {
    if (loadingAppendix)
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'calc(100vh - 146px)',
            backgroundColor: '#F6F7FB',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      );
    return (
      <div style={{ backgroundColor: '#F6F7FB' }}>
        {informationBox('Thông tin chung', generalInformation)}
        {serviceInformation()}
        {informationBox('Thông tin khách hàng', customerInformation)}
        {contactInformation && contactInformation.length ? informationBox('Người liên hệ', contactInformation) : ''}
        {hardwareInformation && hardwareInformation.length
          ? informationBox('Thông tin phần cứng', hardwareInformation)
          : ''}
        <div style={{ height: '12px', backgroundColor: '#F6F7FB' }} />
      </div>
    );
  };
  const columnInformation = (detail: InformationType, isLast: boolean = false) => {
    return (
      <GridItem key={detail.key}>
        <Grid container direction='row' justify='space-between' style={{ paddingBottom: '8px', paddingTop: '8px' }}>
          <Grid item style={detail.leftValue ? { width: '66%' } : {}}>
            <Typography style={detail.keyStyle}>{detail.key}</Typography>
            {detail.value.map ? (
              detail.value.map((val, i) => {
                return (
                  <Typography key={val + i.toString()} style={detail.valueStyle}>
                    {val}
                  </Typography>
                );
              })
            ) : (
              <Typography style={detail.valueStyle}>{detail.value}</Typography>
            )}
          </Grid>
          {detail.leftValue ? <Typography style={detail.leftValueStyle}>{detail.leftValue}</Typography> : ''}
        </Grid>
        {isLast ? '' : <Divider />}
      </GridItem>
    );
  };
  const detailInformation = (details: InformationType[]) => {
    return (
      <div style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid #E8EAEB', borderBottom: '1px solid #E8EAEB' }}>
        {details.map((detail, i) => {
          return columnInformation(detail, i === details.length - 1);
        })}
      </div>
    );
  };

  const informationBox = (title: string, details: InformationType[]) => {
    return (
      <div style={{ backgroundColor: '#F6F7FB', padding: 0, width: '100%' }}>
        <Typography style={{ padding: '8px 0 8px 12px', color: '#343741', fontSize: '16px', fontWeight: 500 }}>
          {title}
        </Typography>
        {detailInformation(details)}
      </div>
    );
  };
  const action = () => {
    return () => router.push('/m/contracts?currentTab=' + currentTab);
  };
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  const getExpireDateColor = (expireDate): CSSProperties => {
    if (!expireDate || expireDate === '') return {};
    const diffTime = new Date().getTime() - new Date(expireDate).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

    return { color: diffDays < -59 ? '#33A0FF' : diffDays < 1 ? '#FF9351' : '#EB3838' };
  };
  const appendixArea = () => {
    if (!contract)
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'inherit',
            backgroundColor: '#F6F7FB',
          }}
        >
          <CircularProgress />
        </div>
      );
    if (!appendix || !appendix.length) {
      // @ts-ignore
      document.body.style = 'background: #ffffff;';
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: 'calc(100vh - 76px)',
            backgroundColor: '#ffffff',
            alignItems: 'center',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <NoteContractsIcon style={{ width: 'max-content', height: 'max-content' }} width='243' height='192' />
            <Typography style={{ width: '100%', marginTop: '20px' }}>Chưa có phụ lục hợp đồng nào</Typography>
          </div>
        </div>
      );
    }
    // @ts-ignore
    document.body.style = 'background: #F6F7FB;';
    return (
      <div>
        {appendix.map((_contract) => {
          const informationElement = [
            new InformationType(
              'Hiệu lực',
              _contract.so_data.z_contract_expiry_date
                ? DateTimeUtil.format(_contract.so_data.z_contract_expiry_date)
                : '---',
            ).withValueStyle(getExpireDateColor(_contract.so_data.z_contract_expiry_date)),
            new InformationType(
              'Tổng tiền phụ lục',
              NumberUtil.formatMoney(_contract.so_data.amount_total),
            ).withValueStyle({ fontWeight: 500 }),
            new InformationType(
              'Tổng tiền đã nộp',
              NumberUtil.formatMoney(_contract.so_data.z_amount_paid),
            ).withValueStyle(
              _contract.so_data.amount_total - _contract.so_data.z_amount_paid > 0
                ? { color: '#EB3838', fontWeight: 500 }
                : { fontWeight: 500 },
            ),
          ];
          _contract.lines_data.forEach((line) =>
            informationElement.push(
              new InformationType(line.product_template_id.name || '---', 'Số lượng: ' + line.product_uom_qty)
                .moreInformation()
                .withLeftValue(NumberUtil.formatMoney(line.price_total)),
            ),
          );

          return informationBox('Phụ lục ' + _contract.so_data.dms_contract_code, informationElement);
        })}
      </div>
    );
  };
  const onSupportRequest = () => {
    NextClientService.getAppSource().then((res) => {
      const typeSupport = getTypeSupport(contract);
      const webSite = getWebSiteSupport(contract);
      window.location.href =
        `${res.data.appSource}support-request?type=contracts&phone=${user.phone_number}` +
        `&name=${encodeURIComponent(user.full_name)}&email=${user.email}` +
        `&contractType=${encodeURIComponent(getTypeSupport(contract))}&website=${webSite}`;
    });
  };
  const stickyElement = (
    <SapoMobileTabList
      onChange={handleTabChange}
      indicatorColor='primary'
      style={{ backgroundColor: '#ffffff', margin: '0 16px', borderBottom: 'unset' }}
      textColor='primary'
    >
      <SapoMobileTab style={{ width: '50%' }} label='Chi tiết hợp đồng' value='detail' />
      <SapoMobileTab style={{ width: '50%' }} label='Phụ lục hợp đồng' value='appendix' />
    </SapoMobileTabList>
  );
  return (
    <TabContext value={tabIndex}>
      <MobileLayout
        propParent={{ style: { backgroundColor: '#F6F7FB', padding: '64px 0 0 0' } }}
        title={title}
        leftArea={{ action }}
        appBarStyle={{ height: 'auto', minHeight: 'unset' }}
        stickyElement={stickyElement}
      >
        <SapoMobileTabPanel value='detail' tabIndex={0}>
          {detailArea()}
        </SapoMobileTabPanel>
        <SapoMobileTabPanel value='appendix' tabIndex={0}>
          {appendixArea()}
        </SapoMobileTabPanel>
        <div
          style={{
            height: '12px',
            backgroundColor: tabIndex === 'appendix' && (!appendix || !appendix.length) ? '#ffffff' : '#F6F7FB',
          }}
        />
        {(tabIndex === 'detail' && contract) || (tabIndex === 'appendix' && appendix?.length) ? (
          <Fragment>
            <div style={{ height: '55px' }} />
            <div
              style={{
                padding: '8px 16px',
                backgroundColor: '#FFFFFF',
                borderTop: '1px solid #E8EAEB',
                height: '55px',
                position: 'fixed',
                width: '100%',
                bottom: 0,
              }}
            >
              <Button
                onClick={onSupportRequest}
                variant='contained'
                style={{ width: '100%', backgroundColor: '#0088FF', color: '#ffffff', fontSize: '16px' }}
              >
                Gửi yêu cầu hỗ trợ
              </Button>
            </div>
          </Fragment>
        ) : (
          ''
        )}
      </MobileLayout>
    </TabContext>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(updateProfileStyles)(ContractDetail);
