import { Reminder } from '../../core/models/reminder.model';

export interface RemindersState {
  loading: boolean;
  reminders: ReadonlyArray<Reminder>;
}
