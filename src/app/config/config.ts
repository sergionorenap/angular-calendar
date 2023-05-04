import { environment } from 'src/environments/environment';

export const CURRENT_WEATHER_EP = (city: string, units: string = 'metric') => {
  return `${environment.weatherAPI.endpoint}/weather?appid=${environment.weatherAPI.apiKey}&units=${units}&q=${city}`;
};

export const WEATHER_FORECAST_EP = (
  lat: number,
  lon: number,
  units: string = 'metric'
) => {
  return `${environment.weatherAPI.endpoint}/forecast?appid=${environment.weatherAPI.apiKey}&units=${units}&lat=${lat}&lon=${lon}`;
};

export const WEATHER_ICON_EP = (icon: string) => {
  return `${environment.weatherAPI.resourcesEndpoint}/img/wn/${icon}@2x.png`;
};
