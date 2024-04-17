import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';

import { Reminder } from 'src/app/interfaces/reminder';
import { CalendarService } from 'src/app/services/calendar.service';
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

  private subscriptions = new Subscription();

  constructor(
    private matDialog: MatDialog,
    private calendarService: CalendarService,
    private reminderService: ReminderService
  ) {}

  ngOnInit(): void {
    this.subscribeToCalendarReminders();
    this.subscribeToReminderActions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  openReminderDetails(reminder: Reminder): void {
    const dialogRef = this.matDialog.open(ReminderComponent, {
      width: '400px',
      data: reminder,
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (typeof data !== 'boolean' && data) {
        if (data.isEdit) {
          this.openReminderForm(reminder);
        } else {
          this.goToDeleteReminder(reminder.id);
        }
      }
    });
  }

  openReminderForm(reminder?: Reminder, selectedDate?: string): void {
    const dialogRef = this.matDialog.open(ReminderFormComponent, {
      width: '540px',
      data: { reminder, selectedDate },
    });

    dialogRef.afterClosed().subscribe((newReminder) => {
      if (typeof newReminder !== 'boolean' && newReminder) {
        this.goToSaveReminder(newReminder);
      }
    });
  }

  private goToDeleteReminder(reminderId: string): void {
    this.calendarService.delete(reminderId);
  }

  private goToSaveReminder(reminder: Reminder): void {
    this.calendarService.save(reminder);
  }

  private subscribeToCalendarReminders() {
    this.subscriptions.add(
      this.calendarService
        .onRemindersUpdated$()
        .subscribe((reminders) => (this.reminders = [...reminders]))
    );
  }

  private subscribeToReminderActions(): void {
    this.reminderService.reminderObservable.subscribe((result) => {

      switch (result.action) {
        case ReminderActionsEnum.CREATE:
          this.openReminderForm(undefined, result.data);
          break;
        case ReminderActionsEnum.DELETE:
          this.goToDeleteReminder(result.data.id);
          break;
        case ReminderActionsEnum.OPEN_DETAILS:
          this.openReminderDetails(result.data);
          break;
        default:
          break;
      }
    });
  }
}
