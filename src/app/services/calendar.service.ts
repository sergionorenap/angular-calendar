import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reminder } from '../interfaces/reminder';
import { Utils } from '../utilities/utils';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private readonly REMINDERS_KEY = 'REMINDERS';

  private calendarSubject = new BehaviorSubject<Reminder[]>([]);
  private reminders: Reminder[] = [];

  constructor(private localStorageService: LocalStorageService) {
    this.reminders = this.initRemindersStorage();
    this.castReminders();
  }

  delete(reminderId: string): boolean {
    const idx = this.reminders.findIndex((x) => x.id === reminderId);
    this.reminders.splice(idx, 1);

    this.storeReminders();
    this.castReminders();

    return true;
  }

  onRemindersUpdated$(): Observable<Reminder[]> {
    return this.calendarSubject.asObservable();
  }

  save(reminder: Reminder): void {
    if (!reminder.id) {
      reminder.id = Utils.generateNewId();
      this.reminders.push(reminder);
    } else {
      const remiderIdx = this.reminders.findIndex((x) => x.id === reminder.id);
      this.reminders[remiderIdx] = { ...reminder };
    }

    this.storeReminders();
    this.castReminders();
  }

  private castReminders(): void {
    this.calendarSubject.next(this.reminders);
  }

  private initRemindersStorage(): Reminder[] {
    const savedReminders = this.localStorageService.get<Reminder[]>(
      this.REMINDERS_KEY
    );

    if (savedReminders === undefined) {
      this.localStorageService.save<Reminder[]>(this.REMINDERS_KEY, []);
      return [];
    } else {
      return savedReminders;
    }
  }

  private storeReminders(): void {
    this.localStorageService.save<Reminder[]>(
      this.REMINDERS_KEY,
      this.reminders
    );
  }
}
