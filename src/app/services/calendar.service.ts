import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Reminder } from '../interfaces/reminder';
import { Utils } from '../utilities/utils';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private calendarSubject = new Subject<Reminder[]>();

  calendarObservable = this.calendarSubject.asObservable();

  reminders: Reminder[] = [];

  constructor() {}

  list(date: Date): Observable<Reminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  delete(reminderId: string): boolean {
    const idx = this.reminders.findIndex((x) => x.id === reminderId);
    this.reminders.splice(idx, 1);

    this.updateReminders();

    return true;
  }

  save(data: Reminder): Reminder {
    if (!data.id) {
      data.id = Utils.generateNewId();
      this.reminders.push(data);
    } else {
      this.reminders = this.reminders.map((x) =>
        x.id === data.id ? { ...data } : x
      );
    }

    this.updateReminders();

    return data;
  }

  updateReminders(): void {
    this.calendarSubject.next(this.reminders);
  }
}
