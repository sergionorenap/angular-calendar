import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { AppState } from '../../state/app.state';
import { Reminder } from '../../core/models/reminder.model';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { WeatherApiActions } from '../../state/actions/weather-forecast.actions';

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    CommonModule,
    WeatherInfoComponent,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
})
export class ReminderComponent implements OnInit {
  reminder: Reminder = {} as Reminder;
  showWeatherInfo: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reminder,
    private dialogRef: MatDialogRef<ReminderComponent>,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.reminder = { ...this.data };
    this.showWeatherInfo =
      new Date(`${this.reminder.date} ${this.reminder.time}`) >= new Date() &&
      this.reminder.city !== '';

    if (this.showWeatherInfo) {
      this.getWeatherInfo();
    }
  }

  close(isEdit: boolean): void {
    this.dialogRef.close({
      isEdit: isEdit,
    });
  }

  private getWeatherInfo(): void {
    this.store.dispatch(
      WeatherApiActions.retrieveWeather({
        city: this.reminder.city || '',
        dateTime: `${this.reminder.date} ${this.reminder.time}`,
      })
    );
  }
}
