import { createStyles } from '@material-ui/core';

export const subscriptionInformation = createStyles({
  container: {
    padding: '16px 20px',
    maxWidth: '370px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    rowGap: '20px',
  },
  blockHeader: {
    fontWeight: 550,
  },
  blockContent: {
    marginTop: '16px',
  },
  totalPrice: {
    fontSize: '20px',
    fontWeight: 550,
  },
});
export const promoInformation = createStyles({
  item: {
    display: 'flex',
  },
  icon: {
    color: 'green',
  },
  text: {
    marginLeft: '12px',
  },
});
