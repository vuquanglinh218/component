import {
  Box,
  Button,
  ButtonGroup,
  Card,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Theme,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import DownloadIcon from 'components/icons/DownloadIcon';
import { SearchBar, Tag } from 'components/SharedComponents';
import { TagType } from 'components/SharedComponents/Tag';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import Exception from './Exception';

const useStylesInput = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'red',
  },
  headerRoot: {
    backgroundColor: '#F4F6F8',
  },
  cellRoot: {
    height: 40,
    padding: '0px 16px',
    ...theme.typography.body1,
  },
  cellBold: {
    ...theme.typography.h6,
  },
  selectRoot: {
    padding: '0px 8px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
  },

  textTooltip: {
    color: 'white',
    fontSize: '12px',
    fontWeight: 450,
  },
}));

function createData(
  code: string,
  name: string,
  purchaseDate: string,
  service: string,
  price: number,
  status: string,
  action: string,
) {
  return { code, name, purchaseDate, service, price, status, action };
}

let rows = [
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'COMPLETED',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'COMPLETED',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'COMPLETED',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'COMPLETED',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'COMPLETED',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'COMPLETED',
    'http://test',
  ),
];

function TableDataHistory() {
  const classes = useStylesInput();
  const { t } = useTranslation('common');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [countPage, setCountPage] = useState(1);

  useEffect(() => {
    const pages = Math.floor(rows.length / rowsPerPage);
    setCountPage(rows.length % rowsPerPage === 0 ? pages : pages + 1);
  }, [rowsPerPage]);

  const handleRowsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);

  if (rows.length === 0) {
    return <Exception />;
  }

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7}>
                <Box display='flex' width='100%' alignItems='center' gridGap={12}>
                  <Box flex={1}>
                    <SearchBar fullWidth placeholder='Tìm kiếm theo' />
                  </Box>

                  <ButtonGroup>
                    <Button>{t('purchaseHistory.time')}</Button>
                    <Button>{t('purchaseHistory.status')}</Button>
                  </ButtonGroup>
                  <Button variant='contained' disabled>
                    {t('purchaseHistory.save')}
                  </Button>
                </Box>
              </TableCell>
            </TableRow>

            <TableRow classes={{ root: classes.headerRoot }}>
              <TableCell classes={{ root: clsx(classes.cellRoot, classes.cellBold) }}>
                {t('purchaseHistory.code')}
              </TableCell>
              <TableCell classes={{ root: clsx(classes.cellRoot, classes.cellBold) }}>
                {t('purchaseHistory.nameStore')}
              </TableCell>
              <TableCell classes={{ root: clsx(classes.cellRoot, classes.cellBold) }}>
                {t('purchaseHistory.createDate')}
              </TableCell>
              <TableCell classes={{ root: clsx(classes.cellRoot, classes.cellBold) }}>
                {t('purchaseHistory.transactionContent')}
              </TableCell>
              <TableCell classes={{ root: clsx(classes.cellRoot, classes.cellBold) }} align='right'>
                {t('purchaseHistory.intoMoney')}
              </TableCell>
              <TableCell classes={{ root: clsx(classes.cellRoot, classes.cellBold) }}>
                {t('purchaseHistory.transactionStatus')}
              </TableCell>
              <TableCell classes={{ root: clsx(classes.cellRoot, classes.cellBold) }} align='center'>
                {t('purchaseHistory.operation')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell classes={{ root: classes.cellRoot }}>{row.code}</TableCell>
                <TableCell classes={{ root: classes.cellRoot }}>{row.name}</TableCell>
                <TableCell classes={{ root: classes.cellRoot }}>{row.purchaseDate}</TableCell>
                <TableCell classes={{ root: classes.cellRoot }}>{row.service}</TableCell>
                <TableCell classes={{ root: classes.cellRoot }} align='right'>
                  {row.price}
                </TableCell>
                <TableCell classes={{ root: classes.cellRoot }}>
                  <Tag variant='outlined' size='small' status={row.status as TagType} />
                </TableCell>
                <TableCell classes={{ root: classes.cellRoot }} align='center'>
                  <Tooltip
                    title={
                      <Typography classes={{ root: classes.textTooltip }}>{t('purchaseHistory.download')}</Typography>
                    }
                    arrow
                  >
                    <Button>
                      <DownloadIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 40 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableCell colSpan={7}>
              <Box display='flex' justifyContent='flex-end' alignItems='center' gridGap={12} flex={1}>
                <Box display='flex' alignItems='center' gridGap={12}>
                  <Typography>{t('purchaseHistory.display')}</Typography>
                  <Select
                    classes={{ root: classes.selectRoot }}
                    variant='outlined'
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </Box>
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>{t('purchaseHistory.result')}</Typography>
                  <Pagination count={countPage} onChange={handlePageChange} color='primary' size='small' />
                </Box>
              </Box>
            </TableCell>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default TableDataHistory;
