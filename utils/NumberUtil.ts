export class NumberUtil {
  static formatMoney(value: number, locale: string = 'vi-VN', options: Intl.NumberFormatOptions = {}): string {
    return new Intl.NumberFormat(locale, options).format(value) + 'đ';
  }
}
