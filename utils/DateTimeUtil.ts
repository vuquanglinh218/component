import moment from 'moment';

export class DateTimeUtil {
  static format(value: string | Date, format: string = 'DD/MM/YYYY') {
    return value ? moment(value).format(format) : '';
  }
}
