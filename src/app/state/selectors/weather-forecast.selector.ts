import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { WeatherForecastState } from '../models/weather-forecast.state';

export const selectWeatherForecast = (appState: AppState) =>
  appState.weatherForecastState;

export const selectRetrievingWeather = createSelector(
  selectWeatherForecast,
  (state: WeatherForecastState) => state.loading
);

export const selectRetrievedWeather = createSelector(
  selectWeatherForecast,
  (state: WeatherForecastState) => state.weatherForecast
);

export const selectRetrieveWeatherStatus = createSelector(
  selectWeatherForecast,
  (state: WeatherForecastState) => state.requestMessage
);

export const selectRetrieveWeatherFailed = createSelector(
  selectWeatherForecast,
  (state: WeatherForecastState) => state.failed
);
