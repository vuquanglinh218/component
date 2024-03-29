import { createStyles, Tab, Theme, withStyles } from '@material-ui/core';
import { TabProps } from '@material-ui/core/Tab/Tab';
import { TabList, TabPanel } from '@material-ui/lab';
import React from 'react';

const SapoTabList = withStyles({
  root: {
    borderBottom: '0.5px solid #C4CCDE',
    marginBottom: 0,
  },
  indicator: {
    backgroundColor: '#0088FF',
  },
})(TabList);

const SapoTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: 500,
      marginRight: theme.spacing(4),
      '&:hover': {
        color: '#0088FF',
        opacity: 1,
      },
      '&$selected': {
        color: '#0088FF',
        fontWeight: 500,
      },
      '&:focus': {
        color: '#0088FF',
      },
    },
    selected: {},
  }),
)((props: TabProps) => <Tab disableRipple {...props} />);

const SapoTabPanel = withStyles({
  root: {
    padding: 0,
  },
})(TabPanel);

//Mobile

const SapoMobileTabList = withStyles({
  root: {
    borderBottom: '0.5px solid #C4CCDE',
    minHeight: 'unset',
  },
  indicator: {
    backgroundColor: '#0088FF',
    height: '2px',
    borderRadius: 'unset',
  },
})(TabList);

const SapoMobileTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color: '#343741',
      fontSize: '16px',
      '&:hover': {
        color: '#0088FF',
        opacity: 1,
      },
      '&$selected': {
        color: '#0088FF',
      },
      '&:focus': {
        color: '#0088FF',
      },
      backgroundColor: '#ffffff',
      minHeight: '32px',
      fontWeight: 400,
    },
    selected: {},
  }),
)((props: TabProps) => <Tab disableRipple {...props} />);

const SapoMobileTabPanel = withStyles({
  root: {
    padding: 0,
  },
})(TabPanel);

export { SapoTab, SapoTabList, SapoTabPanel, SapoMobileTab, SapoMobileTabList, SapoMobileTabPanel };
