import { Component, Input, OnInit } from '@angular/core';
import { WEATHER_ICON_EP } from '../../config/config';
import { WeatherService } from '../../services/api/weather.service';
import { Weather } from '../../core/models/weather';

@Component({
  selector: 'app-weather-info',
  standalone: true,
  imports: [],
  templateUrl: './weather-info.component.html',
  styleUrl: './weather-info.component.scss',
})
export class WeatherInfoComponent implements OnInit {
  @Input() city: string | undefined = '';
  @Input() dateTime: string = '';

  weather: Weather = {} as Weather;
  isLoading: boolean = false;
  loadStatus: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this._getWeather();
  }

  private _getWeather() {
    if (this.city && this.dateTime) {
      this.isLoading = true;
      this.loadStatus = 'Loading weather info...';

      this.weatherService.getWeatherInformation(this.city).subscribe(
        (currentWeather: any) => {
          if (currentWeather.cod === 200) {
            this.weatherService
              .getForecastInformation(
                currentWeather.coord.lat,
                currentWeather.coord.lon
              )
              .subscribe(
                (forecastInfo: any) => {
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

                  this.isLoading = false;
                  this.loadStatus = '';
                },
                (err: any) => {
                  this._showError(err);
                }
              );
          }
        },
        (err: any) => {
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

  private _showError(error: any): void {
    this.isLoading = false;
    this.loadStatus = 'Sorry, weather information could not be obtained.';
    console.error(error);
  }
}
