import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import viLocale from 'date-fns/locale/vi';
import ToolbarComponentDateTime from './ToolbarComponentDateTime';

const DateTimePicker = (props: KeyboardDatePickerProps) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
      <KeyboardDatePicker {...props} ToolbarComponent={(props) => <ToolbarComponentDateTime {...props} />} />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;
