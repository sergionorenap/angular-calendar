import { createReducer, on } from '@ngrx/store';
import { WeatherApiActions } from '../actions/weather-forecast.actions';
import { WeatherForecastState } from '../models/weather-forecast.state';

const initialState: WeatherForecastState = {
  loading: false,
  failed: false,
  requestMessage: '',
  weatherForecast: {
    city: '',
    description: '',
    iconUrl: '',
    isForecast: false,
    tempMax: 0,
    tempMin: 0,
  },
};

export const WeatherForecastReducer = createReducer(
  initialState,
  on(WeatherApiActions.retrieveWeather, (state) => {
    return {
      ...state,
      loading: true,
      failed: false,
      requestMessage: 'Loading weather info...',
    };
  }),
  on(WeatherApiActions.retrievedWeather, (state, { weatherForecast }) => {
    return {
      ...state,
      loading: false,
      requestMessage: '',
      weatherForecast,
    };
  }),
  on(WeatherApiActions.retrieveWeatherFailure, (state, { error }) => {
    return {
      ...state,
      loading: false,
      failed: true,
      requestMessage: error,
    };
  })
);
