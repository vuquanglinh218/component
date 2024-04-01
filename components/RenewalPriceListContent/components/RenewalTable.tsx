import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { Service } from '../data/retail';
import DoneIcon from 'components/icons/DoneIcon';
import RenewalHeaderItem from './RenewalHeaderItem';
import { useRouter } from 'next/router';
import { useSaleOrderTemplate } from 'swr_api';

const useStylesTable = makeStyles(
  createStyles({
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
  }),
);

interface RenewalTableProps {
  data: (string | Service)[][];
  numberColumnCompare?: number;
}

function RenewalTable(props: RenewalTableProps) {
  const { data, numberColumnCompare = 4 } = props;
  const classes = useStylesTable();
  const router = useRouter();
  const { categoryId, domain } = router.query;

  const { dataSaleOrderTemplate } = useSaleOrderTemplate(categoryId as string);

  const handleRenderContentCell = (content: string | Service) => {
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

  const handleRenewal = (service: Service) => {
    console.log(service.product_name);
    if (dataSaleOrderTemplate) {
      const groupSaleOrderTemplate = dataSaleOrderTemplate.filter((item) => {
        return item.product_name === service.product_name && item.order_type === service.order_type;
      });

      router.push(
        `/stores/service-package-payment?Ids=${groupSaleOrderTemplate
          .map((item) => item.sale_order_template_id)
          .join(',')}&domain=${domain}`,
      );
    }
  };

  const handleRenderHeader = (numberColumn: number, dataHeader: Service[]) => {
    return [...new Array(numberColumn).keys()].map((_, index) => {
      if (index === 0) {
        return <TableCell key={index} classes={{ root: clsx(classes.cell, classes.cellLarge) }}></TableCell>;
      }
      if (index >= dataHeader?.length) {
        return (
          <TableCell
            key={index}
            classes={{ root: clsx(classes.cell, classes.cellNoPadding, classes.cellNoBorder) }}
          ></TableCell>
        );
      }
      if (index > 0 && index < dataHeader?.length)
        return (
          <TableCell key={index} classes={{ root: clsx(classes.cell, classes.cellNoPadding) }}>
            <RenewalHeaderItem
              {...(dataHeader[index] as Service)}
              color={handleRenderColor(index)}
              onClick={() => handleRenewal(dataHeader[index] as Service)}
            />
          </TableCell>
        );
    });
  };

  const handleRenderBody = (numberColumn: number, dataBody: (string | Service)[][]) => {
    return dataBody.map((row, index) => {
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
              {handleRenderHeader(numberColumnCompare, data[0] as Service[])}
            </TableRow>
          </TableHead>

          <TableBody>{handleRenderBody(numberColumnCompare, data.slice(1))}</TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default RenewalTable;
