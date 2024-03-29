import { createStyles } from '@material-ui/core';

let styles = (theme) => {
  return createStyles({
    generalInfoContainer: {
      display: 'grid',
      gridTemplateColumns: '140px 1fr 140px 1fr 140px 1fr',
      gridTemplateRows: 'auto',
      gridTemplateAreas: `
              "area1 area2 area3 area4 area5 area6"
              "area7 area8 area9 area10 area11 area12"
              "area13 area14 area15 area16 area11 area12"
              "area17 area18 area15 area16 area21 area22"
              "area23 area24 area25 area26 area21 area22"              
          `,
      columnGap: 0,
      rowGap: '5px',
      margin: '12px 24px',
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
    area9: {
      gridArea: 'area9',
    },
    area10: {
      gridArea: 'area10',
    },
    area11: {
      gridArea: 'area11',
    },
    area12: {
      gridArea: 'area12',
    },
    area13: {
      gridArea: 'area13',
    },
    area14: {
      gridArea: 'area14',
    },
    area15: {
      gridArea: 'area15',
    },
    area16: {
      gridArea: 'area16',
    },
    area17: {
      gridArea: 'area17',
    },
    area18: {
      gridArea: 'area18',
    },
    area19: {
      gridArea: 'area19',
    },
    area20: {
      gridArea: 'area20',
    },
    area21: {
      gridArea: 'area21',
    },
    area22: {
      gridArea: 'area22',
    },
    area23: {
      gridArea: 'area23',
    },
    area24: {
      gridArea: 'area24',
    },
    area25: {
      gridArea: 'area25',
    },
    area26: {
      gridArea: 'area26',
    },
    generalInfoLabel: {
      fontSize: '16px',
      lineHeight: '24px',
      margin: '12px 0 12px 24px',
      fontWeight: 500,
      paddingTop: '12px',
    },
    generalInfoDivider: {
      heigth: '0.5px',
      backgroundColor: 'rgba(163, 168, 175, 1)',
    },
    generalInfoItemInfo: {
      fontSize: '14px',
      lineHeight: '24px',
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
    },
    breadcrumbIcon: {
      color: '#747C87',
      height: '12px',
    },
    breadcrumbLabel: {
      fontSize: '14px',
      color: '#747C87',
      lineHeight: '24px',
      fontWeight: 400,
    },
    contractCode: {
      fontSize: '22px',
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: '0em',
    },
    contractStatus: {
      marginLeft: '16px',
      fontSize: '13px',
      lineHeight: '24px',
      height: '24px',
    },
    btnChangePackage: {
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      padding: '11px 16px',
      height: 'auto',
      marginRight: '24px',
      '& a:-webkit-any-link:active': {
        color: 'inherit',
      },
      '& a:-webkit-any-link': {
        color: 'inherit',
      },
    },
    btnRequestSupport: {
      fontSize: '14px',
      lineHeight: '24px',
      fontWeight: 500,
      padding: '11px 16px',
      height: 'auto',
    },
    productTabsTotalAmountLabel: {
      fontWeight: 500,
      marginRight: '32px',
    },
    rotate90: {
      transform: 'rotate(90deg)',
    },
    relatedConstractStatus: {
      fontSize: '13px',
      lineHeight: '24px',
      height: '24px',
    },
    detailRelatedContractContainer: {
      backgroundColor: '#E8EAEB',
    },
    detailRelatedContractPaper: {
      border: 'none',
    },
    detailRelatedContractLabel: {
      padding: '16px 0 0 16px',
      fontSize: '14px',
      fontWeight: 500,
    },
    detailRelatedConstractItemName: {
      maxWidth: '180px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    hardwareTabBuyDeviceButton: {
      position: 'absolute',
      top: '-42px',
      right: '16px',
    },
    hardwareTabActionCell: {
      padding: '4px 0 4px 4px',
    },
    widthMaxContent: {
      width: 'max-content',
    },
    nonBorderBottom: {
      borderBottom: 'none',
      padding: 0,
    },
    buttonShowAppendix: {
      color: '#0088FF',
      '&:hover': {
        backgroundColor: 'unset',
      },
    },
    tableClearBottom: {
      '&:last-child th': {
        borderBottom: 'unset',
      },
      '&:last-child td': {
        borderBottom: 'unset',
      },
    },
    tableClearBottomAppendix1: {
      '& td': {
        borderBottom: 'unset',
      },
    },
    information: {
      padding: '24px',
    },
    informationCol: {
      padding: '4px 4px 4px 0',
      alignItems: 'flex-start',
      height: '100%',
    },
    informationKey: {
      width: '140px',
      minHeight: '28px',
    },
    informationValue: {
      width: 'calc(100% - 140px)',
      display: 'table',
      tableLayout: 'fixed',
      minHeight: '28px',
    },
  });
};
export default styles;
