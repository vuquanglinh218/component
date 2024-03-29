import { createStyles, Theme } from '@material-ui/core';
import theme from '../../theme';

let styles = (them: Theme) =>
  createStyles({
    captionText: {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '19px',
      paddingBottom: '0.5rem',
      width: 'auto',
    },
    detailText: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '20px',
      color: '#637381',
      width: 'auto',
    },
  });
export default styles;
