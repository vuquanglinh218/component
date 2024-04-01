import { Box, Card, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderRadius: 6,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative',
    },
  }),
);

function StoreItemSkeleton() {
  const classes = useStyles();
  return (
    <Card variant='outlined' classes={{ root: classes.root }}>
      <Box display='flex' justifyContent='space-between' marginBottom='5px'>
        <Skeleton variant='rect' width={39} height={39} animation='wave' />
      </Box>

      <Box>
        <Typography variant='h6'>
          <Skeleton animation='wave' />
        </Typography>
        <Typography variant='body2'>
          <Skeleton animation='wave' width={220} />
        </Typography>
      </Box>

      <Box display='flex' justifyContent='space-between' alignItems='flex-end' height={36}>
        <Typography variant='body2'>
          <Skeleton width={120} />
        </Typography>
      </Box>
    </Card>
  );
}

export default StoreItemSkeleton;
