import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CURRENT_WEATHER_EP, WEATHER_FORECAST_EP } from '../../config/config';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getWeatherInformation(city: string): Observable<any> {
    return this.http.get(CURRENT_WEATHER_EP(city));
  }

  getForecastInformation(lat: number, lon: number): Observable<any> {
    return this.http.get(WEATHER_FORECAST_EP(lat, lon));
  }
}
