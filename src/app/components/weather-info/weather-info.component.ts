import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { AppState } from '../../state/app.state';
import {
  selectRetrieveWeatherFailed,
  selectRetrieveWeatherStatus,
  selectRetrievedWeather,
  selectRetrievingWeather,
} from '../../state/selectors/weather-forecast.selector';
import { WeatherForecast } from '../../core/models/weather-forecast.model';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss',
})
export class WeatherInfoComponent implements OnInit {
  loading$: Observable<boolean> = of(false);
  failed$: Observable<boolean> = of(false);
  status$: Observable<string> = of('');

  weather: WeatherForecast = {} as WeatherForecast;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectRetrievingWeather);
    this.failed$ = this.store.select(selectRetrieveWeatherFailed);
    this.status$ = this.store.select(selectRetrieveWeatherStatus);

    this.store.select(selectRetrievedWeather).subscribe((weatherForecast) => {
      this.weather = { ...weatherForecast };
    });
  }
}
