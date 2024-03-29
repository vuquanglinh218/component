import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  container: {
    '&::before': {
      content: '""',
      display: 'block',
      height: '4px',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#FFAE06',
      color: 'red',
    },
  },
  captionLineThrough: {
    textDecoration: 'line-through',
  },
  caption: {
    fontStyle: 'normal',
  },
});

const useStylesTable = makeStyles({
  root: {},
  cell: {
    padding: 0,
    height: 36,
  },
  cellLarge: {
    width: '300px',
  },
  cellTitle: {
    backgroundColor: '#F3F4F5',
  },
  rowRoot: {
    '& td,th': {
      borderRight: '1px solid #E8EAEB',
    },
    '& td:last-child,th:last-child': {
      borderRight: 0,
    },
    '&:last-child td': {
      borderBottom: 0,
    },
  },
});

function RenewalItem() {
  const classes = useStyles();
  return (
    <Box
      className={classes.container}
      display='flex'
      flexDirection='column'
      alignItems='center'
      position='relative'
      paddingY='16px'
      gridGap={8}
    >
      <Typography variant='subtitle2'>Social Start Up</Typography>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='h1'>
          170.000
          <Typography variant='body2' component='span'>
            /tháng
          </Typography>
        </Typography>
        <Typography variant='caption' classes={{ root: clsx(classes.captionLineThrough, classes.caption) }}>
          249.000đ/tháng
        </Typography>
      </Box>
      <Typography variant='caption' classes={{ root: classes.caption }}>
        Áp dụng khi mua gói từ 2 năm
      </Typography>
      <Button variant='contained'>Gia hạn</Button>
    </Box>
  );
}

function RenewalTable() {
  const classes = useStylesTable();
  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: clsx(classes.cell, classes.cellLarge) }}></TableCell>
              <TableCell classes={{ root: classes.cell }}>
                <RenewalItem />
              </TableCell>
              <TableCell classes={{ root: classes.cell }}>
                <RenewalItem />
              </TableCell>
              <TableCell classes={{ root: classes.cell }}>
                <RenewalItem />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell colSpan={4} classes={{ root: clsx(classes.cellTitle, classes.cell) }}>
                Sản phẩm
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell colSpan={4} classes={{ root: clsx(classes.cellTitle, classes.cell) }}>
                Sản phẩm
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell colSpan={4} classes={{ root: clsx(classes.cellTitle, classes.cell) }}>
                Sản phẩm
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.cell }}>Sản phẩm</TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
              <TableCell classes={{ root: classes.cell }} align='center'>
                Không giới hạn
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell colSpan={4} classes={{ root: clsx(classes.cellTitle, classes.cell) }}>
                Sản phẩm
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RenewalTable;
