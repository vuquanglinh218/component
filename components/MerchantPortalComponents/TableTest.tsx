import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  makeStyles,
} from '@material-ui/core';
import Container from './Container';
import clsx from 'clsx';

const useStyles = makeStyles({
  tableContainerRoot: {
    borderRadius: 6,
    border: '1px solid #E8EAEB',
  },

  root: {},

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

  rootCell: {
    padding: 0,
  },
  largeCell: {
    width: '260px',
  },
  smallCell: {
    width: '60px',
  },
});

function TableTest() {
  const classes = useStyles();
  return (
    <Container title='Test bang'>
      <TableContainer classes={{ root: classes.tableContainerRoot }}>
        <Table>
          <TableHead>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell padding='default' classes={{ root: clsx(classes.rootCell, classes.largeCell) }} align='center'>
                Cot 1
              </TableCell>
              <TableCell padding='default' classes={{ root: clsx(classes.rootCell, classes.smallCell) }} align='center'>
                Cot 2
              </TableCell>
              <TableCell padding='default' classes={{ root: clsx(classes.rootCell, classes.smallCell) }} align='center'>
                Cot 3
              </TableCell>
              <TableCell padding='default' classes={{ root: clsx(classes.rootCell, classes.smallCell) }} align='center'>
                Cot 4
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 1
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }} align='center' colSpan={3}>
                Cot 2
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 1
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 2
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 3
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 4
              </TableCell>
            </TableRow>
            <TableRow classes={{ root: classes.rowRoot }}>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 1
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 2
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 3
              </TableCell>
              <TableCell classes={{ root: classes.rootCell }} align='center'>
                Cot 4
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TextField type='number' variant='outlined' />
    </Container>
  );
}

export default TableTest;
