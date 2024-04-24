import { createReducer, on } from '@ngrx/store';
import {
  RemindersActions,
  RemindersApiActions,
} from '../actions/reminders.actions';
import { RemindersState } from '../models/reminders.state';

const initialState: RemindersState = { loading: false, reminders: [] };

export const RemindersReducer = createReducer(
  initialState,
  on(RemindersApiActions.retrieveReminders, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(RemindersApiActions.retrievedReminders, (state, { reminders }) => {
    return {
      loading: false,
      reminders,
    };
  }),
  on(RemindersActions.addReminder, (state, { reminder }) => {
    return {
      ...state,
      reminders: [...state.reminders, reminder],
    };
  }),
  on(RemindersActions.deleteReminder, (state, { reminderId }) => {
    const remindersList = [...state.reminders];
    const reminderIdx = remindersList.findIndex((x) => x.id === reminderId);
    remindersList.splice(reminderIdx, 1);

    return {
      ...state,
      reminders: [...remindersList],
    };
  }),
  on(RemindersActions.updateReminder, (state, { reminder }) => {
    const newRemindersList = [...state.reminders];
    const reminderIdx = newRemindersList.findIndex((r) => r.id === reminder.id);

    if (reminderIdx > -1) {
      newRemindersList[reminderIdx] = { ...reminder };
    }

    return {
      ...state,
      reminders: newRemindersList,
    };
  })
);
