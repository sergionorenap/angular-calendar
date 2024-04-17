import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Reminder } from 'src/app/interfaces/reminder';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent implements OnInit {
  colors: string[] = [
    'none',
    'red',
    'blue',
    'yellow',
    'orange',
    'green',
    'purple',
  ];
  isEditMode: boolean = false;

  reminder: Reminder;
  selectedDate: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReminderFormComponent>,
    private formBuilder: FormBuilder
  ) {}

  reminderForm: FormGroup = this.formBuilder.group({
    id: [''],
    text: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
    ],
    date: ['', Validators.compose([Validators.required])],
    time: ['', Validators.compose([Validators.required])],
    color: ['none', Validators.compose([Validators.required])],
    city: [''],
  });

  ngOnInit(): void {
    this.isEditMode = this.data.reminder !== undefined;

    if (this.isEditMode) {
      this.reminder = this.data.reminder;
      this.reminderForm.setValue(this.reminder);
    } else if (this.data.selectedDate) {
      this.selectedDate = this.data.selectedDate;
    }
  }

  onSaveReminder(): void {
    this.reminder = this.reminderForm.value;
    this.dialogRef.close(this.reminder);
  }

  onSelectedCityChanges(city: string): void {
    this.reminderForm.controls.city.setValue(city);
  }

  onSelectedDateChanges(date: string): void {
    this.reminderForm.controls.date.setValue(date);
  }

  onSelectedTimeChanges(time: string): void {
    this.reminderForm.controls.time.setValue(time);
  }
}
