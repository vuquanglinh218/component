import {
  getAuthAndLocaleServerSideProps,
  InferWithAuthServerSideProps,
  withAuthServerSideProps,
} from '../../hocs/withAuthServerSideProps';
import { Button, CircularProgress, Divider, Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import updateProfileStyles from '../../components/Common/mobile/UpdateProfile';
import MobileLayout from '../../components/layouts/MobileLayout';
import { LotData, OrderType, User } from '../../services/Model';
import React, { useEffect, useState, Fragment } from 'react';
import NonDeviceIcon from '../../components/icons/mobile/NonDeviceIcon';
import { ContractListRow } from '../../components/ContractsList/components/TabTable';
import { NextClientService } from '../../services/NextClientService';
import { DateTimeUtil } from '../../utils/DateTimeUtil';
import { getTypeSupport, getWebSiteSupport } from '../../components/SupportTicket/TopicSupportConst';

interface MobileMobileDeviceProps extends WithStyles<typeof updateProfileStyles> {
  user: User;
}
function MobileDevices(props: MobileMobileDeviceProps & InferWithAuthServerSideProps<typeof getServerSideProps>) {
  const { classes, user } = props;
  const [lotDatas, setLotDatas] = useState<Array<LotData>>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  useEffect(() => {
    NextClientService.getContractsList('all').then((res) => {
      if (res.data && res.data.length)
        setLotDatas(
          res.data
            .filter((contract) => contract.data.lot_data)
            .map((contract) => {
              const lotData = contract.data.lot_data;
              lotData.map((data) => {
                data.contractType = getTypeSupport(contract.data);
                data.website = getWebSiteSupport(contract.data);
                return data;
              });
              return lotData;
            })
            .reduce((val, next) => {
              return [...val, ...next];
            }),
        );
      setLoadingData(false);
    });
  }, []);
  const onSupportRequest = (lotData: LotData) => {
    NextClientService.getAppSource().then((res) => {
      window.location.href =
        `${res.data.appSource}support-request?type=devices&phone=${user.phone_number}` +
        `&name=${encodeURIComponent(user.full_name)}&email=${user.email}` +
        `&contractType=${encodeURIComponent(lotData.contractType)}&website=${lotData.website}`;
    });
  };
  const lotDataInformation = () => {
    if (!lotDatas || !lotDatas.length)
      return (
        <div style={{ marginTop: '33%', textAlign: 'center' }}>
          <NonDeviceIcon style={{ width: 'max-content', height: 'max-content' }} width='243' height='192' />
          <Typography style={{ width: '100%', marginTop: '20px' }}>Chưa có thiết bị phần cứng nào</Typography>
        </div>
      );
    return (
      <Fragment>
        {lotDatas.map((lot, index) => (
          <Fragment>
            <div key={lot.lot_id} style={{ padding: '12px 16px 16px 16px', backgroundColor: '#ffffff' }}>
              <Typography style={{ fontSize: '16px', fontWeight: 500, lineHeight: '40px', color: '#343741' }}>
                {lot.name}
              </Typography>
              <Typography style={{ fontSize: '13px', color: '#8F9096' }}>Serial: {lot.lot_id || '---'}</Typography>
              <Typography style={{ fontSize: '13px', color: '#8F9096' }}>
                Ngày hết hạn: {DateTimeUtil.format(lot.sale_expiration_warranty_date) || '---'}
              </Typography>
              <div
                style={{
                  padding: '20px 0 0 0',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  onClick={() => onSupportRequest(lot)}
                  variant='contained'
                  style={{
                    width: '100%',
                    backgroundColor: '#0088FF',
                    color: '#ffffff',
                    fontSize: '16px',
                    maxWidth: '175px',
                  }}
                >
                  Yêu cầu hỗ trợ
                </Button>
              </div>
            </div>
            {index === lotDatas.length ? '' : <Divider />}
          </Fragment>
        ))}
      </Fragment>
    );
  };
  return (
    <MobileLayout
      title='Thiết bị phần cứng'
      leftArea={{}}
      propParent={{
        style: {
          backgroundColor: '#ffffff',
          height: 'calc(100vh)',
          paddingTop: '46px',
          paddingLeft: 0,
          paddingRight: 0,
        },
      }}
    >
      {loadingData ? (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'calc(100vh - 44px)', alignItems: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        lotDataInformation()
      )}
    </MobileLayout>
  );
}

export const getServerSideProps = async ({ locale, req, res }) =>
  await getAuthAndLocaleServerSideProps(locale, req, res);

export default withStyles(updateProfileStyles)(MobileDevices);
