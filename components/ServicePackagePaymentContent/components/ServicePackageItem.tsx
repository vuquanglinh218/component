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
import { useTranslation } from 'next-i18next';
import { NumberUtil } from 'utils/NumberUtil';

interface ServicePackageItemProps {
  isActive?: boolean;
  onClick?: () => void;
  fieldData?: {
    use_period: number;
    product_unit_price: number;
  };
}

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

function ServicePackageItem(props: ServicePackageItemProps) {
  const { isActive, onClick, fieldData } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <Accordion
      classes={{ root: clsx(classes.rootAccordion, isActive && classes.active), rounded: classes.roundedAccordion }}
      expanded
    >
      <AccordionSummary
        classes={{ root: classes.rootAccordionSummary, content: classes.contentAccordionSummary }}
        onClick={onClick}
      >
        <Radio size='small' checked={isActive} onClick={onClick} />
        <Typography variant='body1' style={{ flex: 1 }}>
          {fieldData?.use_period} {t('servicePackagePayment.monthUse')}
        </Typography>
        <Typography style={{ paddingRight: 12 }}>
          <Typography variant='subtitle1' component='span'>
            {NumberUtil.formatMoney(fieldData?.product_unit_price)}
          </Typography>
          /{t('servicePackagePayment.month')}
        </Typography>
      </AccordionSummary>
      <Divider variant='middle' />
      <AccordionDetails></AccordionDetails>
    </Accordion>
  );
}

export default ServicePackageItem;
