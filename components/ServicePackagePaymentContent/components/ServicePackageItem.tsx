import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Radio,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

interface ServicePackageItemProps {
  summary: string;
  promotionDetail?: string[];
  isActive?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    active: {
      borderColor: theme.palette.primary.main,
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

function ServicePackageItem(props: ServicePackageItemProps) {
  const { summary, promotionDetail, isActive } = props;
  const classes = useStyles();

  return (
    <Accordion
      classes={{ root: clsx(classes.rootAccordion, isActive && classes.active), rounded: classes.roundedAccordion }}
    >
      <AccordionSummary classes={{ root: classes.rootAccordionSummary, content: classes.contentAccordionSummary }}>
        <Radio size='small' checked={true} />
        <Typography variant='body1' style={{ flex: 1 }}>
          {summary}
        </Typography>
        <Typography style={{ paddingRight: 12 }}>
          <Typography variant='subtitle1' component='span'>
            170.000
          </Typography>
          /tháng
        </Typography>
      </AccordionSummary>
      <Divider variant='middle' />
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
}

export default ServicePackageItem;
