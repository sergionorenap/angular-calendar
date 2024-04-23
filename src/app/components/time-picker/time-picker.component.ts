import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Utils } from '../../utilities/utils';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
})
export class TimePickerComponent implements OnInit {
  @Input() defaultSelectedTime: string | undefined = '';
  @Output() onSelectedTime = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder) {}

  validators = [Validators.required, Validators.maxLength(2)];

  timeForm: FormGroup = this.formBuilder.group({
    hours: ['', Validators.compose([...this.validators, Validators.max(23)])],
    minutes: [
      '',
      Validators.compose([
        ...this.validators,
        Validators.min(0),
        Validators.max(59),
      ]),
    ],
  });

  ngOnInit(): void {
    this.timeForm.valueChanges.subscribe((data) => {
      if (!this.timeForm.invalid) {
        const date = new Date();
        date.setHours(parseInt(data.hours), parseInt(data.minutes));
        this.onSelectedTime.emit(Utils.getTimeString(date));
      } else {
        this.onSelectedTime.emit('');
      }
    });

    if (this.defaultSelectedTime) {
      this.timeForm.setValue({
        hours: this.defaultSelectedTime.split(':')[0],
        minutes: this.defaultSelectedTime.split(':')[1],
      });
    } else {
      this.timeForm.setValue({
        hours: '08',
        minutes: '00',
      });
    }
  }
}
