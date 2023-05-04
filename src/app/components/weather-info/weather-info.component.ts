import { Component, Input, OnInit } from '@angular/core';
import { WEATHER_ICON_EP } from 'src/app/config/config';
import { Weather } from 'src/app/interfaces/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
})
export class WeatherInfoComponent implements OnInit {
  @Input() city: string;
  @Input() dateTime: string;

  weather: Weather;
  loadStatus: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this._getWeather();
  }

  private _getWeather() {
    if (this.city && this.dateTime) {
      this.loadStatus = 'Loading weather info...';
      this.weatherService.getWeatherInformation(this.city).subscribe(
        (currentWeather) => {
          if (currentWeather.cod === 200) {
            this.weatherService
              .getForecastInformation(
                currentWeather.coord.lat,
                currentWeather.coord.lon
              )
              .subscribe(
                (forecastInfo) => {
                  if (forecastInfo.cod === '200') {
                    const weatherForecast = this._filterForecastByDate(
                      forecastInfo.list,
                      this.dateTime
                    );

                    const finalWeatherInfo = weatherForecast || currentWeather;

                    this.weather = {
                      tempMin: finalWeatherInfo.main.temp_min,
                      tempMax: finalWeatherInfo.main.temp_max,
                      description: `${finalWeatherInfo.weather[0].main}, ${finalWeatherInfo.weather[0].description}`,
                      isForecast: weatherForecast ? true : false,
                      iconUrl: WEATHER_ICON_EP(
                        finalWeatherInfo.weather[0].icon
                      ),
                    };
                  }

                  this.loadStatus = '';
                },
                (err) => {
                  this._showError(err);
                }
              );
          }
        },
        (err) => {
          this._showError(err);
        }
      );
    }
  }

  private _filterForecastByDate(data: any[], date: string): any {
    const parsedDate = parseInt((new Date(date).getTime() / 1000).toFixed(0));

    const filteredForecast = data.filter((forecast) => {
      if (forecast.dt >= parsedDate) {
        return forecast;
      }
    });

    return filteredForecast ? filteredForecast[0] : undefined;
  }

  private _showError(error): void {
    this.loadStatus = 'Sorry, weather information could not be obtained.';
    console.error(error);
  }
}
