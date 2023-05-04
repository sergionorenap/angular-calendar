import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/utilities/utils';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent implements OnInit {
  @Input() defaultSelectedTime: string;
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
