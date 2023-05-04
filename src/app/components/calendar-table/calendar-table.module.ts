import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CalendarTableComponent } from './calendar-table.component';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { MiniReminderComponent } from '../mini-reminder/mini-reminder.component';

@NgModule({
  declarations: [
    CalendarTableComponent,
    CalendarDayComponent,
    MiniReminderComponent,
  ],
  exports: [CalendarTableComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
})
export class CalendarTableModule {}
