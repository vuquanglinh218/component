import { Box, Card, Table, TableCell, TableRow, Typography, createStyles, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import TransactionIcon from 'components/icons/TransactionIcon';
import { useTranslation } from 'next-i18next';

const useStyles = makeStyles(
  createStyles({
    background: {
      backgroundImage: 'url("/static/background.png")',
      backgroundSize: 'contain',
      backgroundPosition: 'top',
      backgroundRepeat: 'no-repeat',
    },
  }),
);

function Exception() {
  const { t } = useTranslation('common');
  const classes = useStyles();
  return (
    <Card>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height={'calc(100vh - 110px)'}
        className={classes.background}
      >
        <TransactionIcon />
        <Typography variant='subtitle1'>{t('purchaseHistory.noTransactions')}</Typography>
      </Box>
    </Card>
  );
}

export default Exception;
