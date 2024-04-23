import { ActionReducerMap } from '@ngrx/store';
import { RemindersState } from '../core/models/reminder.state';
import { remindersReducer } from './reducers/reminders.reducer';

export interface AppState {
  remindersState: RemindersState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  remindersState: remindersReducer,
};
