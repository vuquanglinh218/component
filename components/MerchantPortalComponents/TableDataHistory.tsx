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
  Typography,
  makeStyles,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import DownloadIcon from 'components/icons/DownloadIcon';
import Tag, { TagProps } from './Tag';

const useStylesInput = makeStyles({
  root: {
    backgroundColor: 'red',
  },
  headerRoot: {
    backgroundColor: '#F4F6F8',
  },
  cellRoot: {
    height: 40,
    padding: '0px 16px',
  },
  selectRoot: {
    padding: '0px 8px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
  },
});

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

const rows = [
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'expired',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'expired',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'expired',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'expired',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'expired',
    'http://test',
  ),
  createData(
    'HOD00001',
    'CN01 - 143 Huynh Thúc Kháng',
    '21/12/2020 08:00',
    'Omnichannel',
    4900000,
    'expired',
    'http://test',
  ),
];

function TableDataHistory() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [countPage, setCountPage] = useState(1);

  const classes = useStylesInput();

  useEffect(() => {
    const pages = Math.floor(rows.length / rowsPerPage);
    setCountPage(rows.length % rowsPerPage === 0 ? pages : pages + 1);
  }, [rowsPerPage]);

  useEffect(() => {
    console.log(page);
  }, [page]);

  const handleRowsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRowsPerPage(event.target.value as number);
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);

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
                    <Button>Thời gian</Button>
                    <Button>Dịch vụ</Button>
                    <Button>Trạng thái</Button>
                    <Button>Giá tiền</Button>
                  </ButtonGroup>
                  <Button variant='contained' disabled>
                    Lưu
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.headerRoot }}>
              <TableCell classes={{ root: classes.cellRoot }}>Mã đơn hàng</TableCell>
              <TableCell classes={{ root: classes.cellRoot }}>Tên cửa hàng</TableCell>
              <TableCell classes={{ root: classes.cellRoot }}>Ngày mua</TableCell>
              <TableCell classes={{ root: classes.cellRoot }}>Dịch vụ</TableCell>
              <TableCell classes={{ root: classes.cellRoot }} align='right'>
                Giá trị
              </TableCell>
              <TableCell classes={{ root: classes.cellRoot }}>Trạng thái giao dịch</TableCell>
              <TableCell classes={{ root: classes.cellRoot }}>Thao tác</TableCell>
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
                  <Tag label='Hoàn thành' size='small' status={row.status as TagProps['status']} />
                </TableCell>
                <TableCell classes={{ root: classes.cellRoot }} align='center'>
                  <DownloadIcon />
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
                  <Typography>Hiển thị</Typography>
                  <Select
                    classes={{ root: classes.selectRoot }}
                    variant='outlined'
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                  >
                    <MenuItem value={5}>
                      <em>5</em>
                    </MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </Box>
                <Box display='flex' alignItems='center'>
                  <Typography variant='body1'>Kết quả</Typography>
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
