import { Reminder } from './reminder';

export interface CalendarDay {
  name: string;
  date: string;
  dayInMonth: number;
  dayInWeek: number;
  isToday: boolean;
  isWeekEnd: boolean;
  reminders: Reminder[];
}
