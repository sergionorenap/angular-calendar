import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReminderActionsEnum } from '../core/enums/reminder-actions.enum';
import { Reminder } from '../core/models/reminder';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  reminder: Reminder = {} as Reminder;

  private reminderSubject = new Subject<any>();

  reminderObservable = this.reminderSubject.asObservable();

  castAction(data: any, action: ReminderActionsEnum): void {
    this.reminder = data;
    this.reminderSubject.next({ data, action: action });
  }
}
