import {
  Link,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { ContractListRow } from './TabTable';
import commonStyles from '../../Common/CommonStyles';
import { SapoTableCell, SapoTableHead } from '../../SapoTable';
import { DangerChip, SuccessChip, WarningChip } from '../../StyledChip';
import { useRouter } from 'next/router';
import { DateTimeUtil } from '../../../utils/DateTimeUtil';

interface ContractTableProps extends WithStyles<any> {
  contracts: Array<ContractListRow>;
}

function ContractTable(props: ContractTableProps) {
  const { contracts, classes } = props;
  const router = useRouter();
  return (
    <TableContainer>
      <Table style={{ minWidth: '1000px' }}>
        <SapoTableHead>
          <TableRow>
            <SapoTableCell className='listContract'>Mã Hợp đồng</SapoTableCell>
            <SapoTableCell className='listContract' align='left'>
              Website
            </SapoTableCell>
            <SapoTableCell className='listContract' align='left'>
              Gói dịch vụ
            </SapoTableCell>
            <SapoTableCell className='listContract' align='left'>
              Ngày bắt đầu
            </SapoTableCell>
            <SapoTableCell className='listContract' align='left'>
              Ngày kết thúc
            </SapoTableCell>
            <SapoTableCell className='listContract' align='left'>
              Trạng thái
            </SapoTableCell>
          </TableRow>
        </SapoTableHead>
        <TableBody>
          {contracts.map((contract, index) => (
            <TableRow key={index} className={classes.tableClearBottom}>
              <SapoTableCell className='listContract' component='th' scope='row'>
                <Link
                  underline='none'
                  style={{ cursor: 'pointer' }}
                  onClick={() => router.push(`/contracts/${contract.id}`).then()}
                >
                  {contract.dms_contract_code}
                </Link>
              </SapoTableCell>
              <SapoTableCell className='listContract' align='left'>
                {contract.z_website_name.map((website) => {
                  return <Typography style={{ fontSize: 14 }}>{website || '---'}</Typography>;
                })}
              </SapoTableCell>
              <SapoTableCell className='listContract' align='left'>
                {contract.sale_order_template_name || '---'}
              </SapoTableCell>
              <SapoTableCell className='listContract' align='left'>
                {DateTimeUtil.format(contract.validity_date)}
              </SapoTableCell>
              <SapoTableCell className='listContract' align='left'>
                {DateTimeUtil.format(contract.z_contract_expiry_date)}
              </SapoTableCell>
              <SapoTableCell className='listContract' align='left'>
                {contract.status === 'valid' && <SuccessChip label='Còn hiệu lực' />}
                {contract.status === 'about_to_expire' && <WarningChip label='Sắp hết hiệu lực' />}
                {contract.status === 'expired' && <DangerChip label='Hết hiệu lực' />}
              </SapoTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default withStyles(commonStyles)(ContractTable);
