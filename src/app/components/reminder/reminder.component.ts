import { Component, Inject, OnInit } from '@angular/core';
import { Reminder } from '../../core/models/reminder';
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
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { MatButton, MatButtonModule } from '@angular/material/button';

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
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose
  ],
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
})
export class ReminderComponent implements OnInit {
  reminder: Reminder = {} as Reminder;
  showWeatherInfo: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reminder,
    private dialogRef: MatDialogRef<ReminderComponent>
  ) {}

  ngOnInit(): void {
    this.reminder = this.data;
    this.showWeatherInfo =
      new Date(`${this.reminder.date} ${this.reminder.time}`) >= new Date() &&
      this.reminder.city !== '';
  }

  close(isEdit: boolean): void {
    this.dialogRef.close({
      isEdit: isEdit,
    });
  }
}
