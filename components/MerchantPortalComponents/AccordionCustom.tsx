import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Theme,
  makeStyles,
  Typography,
  Divider,
  Radio,
} from '@material-ui/core';
import BasicDone from 'components/icons/BasicDone';

interface accordionCustomProps {
  summary: string;
  promotionDetail?: string[];
  isActive?: boolean;
}

interface promotionDetailProps {
  data: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
  active: {
    borderColor: theme.palette.primary.main,
  },
}));

function PromotionDetail(props: promotionDetailProps) {
  const { data, ...resProps } = props;
  return (
    <List>
      {data &&
        data.map((item, index) => {
          return (
            <ListItem key={index} style={{ paddingLeft: 40, gap: 12 }}>
              <BasicDone />
              <Typography variant='body1'>{item}</Typography>
            </ListItem>
          );
        })}
    </List>
  );
}

function AccordionCustom(props: accordionCustomProps) {
  const { summary, promotionDetail, isActive } = props;
  const classes = useStyles();
  return (
    <Accordion classes={{ root: isActive && classes.active }}>
      <AccordionSummary>
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
      <AccordionDetails>
        <PromotionDetail data={promotionDetail} />
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionCustom;
