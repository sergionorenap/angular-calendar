import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReminderComponent } from './reminder.component';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { CityPickerComponent } from '../city-picker/city-picker.component';

import { WeatherInfoComponent } from '../weather-info/weather-info.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
];

@NgModule({
  declarations: [
    ReminderComponent,
    ReminderFormComponent,
    CityPickerComponent,
    TimePickerComponent,
    WeatherInfoComponent,
  ],
  exports: [ReminderComponent, ReminderFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
})
export class ReminderModule {}
