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
import { services } from '../data/retail';
import DoneIcon from 'components/icons/DoneIcon';

const useStyles = makeStyles({
  container: (props: { color?: string }) => ({
    '&::before': {
      content: '""',
      display: 'block',
      height: '4px',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: props.color || '#0088FF',
      color: 'red',
    },
  }),
  captionLineThrough: {
    textDecoration: 'line-through',
  },
  caption: {
    fontStyle: 'normal',
  },
});

const useStylesTable = makeStyles({
  root: {
    borderCollapse: 'unset',
  },
  cell: {
    height: 36,
    paddingTop: 0,
    paddingBottom: 0,
    width: '200px',
  },
  cellNoPadding: {
    padding: 0,
  },
  cellNoBorder: {
    borderColor: 'white !important',
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
  },
});

interface RenewalItemProps extends services {
  onClick?: () => Promise<void> | void;
  color?: string;
}

function RenewalItem(props: RenewalItemProps) {
  const { product_name, product_unit_price, product_lst_price, use_period, order_type, onClick, color, ...otherProps } =
    props;
  const classes = useStyles({ color });

  const handleRenderAction = (type: string) => {
    switch (type) {
      case 'gh':
        return 'Gia hạn';
      case 'nc':
        return 'Nâng cấp';
      default:
        return 'Nâng cấp';
    }
  };
  return (
    <Box
      className={classes.container}
      display='flex'
      flexDirection='column'
      alignItems='center'
      position='relative'
      paddingY='16px'
      minHeight={180}
      gridGap={8}
    >
      <Typography variant='subtitle2'>{product_name}</Typography>
      <Box display='flex' flexDirection='column' alignItems='center' flex={1}>
        <Typography variant='h1'>
          {product_unit_price}
          <Typography variant='body2' component='span'>
            /tháng
          </Typography>
        </Typography>
        <Typography variant='caption' classes={{ root: clsx(classes.captionLineThrough, classes.caption) }}>
          {product_lst_price}/tháng
        </Typography>
      </Box>
      {use_period === 24 && (
        <Typography variant='caption' classes={{ root: classes.caption }}>
          Áp dụng khi mua gói từ 2 năm
        </Typography>
      )}
      <Button variant='contained' onClick={onClick}>
        {handleRenderAction(order_type)}
      </Button>
    </Box>
  );
}

interface RenewalTableProps {
  data: (string | services)[][];
  numberColumnCompare?: number;
}

function RenewalTable(props: RenewalTableProps) {
  const { data, numberColumnCompare = 4 } = props;
  const classes = useStylesTable();

  const handleRenderContentCell = (content: string | services) => {
    switch (content) {
      case 'none':
        return '-';
      case 'Có':
        return <DoneIcon />;
      default:
        return content;
    }
  };

  const handleRenderColor = (index: number) => {
    switch (index) {
      case 1:
        return '#0088FF';
      case 2:
        return '#0FD186';
      case 3:
        return '#FFAE06';
      default:
        return '#0088FF';
    }
  };

  const handleRenderHeader = (numberColumn: number, dataRow: services[]) => {
    return [...new Array(numberColumn).keys()].map((_, index) => {
      if (index === 0) {
        return <TableCell key={index} classes={{ root: clsx(classes.cell, classes.cellLarge) }}></TableCell>;
      }
      if (index >= dataRow?.length) {
        return (
          <TableCell
            key={index}
            classes={{ root: clsx(classes.cell, classes.cellNoPadding, classes.cellNoBorder) }}
          ></TableCell>
        );
      }
      if (index > 0 && index < dataRow?.length)
        return (
          <TableCell key={index} classes={{ root: clsx(classes.cell, classes.cellNoPadding) }}>
            <RenewalItem {...(dataRow[index] as services)} color={handleRenderColor(index)} />
          </TableCell>
        );
    });
  };

  const handleRenderBody = (numberColumn: number, body: (string | services)[][]) => {
    return body.map((row, index) => {
      if (row[1] === undefined) {
        return (
          <TableRow key={index} classes={{ root: classes.rowRoot }}>
            <TableCell colSpan={data[0].length} classes={{ root: clsx(classes.cellTitle, classes.cell) }}>
              {row[0]}
            </TableCell>
          </TableRow>
        );
      } else {
        return (
          <TableRow key={index} classes={{ root: classes.rowRoot }}>
            {[...new Array(numberColumn).keys()].map((_, index) => {
              if (index >= row?.length) {
                return null;
              }
              return (
                <TableCell key={index} classes={{ root: classes.cell }} align={index !== 0 ? 'center' : 'left'}>
                  {handleRenderContentCell(row[index])}
                </TableCell>
              );
            })}
          </TableRow>
        );
      }
    });
  };

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow classes={{ root: classes.rowRoot }}>
              {handleRenderHeader(numberColumnCompare, data[0] as services[])}
            </TableRow>
          </TableHead>

          <TableBody>{handleRenderBody(numberColumnCompare, data.slice(1))}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RenewalTable;
