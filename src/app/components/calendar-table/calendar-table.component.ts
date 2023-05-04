import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { CalendarDay } from 'src/app/interfaces/calendar-day';
import { Reminder } from 'src/app/interfaces/reminder';
import { Utils, DateTime } from 'src/app/utilities/utils';

import { MediaMatcher } from '@angular/cdk/layout';
import { ReminderService } from 'src/app/services/reminder.service';
import { ReminderActionsEnum } from 'src/app/enums/reminder-actions.enum';

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss'],
})
export class CalendarTableComponent implements OnInit {
  @Input() mini: boolean = false;
  @Input() defaultSelectedDate: string;
  @Input() set reminders(reminders: Reminder[]) {
    this.remindersArr = reminders;

    if (this.currentCalendarMonth) {
      this.getCalendarDays(
        Utils.getYear(this.currentCalendarMonth),
        Utils.getMonth(this.currentCalendarMonth)
      );
    }
  }
  @Output() onSelectedDate = new EventEmitter<string>();

  weekDays: string[];
  shortWeekDays: string[];
  remindersArr: Reminder[];
  calendarDays: CalendarDay[];
  currentCalendarMonth: DateTime;
  selectedDateStr: string;
  today: DateTime;

  mobileQuery: MediaQueryList;
  private queryListener: () => void;

  constructor(
    changeDetector: ChangeDetectorRef,
    media: MediaMatcher,
    private reminderService: ReminderService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 640px)');
    this.queryListener = () => changeDetector.detectChanges();
    this.mobileQuery.addEventListener('change', this.queryListener);
  }

  ngOnInit(): void {
    this.weekDays = this.mini
      ? Utils.getMinWeekDayNames()
      : Utils.getWeekDayNames();
    this.shortWeekDays = Utils.getShortWeekDayNames();

    this.firstCalendarSetup();
  }

  onChangeCalendarMonth(goToFuture: boolean): void {
    this.currentCalendarMonth = goToFuture
      ? this.currentCalendarMonth.clone().add(1, 'month')
      : this.currentCalendarMonth.clone().subtract(1, 'month');

    this.getCalendarDays(
      Utils.getYear(this.currentCalendarMonth),
      Utils.getMonth(this.currentCalendarMonth)
    );
  }

  onSelectedDateChanges(dateStr: string): void {
    if (!this.mini) {
      this.reminderService.castAction(dateStr, ReminderActionsEnum.CREATE);
    }
    this.selectedDateStr = dateStr;
    this.onSelectedDate.emit(dateStr);
  }

  private firstCalendarSetup(): void {
    this.today = Utils.parseDateTime(new Date());

    let year = Utils.getYear(this.today);
    let month = Utils.getMonth(this.today);

    if (this.defaultSelectedDate) {
      year = Utils.getYear(Utils.parseStringToDate(this.defaultSelectedDate));
      month = Utils.getMonth(Utils.parseStringToDate(this.defaultSelectedDate));
    }

    this.getCalendarDays(year, month);
    this.currentCalendarMonth = Utils.getSpecificDate(year, month);

    this.selectedDateStr =
      this.defaultSelectedDate || Utils.dateToString(this.today);

    this.onSelectedDate.emit(this.selectedDateStr);
  }

  private getCalendarDays(year: number, month: number): void {
    const startDate = Utils.getSpecificDate(year, month);
    const endDate = startDate.clone().endOf('month');

    const totalDays = Utils.getRangeOfDays(startDate, endDate);

    this.calendarDays = [];

    for (let day = 1; day <= totalDays; day++) {
      const dayOfMonth = Utils.getSpecificDate(year, month, day);
      const dateStr = Utils.dateToString(dayOfMonth);

      this.calendarDays.push({
        name: dayOfMonth.format('dddd'),
        date: dateStr,
        dayInMonth: day,
        dayInWeek: dayOfMonth.weekday(),
        isToday: dateStr === Utils.dateToString(this.today),
        isWeekEnd:
          dayOfMonth.isoWeekday() === 6 || dayOfMonth.isoWeekday() === 7,
        reminders: this.getRemindersByDate(dateStr),
      });
    }
  }

  private getRemindersByDate(date: string): any {
    if (this.remindersArr) {
      const dayReminders = this.remindersArr
        .filter(
          (x) =>
            Utils.dateToString(Utils.parseDateTime(new Date(x.date))) === date
        )
        .sort((a, b) => (a.time > b.time ? 1 : b.time > a.time ? -1 : 0));

      return dayReminders;
    }

    return [];
  }
}
