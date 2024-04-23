import { Component, Input } from '@angular/core';
import { Reminder } from '../../core/models/reminder';
import { MiniReminderComponent } from '../mini-reminder/mini-reminder.component';

@Component({
  selector: 'app-calendar-day',
  standalone: true,
  imports: [MiniReminderComponent],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.scss',
})
export class CalendarDayComponent {
  @Input() reminders: Reminder[] = [];
}
