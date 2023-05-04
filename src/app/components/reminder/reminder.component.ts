import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Reminder } from 'src/app/interfaces/reminder';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
  reminder: Reminder;
  showWeatherInfo: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Reminder,
    private dialogRef: MatDialogRef<ReminderComponent>
  ) {}

  ngOnInit(): void {
    this.reminder = this.data;
    this.showWeatherInfo =
      new Date(`${this.reminder.date} ${this.reminder.time}`) >= new Date();
  }

  close(isEdit: boolean): void {
    this.dialogRef.close({
      isEdit: isEdit,
    });
  }
}
