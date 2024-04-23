import { createActionGroup, props } from '@ngrx/store';
import { Reminder } from '../../core/models/reminder';

export const RemindersActions = createActionGroup({
  source: 'Reminders',
  events: {
    'Add Reminder': props<{ reminder: Reminder }>(),
    'Add Reminder Success': props<any>(),

    'Delete Reminder': props<{ reminderId: string }>(),
    'Delete Reminder Success': props<any>(),

    'Update Reminder': props<{ reminder: Reminder }>(),
    'Update Reminder Success': props<any>(),
  },
});

export const RemindersApiActions = createActionGroup({
  source: 'Reminders API',
  events: {
    'Retrieve Reminders': props<any>(),
    'Retrieved Reminders': props<{ reminders: Reminder[] }>(),
  },
});
