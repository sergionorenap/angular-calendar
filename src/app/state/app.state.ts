import { ActionReducerMap } from '@ngrx/store';
import { RemindersState } from './models/reminders.state';
import { WeatherForecastState } from './models/weather-forecast.state';
import { WeatherForecastReducer } from './reducers/weather-forecast.reducer';
import { RemindersReducer } from './reducers/reminders.reducer';

export interface AppState {
  remindersState: RemindersState;
  weatherForecastState: WeatherForecastState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  remindersState: RemindersReducer,
  weatherForecastState: WeatherForecastReducer,
};
