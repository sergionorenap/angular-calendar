import { WeatherForecast } from './weather-forecast.model';

export interface Reminder {
  id: string;
  text: string;
  date: string;
  time: string;
  color: string;
  city?: string;
  weatherForecast?: WeatherForecast;
}
