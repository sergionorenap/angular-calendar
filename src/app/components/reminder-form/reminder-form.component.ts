import { Component, Inject, OnInit } from '@angular/core';
import { Reminder } from '../../core/models/reminder';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CityPickerComponent } from '../city-picker/city-picker.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { CalendarTableComponent } from '../calendar-table/calendar-table.component';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reminder-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    CityPickerComponent,
    TimePickerComponent,
    CalendarTableComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './reminder-form.component.html',
  styleUrl: './reminder-form.component.scss',
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

  reminder: Reminder = {} as Reminder;
  selectedDate: string = '';

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
    this.reminderForm.controls['city'].setValue(city);
  }

  onSelectedDateChanges(date: string): void {
    this.reminderForm.controls['date'].setValue(date);
  }

  onSelectedTimeChanges(time: string): void {
    this.reminderForm.controls['time'].setValue(time);
  }
}
