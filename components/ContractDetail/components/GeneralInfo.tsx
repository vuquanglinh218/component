import { Divider, Grid, Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
import React, { Fragment, ReactElement, useEffect } from 'react';
import { Contract, OrderType } from 'services/Model';
import { NumberUtil } from 'utils/NumberUtil';
import styles from '../styles';
import { DateTimeUtil } from '../../../utils/DateTimeUtil';
import { getGeneralInformation } from '../../SupportTicket/TopicSupportConst';

interface ContractDetailGeneralInfoProps extends WithStyles<typeof styles> {
  contract: Contract;
  appendix: Contract[];
  loadingAppendix: boolean;
}

function GeneralInfo(props: ContractDetailGeneralInfoProps) {
  const { classes, contract, appendix, loadingAppendix } = props;
  const [contractWebsite, setContractWebsite] = React.useState([]);
  const [saleOrderTemplateName, setSaleOrderTemplateName] = React.useState<string | false>('');
  const [contractExpiryDate, setContractExpiryDate] = React.useState<string | false>('');
  useEffect(() => {
    if (!loadingAppendix) {
      const generalInformation = getGeneralInformation(contract, appendix);
      setContractExpiryDate(generalInformation.contractExpiryDate);
      setContractWebsite(generalInformation.contractWebsite);
      setSaleOrderTemplateName(generalInformation.saleOrderTemplateName);
    }
  }, [contract, appendix, loadingAppendix]);

  const informationContractCol1 = {
    'Gói dịch vụ': saleOrderTemplateName,
    'Ngày ký': DateTimeUtil.format(contract.so_data.z_sign_day),
    'Ngày bắt đầu': DateTimeUtil.format(contract.so_data.validity_date),
    'Ngày hết hạn': contractExpiryDate === false ? '---' : DateTimeUtil.format(contractExpiryDate),
    Website: contractWebsite,
  };
  const informationContractCol2 = {
    'Khách hàng': contract.so_data.z_partner_name,
  };
  if (contract.so_data.z_partner_type === 'company') {
    informationContractCol2['Người đại diện'] = contract.so_data.z_deputy_id.name;
    informationContractCol2['Mã số thuế'] = contract.so_data.z_partner_job_tax;
  } else {
    informationContractCol2['CMT/CCCD'] = contract.so_data.z_partner_private_code;
  }
  informationContractCol2['Tổng tiền hợp đồng'] = NumberUtil.formatMoney(contract.so_data.amount_total);
  informationContractCol2['Đã thanh toán'] = (
    <Typography
      className={classes.generalInfoItemInfo}
      style={{ color: contract.so_data.amount_total - contract.so_data.z_amount_paid > 0 ? '#EB3838' : '#182537' }}
    >
      {NumberUtil.formatMoney(contract.so_data.z_amount_paid)}
    </Typography>
  );

  const informationContractCol3 = {
    Email: contract.so_data.z_partner_mail,
    'Số điện thoại': contract.so_data.z_partner_phone,
    'Địa chỉ': contract.so_data.z_partner_street,
  };
  const informationArea = (key: string, ...values: any[]): ReactElement => {
    return (
      <Fragment>
        <Grid item className={classes.informationKey}>
          <Typography className={classes.generalInfoItemInfo}>{key + ':'}</Typography>
        </Grid>
        <Grid item className={classes.informationValue}>
          {values.map((v) => {
            if (v instanceof Array) {
              return v.map((_v) => (
                <Typography className={classes.generalInfoItemInfo} key={_v}>
                  {_v || '---'}
                </Typography>
              ));
            }
            if (React.isValidElement(v)) return v;
            return (
              <Typography className={classes.generalInfoItemInfo} key={v}>
                {v || '---'}
              </Typography>
            );
          })}
        </Grid>
      </Fragment>
    );
  };
  const informationC = (information: {}) => {
    const result = [];
    for (const prop in information) {
      result.push(informationArea(prop, information[prop]));
    }
    return (
      <Grid
        item
        container
        className={classes.informationCol}
        direction='row'
        justify='space-between'
        lg={4}
        md={6}
        sm={12}
      >
        {result}
      </Grid>
    );
  };
  return (
    <Paper variant='outlined' style={{ border: 'unset' }}>
      <Typography className={classes.generalInfoLabel}>Thông tin chung</Typography>
      <Divider />
      <Grid container direction='row' justify='space-between' className={classes.information}>
        {informationC(informationContractCol1)}
        {informationC(informationContractCol2)}
        {informationC(informationContractCol3)}
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(GeneralInfo);
