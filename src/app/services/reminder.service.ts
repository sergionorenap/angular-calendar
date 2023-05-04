import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReminderActionsEnum } from '../enums/reminder-actions.enum';
import { Reminder } from '../interfaces/reminder';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  reminder: Reminder;

  private reminderSubject = new Subject<any>();

  reminderObservable = this.reminderSubject.asObservable();

  castAction(data: any, action: ReminderActionsEnum): void {
    this.reminder = data;
    this.reminderSubject.next({ data, action: action });
  }
}
