import { createStyles } from '@material-ui/core';

export const dialogSupportTicketStyles = createStyles({
  generalInfoContainer: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
              "area1 area2 area3 area4"
              "area5 area6 area7 area8"            
          `,
    columnGap: 25,
    rowGap: '5px',
    margin: '12px 0',
  },
  area1: {
    gridArea: 'area1',
  },
  area2: {
    gridArea: 'area2',
  },
  area3: {
    gridArea: 'area3',
  },
  area4: {
    gridArea: 'area4',
    maxWidth: '180px',
  },
  area5: {
    gridArea: 'area5',
  },
  area6: {
    gridArea: 'area6',
  },
  area7: {
    gridArea: 'area7',
  },
  area8: {
    gridArea: 'area8',
  },
  generalInfoItemInfo: {
    fontSize: '13px',
    lineHeight: '24px',
  },
  ellipsisValue: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  buttonSubmitUpdate: {
    margin: 'unset',
    borderRadius: 3,
    marginLeft: '0.5em',
    background: '#007BFF',
    border: '1px solid #C4CCDE',
    boxShadow: 'unset',
    height: 40,
    minWidth: 96,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
  },
  buttonCancelUpdate: {
    margin: 'unset',
    borderRadius: 3,
    marginLeft: '0.5em',
    background: '#ffffff',
    border: '1px solid #0088FF',
    color: '#0088FF',
    boxShadow: 'unset',
    height: 40,
    width: 80,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '16px',
  },
  contentCreateTicketSuccess: {
    marginTop: 20,
    '& p': {
      fontSize: '13px',
      lineHeight: '24px',
      color: '#182537',
    },
  },
  contentCreateTicketFail: {
    marginTop: 20,
    '& p': {
      fontSize: '14px',
      lineHeight: '24px',
      color: '#182537',
    },
  },
  selectTopicBox: {
    paddingLeft: '24px',
    height: '48px',
    fontSize: '13px',
    lineHeight: '15px',
    width: 'calc(100% - 16px)',
    '& svg': {
      height: '1em',
      width: '1em',
    },
  },
  overrideScrollPaper: {
    alignItems: 'baseline',
  },
});
