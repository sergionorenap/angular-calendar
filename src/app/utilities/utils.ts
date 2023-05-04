import * as moment from 'moment';
import * as uuid from 'uuid';

export type DateTime = moment.Moment;

export class Utils {
  public static dateToString(date: moment.Moment): string {
    return date.format('YYYY/MM/DD');
  }

  public static generateNewId(): string {
    return uuid.v4().split('-')[0];
  }

  public static getDayOfMonth(date: moment.Moment): number {
    return parseInt(date.format('DD'));
  }

  public static getMonth(date: moment.Moment): number {
    return parseInt(date.format('MM'));
  }

  public static getRangeOfDays(
    startDate: moment.Moment,
    endDate: moment.Moment
  ): number {
    return Math.round(endDate.diff(startDate, 'days', true));
  }

  public static getSpecificDate(
    year: number,
    month: number,
    day?: number
  ): moment.Moment {
    return moment(`${year}/${month}/${day || '1'}`);
  }

  public static getTimeString(date: Date): string {
    return this.parseDateTime(date).format('HH:mm');
  }

  public static getWeekDayNames(): string[] {
    return [...moment.localeData().weekdays()];
  }

  public static getMinWeekDayNames(): string[] {
    return [...moment.localeData().weekdaysMin()];
  }

  public static getShortWeekDayNames(): string[] {
    return [...moment.localeData().weekdaysShort()];
  }

  public static getYear(date: moment.Moment): number {
    return parseInt(date.format('YYYY'));
  }

  public static parseDateTime(dateTime: Date): moment.Moment {
    return moment(dateTime);
  }

  public static parseStringToDate(date: string): moment.Moment {
    return this.parseDateTime(new Date(date));
  }
}
