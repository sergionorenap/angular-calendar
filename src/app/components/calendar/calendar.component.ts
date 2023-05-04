import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderService } from 'src/app/services/reminder.service';
import { ReminderComponent } from '../reminder/reminder.component';
import { ReminderActionsEnum } from 'src/app/enums/reminder-actions.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<boolean>();

  reminders: Reminder[] = [];

  constructor(
    private calendarService: CalendarService,
    private reminderService: ReminderService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.calendarService
      .list(new Date())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((reminders: Reminder[]) => {
        this.reminders = reminders;
      });

    // Reminders Update
    this.calendarService.calendarObservable.subscribe((reminders) => {
      this.reminders = [...reminders];
    });

    this.reminderService.reminderObservable.subscribe((result) => {
      switch (result.action) {
        case ReminderActionsEnum.CREATE:
          this.openReminderForm(undefined, result.data);
          break;
        case ReminderActionsEnum.DELETE:
          this._deleteReminder(result.data.id);
          break;
        case ReminderActionsEnum.OPEN_DETAILS:
          this.openReminderDetails(result.data);
          break;
        default:
          break;
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openReminderDetails(reminder: Reminder) {
    const dialogRef = this.matDialog.open(ReminderComponent, {
      width: '400px',
      data: reminder,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (typeof data !== 'boolean' && data) {
        if (data.isEdit) {
          this.openReminderForm(reminder);
        } else {
          this._deleteReminder(reminder.id);
        }
      }
    });
  }

  openReminderForm(reminder?: Reminder, selectedDate?: string) {
    const dialogRef = this.matDialog.open(ReminderFormComponent, {
      width: '540px',
      data: { reminder, selectedDate },
    });

    dialogRef.afterClosed().subscribe((newReminder) => {
      if (typeof newReminder !== 'boolean' && newReminder) {
        this._saveReminder(newReminder);
      }
    });
  }

  private _saveReminder(reminder: Reminder): void {
    this.calendarService.save(reminder);
  }

  private _deleteReminder(reminderId: string): void {
    this.calendarService.delete(reminderId);
  }
}
