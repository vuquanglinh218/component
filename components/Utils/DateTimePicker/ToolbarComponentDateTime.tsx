import { Box, Grid, InputLabel, makeStyles, Select, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { ToolbarComponentProps } from '@material-ui/pickers/Picker/Picker';
import Button from '@material-ui/core/Button';
import LazyLoadingSelect from '../../AccountDetail/components/CustomSelect';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '10px 12px',
    backgroundColor: '#ffffff',
  },
}));
class OptionSelection {
  value: any;
  label: string;
  disabled: boolean;

  constructor(value: any, label: string) {
    this.value = value;
    this.label = label;
    this.disabled = false;
  }
}
const monthOptions: OptionSelection[] = [
  new OptionSelection(0, 'Tháng một'),
  new OptionSelection(1, 'Tháng hai'),
  new OptionSelection(2, 'Tháng ba'),
  new OptionSelection(3, 'Tháng tư'),
  new OptionSelection(4, 'Tháng năm'),
  new OptionSelection(5, 'Tháng sáu'),
  new OptionSelection(6, 'Tháng bảy'),
  new OptionSelection(7, 'Tháng tám'),
  new OptionSelection(8, 'Tháng chín'),
  new OptionSelection(9, 'Tháng mười'),
  new OptionSelection(10, 'Tháng mười một'),
  new OptionSelection(11, 'Tháng mười hai'),
];

const ToolbarComponentDateTime = (props: ToolbarComponentProps) => {
  const classes = useStyles();
  const [optionsMonth, setOptionsMonth] = useState<OptionSelection[]>([
    monthOptions.find((x) => x.value === props.date.getMonth()),
  ]);
  const [optionsYear, setOptionsYear] = useState<OptionSelection[]>([
    new OptionSelection(props.date.getFullYear(), props.date.getFullYear().toString()),
  ]);
  return (
    <Box className={classes.root} justifyContent='center'>
      <Box>
        <Grid container direction='column' spacing={3}>
          <Grid item container direction='row' spacing={3}>
            <Grid
              item
              xs={6}
              onClick={() => {
                props.setOpenView('month');
                setOptionsMonth([]);
              }}
            >
              <LazyLoadingSelect
                options={optionsMonth}
                value={props.date.getMonth()}
                clearable={false}
                setValue={() => {}}
                noResultsText={''}
                placeholder={''}
                style={{}}
              />
            </Grid>
            <Grid
              item
              xs={6}
              onClick={() => {
                props.setOpenView('year');
                setOptionsYear([]);
              }}
            >
              <LazyLoadingSelect
                options={optionsYear}
                value={props.date.getFullYear()}
                clearable={false}
                setValue={() => {}}
                noResultsText={''}
                placeholder={''}
                style={{}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ToolbarComponentDateTime;
