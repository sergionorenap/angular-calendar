import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { RemindersState } from '../../core/models/reminder.state';

export const selectRemindersState = (appState: AppState) =>
  appState.remindersState;

export const selectRetrievingReminders = createSelector(
  selectRemindersState,
  (state: RemindersState) => state.loading
);

export const selectReminderList = createSelector(
  selectRemindersState,
  (state: RemindersState) => state.reminders
);

export const selectReminderById = (reminderId: string) =>
  createSelector(selectRemindersState, ({ reminders }) =>
    reminders.find((reminder) => reminder.id === reminderId)
  );
