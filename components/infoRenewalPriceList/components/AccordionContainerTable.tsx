import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import ChevronDown from 'components/icons/ChevronDown';
import { useTranslation } from 'next-i18next';
import { ReactNode } from 'react';

interface AccordionContainerTableProps {
  children: ReactNode;
}

const useStyles = makeStyles(
  createStyles({
    rootAccordionDetail: {
      padding: 0,
      flexDirection: 'column',
      gap: 12,
    },
  }),
);

function AccordionContainerTable(props: AccordionContainerTableProps) {
  const { children } = props;
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <Card>
      <Accordion>
        <AccordionSummary expandIcon={<ChevronDown />}>
          <Typography>{t('renewalPriceList.titleSeeMore')}</Typography>
        </AccordionSummary>
        <AccordionDetails classes={{ root: classes.rootAccordionDetail }}>{children}</AccordionDetails>
      </Accordion>
    </Card>
  );
}

export default AccordionContainerTable;
