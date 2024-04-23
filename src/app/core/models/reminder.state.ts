import { Reminder } from './reminder';

export interface RemindersState {
  loading: boolean;
  reminders: ReadonlyArray<Reminder>;
}
