import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReminderComponent } from '../reminder/reminder.component';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';

import { ReminderModule } from '../reminder/reminder.module';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReminderModule,
  ],
  entryComponents: [ReminderComponent, ReminderFormComponent],
})
export class CalendarModule {}
