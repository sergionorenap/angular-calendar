import { createActionGroup, props } from '@ngrx/store';
import { WeatherForecast } from '../../core/models/weather-forecast.model';

export const WeatherApiActions = createActionGroup({
  source: 'Weather API',
  events: {
    'Retrieve Weather': props<{ city: string; dateTime: string }>(),
    'Retrieved Weather': props<{ weatherForecast: WeatherForecast }>(),
    'Retrieve Weather Failure': props<{ error: string }>(),
  },
});
