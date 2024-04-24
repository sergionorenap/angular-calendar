import { WeatherForecast } from '../../core/models/weather-forecast.model';

export interface WeatherForecastState {
  loading: boolean;
  failed: boolean;
  requestMessage: string;
  weatherForecast: WeatherForecast;
}
