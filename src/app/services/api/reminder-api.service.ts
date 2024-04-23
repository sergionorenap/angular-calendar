import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { LocalStorageService } from '../local-storage.service';
import { Reminder } from '../../core/models/reminder';
import { AppState } from '../../state/app.state';
import { selectReminderList } from '../../state/selectors/reminders.selector';

@Injectable({
  providedIn: 'root',
})
export class ReminderApiService {
  private readonly REMINDERS_KEY = 'REMINDERS';

  constructor(
    private store: Store<AppState>,
    private localStorageService: LocalStorageService
  ) {
    this.syncLocalStorage();
  }

  public getList(): Observable<Reminder[]> {
    let savedReminders = this.localStorageService.get<Reminder[]>(
      this.REMINDERS_KEY
    );

    if (savedReminders === undefined) {
      savedReminders = [];
    }

    return of([...savedReminders]);
  }

  public delete(reminderId: string): Observable<boolean> {
    return of(true);
  }

  public save(reminder: Reminder): Observable<boolean> {
    return of(true);
  }

  public update(reminder: Reminder): Observable<boolean> {
    return of(true);
  }

  private syncLocalStorage(): void {
    let firstLoad = true;

    this.store.select(selectReminderList).subscribe((reminders) => {
      if (!firstLoad) {
        this.localStorageService.save<Reminder[]>(this.REMINDERS_KEY, [
          ...reminders,
        ]);
      }
      firstLoad = false;
    });
  }
}
