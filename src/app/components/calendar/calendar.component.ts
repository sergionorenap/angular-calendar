import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CalendarTableComponent } from '../calendar-table/calendar-table.component';
import { ReminderService } from '../../services/reminder.service';
import { Reminder } from '../../core/models/reminder';
import { ReminderActionsEnum } from '../../core/enums/reminder-actions.enum';
import { ReminderComponent } from '../reminder/reminder.component';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { AppState } from '../../state/app.state';
import {
  RemindersActions,
  RemindersApiActions,
} from '../../state/actions/reminders.actions';
import { selectRetrievingReminders } from '../../state/selectors/reminders.selector';
import { Utils } from '../../utilities/utils';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarTableComponent,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();

  constructor(
    private matDialog: MatDialog,
    private store: Store<AppState>,
    private reminderService: ReminderService // TODO
  ) {}

  ngOnInit(): void {
    this.loadReminders();

    // TODO
    this.subscribeToReminderActions();
  }

  ngOnDestroy(): void {}

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
    this.store.dispatch(RemindersActions.deleteReminder({ reminderId }));
  }

  private goToSaveReminder(reminder: Reminder): void {
    if (reminder.id === '') {
      reminder.id = Utils.generateNewId();
      this.store.dispatch(RemindersActions.addReminder({ reminder }));
    } else {
      this.store.dispatch(RemindersActions.updateReminder({ reminder }));
    }
  }

  private loadReminders(): void {
    this.loading$ = this.store.select(selectRetrievingReminders);
    this.store.dispatch(RemindersApiActions.retrieveReminders());
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
