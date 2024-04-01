import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Radio,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      border: `1px solid ${theme.palette.primary.main} !important`,
    },
    rootAccordion: {
      boxShadow: 'none',
      border: `1px solid ${theme.palette.grey[400]}`,
      overflow: 'hidden',
    },
    roundedAccordion: {
      borderRadius: 6,
      '&:first-child': {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
      },
      '&.Mui-expanded:first-child': {
        borderRadius: 6,
      },
    },
    rootAccordionSummary: {
      height: 44,
      minHeight: 44,
      '&.Mui-expanded': {
        minHeight: 44,
      },
    },
    contentAccordionSummary: {
      alignItems: 'center',
    },
  }),
);

function ServicePackageItemSkeleton() {
  const classes = useStyles();
  const { t } = useTranslation('common');
  return (
    <Accordion classes={{ root: clsx(classes.rootAccordion), rounded: classes.roundedAccordion }} expanded>
      <AccordionSummary classes={{ root: classes.rootAccordionSummary, content: classes.contentAccordionSummary }}>
        <Radio size='small' disabled />
        <Typography variant='body1' style={{ flex: 1 }}>
          <Skeleton width={120} />
        </Typography>
        <Typography style={{ paddingRight: 12 }}>
          <Typography variant='subtitle1' component='span'>
            <Skeleton width={130} />
          </Typography>
        </Typography>
      </AccordionSummary>
      <Divider variant='middle' />
      <AccordionDetails>
        <Box>
          <Skeleton width={240} />
          <Skeleton width={240} />
          <Skeleton width={240} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default ServicePackageItemSkeleton;
