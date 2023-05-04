import { Component, Input, OnInit } from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
  @Input() reminders: Reminder[];

  constructor() {}

  ngOnInit(): void {}
}
