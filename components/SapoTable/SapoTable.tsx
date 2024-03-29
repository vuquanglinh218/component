import { createStyles, TableCell, TableHead, Theme, withStyles } from '@material-ui/core';

const SapoTableHead = withStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#F4F6F8',
    },
  }),
)(TableHead);

const SapoTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '12px 8px',
      '&.listContract': {
        padding: '12px 16px',
      },
      '&.device': {
        padding: '4px',
      },
    },
    head: {
      fontWeight: 500,
    },
  }),
)(TableCell);

export { SapoTableHead, SapoTableCell };
