import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, mergeMap } from 'rxjs';
import { ReminderApiService } from '../../services/api/reminder-api.service';
import {
  RemindersActions,
  RemindersApiActions,
} from '../actions/reminders.actions';

@Injectable()
export class RemindersEffects {
  loadReminders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemindersApiActions.retrieveReminders),
      mergeMap(() =>
        this.reminderApiService.getList().pipe(
          map((reminders) =>
            RemindersApiActions.retrievedReminders({ reminders })
          ),
          catchError(() => EMPTY)
        )
      )
    )
  );

  addReminder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemindersActions.addReminder),
      mergeMap(({ reminder }) =>
        this.reminderApiService
          .save(reminder)
          .pipe(map((response) => RemindersActions.addReminderSuccess()))
      )
    )
  );

  updateReminder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemindersActions.updateReminder),
      mergeMap(({ reminder }) =>
        this.reminderApiService
          .update(reminder)
          .pipe(map((response) => RemindersActions.updateReminderSuccess()))
      )
    )
  );

  deleteReminder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemindersActions.deleteReminder),
      mergeMap(({ reminderId }) =>
        this.reminderApiService
          .delete(reminderId)
          .pipe(map((response) => RemindersActions.deleteReminderSuccess()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private reminderApiService: ReminderApiService
  ) {}
}
