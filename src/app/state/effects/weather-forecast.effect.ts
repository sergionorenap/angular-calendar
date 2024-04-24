import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { WeatherApiService } from '../../services/api/weather-api.service';
import { WeatherApiActions } from '../actions/weather-forecast.actions';
import { WEATHER_ICON_EP } from '../../config/config';
import { WeatherForecast } from '../../core/models/weather-forecast.model';

@Injectable()
export class WeatherForecastEffects {
  getWeatherForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherApiActions.retrieveWeather),
      mergeMap(({ city, dateTime }) =>
        this.weatherApiService.getWeatherInformation(city).pipe(
          switchMap((currentWeather) => {
            if (currentWeather.cod === 200) {
              return this.weatherApiService
                .getForecastInformation(
                  currentWeather.coord.lat,
                  currentWeather.coord.lon
                )
                .pipe(
                  map((forecastInfo) => {
                    if (forecastInfo.cod === '200') {
                      const weatherForecast = this.filterForecastByDate(
                        forecastInfo.list,
                        dateTime
                      );

                      const finalWeatherInfo =
                        weatherForecast || currentWeather;

                      const finalWeatherForecast: WeatherForecast = {
                        city,
                        description: `${finalWeatherInfo.weather[0].main}, ${finalWeatherInfo.weather[0].description}`,
                        isForecast: weatherForecast ? true : false,
                        iconUrl: WEATHER_ICON_EP(
                          finalWeatherInfo.weather[0].icon
                        ),
                        tempMax: finalWeatherInfo.main.temp_max,
                        tempMin: finalWeatherInfo.main.temp_min,
                      };

                      return WeatherApiActions.retrievedWeather({
                        weatherForecast: finalWeatherForecast,
                      });
                    }

                    return this.handleError();
                  }),
                  catchError((err) => of(this.handleError(err)))
                );
            }
            return of(this.handleError());
          }),
          catchError((err) => of(this.handleError(err)))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private weatherApiService: WeatherApiService
  ) {}

  private handleError(err?: any): Action {
    console.error('ERROR GETTING WEATHER INFO');
    console.error(err);

    return WeatherApiActions.retrieveWeatherFailure({
      error: 'Weather information could not be obtained.',
    });
  }

  private filterForecastByDate(data: any[], date: string): any {
    const parsedDate = parseInt((new Date(date).getTime() / 1000).toFixed(0));

    const filteredForecast = data.filter((forecast) => {
      if (forecast.dt >= parsedDate) {
        return forecast;
      }
    });

    return filteredForecast ? filteredForecast[0] : undefined;
  }
}
