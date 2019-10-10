import { WEATHER_LAT_LON_URL, FORECAST_ID_URL} from '../constants/weatherEndpoints';
// import * as Icon from 'react-feather';
import 'weathericons/css/weather-icons.css';
import '../css/weather.css';

export function getWeatherByCoordinates(lat, lon) {
  let url = WEATHER_LAT_LON_URL(lat, lon);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('getWeatherByCoordinates: ', data);
      return {
        id: data.id,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        wind: {deg: data.wind.deg, gust: data.wind.gust, speed: data.wind.speed},
        weather: {description: data.weather[0].description, icon: data.weather[0].icon, id: data.weather[0].id, main: data.weather[0].main},
      };
      // getWeatherWeek(data.name);
      // getWeatherToday(data);
    })
    .catch(err => console.log(err));

}

export function getFiveDayWeatherByCoordinates(id) {
  let url = FORECAST_ID_URL(id);
  // let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+appKey;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('getFiveDayWeatherByCoordinates: ', data);
      return data;
    })
    .catch(err => console.log(err));

}

export function getIcon(weatherIconCode) {
  //check codes on https://openweathermap.org/weather-conditions

  switch(weatherIconCode) {
    case '01d':
    case '01n':
      return "wi-day-sunny"; 
    case '02d':
    case '02n':
      return "wi-day-cloudy";
    case '03d':
    case '03n':
      return "wi-cloud";
    case '04d':
    case '04n':
      return "wi-cloudy";
    case '09d':
    case '09n':
      return "wi-showers";
    case '10d':
    case '10n':
      return "wi-day-showers";
    case '11d':
    case '11n':
      return "wi-storm-showers";
    case '13d':
    case '13n':
      return "wi-snowflake-cold";
    case '50d':
    case '50n':
      return "wi-dust";
    default:
      return "wi-day-sunny"; 

  }

}