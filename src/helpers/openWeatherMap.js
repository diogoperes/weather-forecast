import { WEATHER_LAT_LON_URL, SEARCH_LOCATION_URL} from '../constants/weatherEndpoints';
// import { EMULATE_REQUESTS } from '../constants/system';
// import * as Icon from 'react-feather';
import 'weathericons/css/weather-icons.css';
import '../css/weather.css';

// export function getWeatherByCoordinates(lat, lon) {
//   let url = WEATHER_LAT_LON_URL(lat, lon);
//   // EMULATED REQUEST
//   if (process.env.NODE_ENV === 'development' && EMULATE_REQUESTS) {
//     console.log('getWeatherByCoordinates EMULATED')
//     let data = { "coord": { "lon": -9.14, "lat": 38.72 }, "weather": [{ "id": 800, "main": "Clear", "description": "clear sky", "icon": "01n" }], "base": "stations", "main": { "temp": 18.48, "pressure": 1017, "humidity": 72, "temp_min": 17.22, "temp_max": 20 }, "visibility": 10000, "wind": { "speed": 3.1, "deg": 270 }, "clouds": { "all": 0 }, "dt": 1572112843, "sys": { "type": 1, "id": 6897, "country": "PT", "sunrise": 1572072987, "sunset": 1572111865 }, "timezone": 3600, "id": 8012502, "name": "Socorro", "cod": 200 };
//     return {
//       id: data.id,
//       temp: data.main.temp,
//       tempMin: data.main.temp_min,
//       tempMax: data.main.temp_max,
//       pressure: data.main.pressure,
//       humidity: data.main.humidity,
//       wind: { deg: data.wind.deg, gust: data.wind.gust, speed: data.wind.speed },
//       weather: { description: data.weather[0].description, icon: data.weather[0].icon, id: data.weather[0].id, main: data.weather[0].main },
//     };
//   }
//   // END EMULATED REQUEST
//
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       console.log('getWeatherByCoordinates: ', data);
//       return {
//         id: data.id,
//         temp: data.main.temp,
//         tempMin: data.main.temp_min,
//         tempMax: data.main.temp_max,
//         pressure: data.main.pressure,
//         humidity: data.main.humidity,
//         wind: {deg: data.wind.deg, gust: data.wind.gust, speed: data.wind.speed},
//         weather: {description: data.weather[0].description, icon: data.weather[0].icon, id: data.weather[0].id, main: data.weather[0].main},
//       };
//       // getWeatherWeek(data.name);
//       // getWeatherToday(data);
//     })
//     // .catch(err => console.log(err));
//
// }
//
// export function getFiveDayWeatherByCoordinates(id) {
//   let url = FORECAST_ID_URL(id);
//
//   // EMULATED REQUEST
//   if (process.env.NODE_ENV === 'development' && EMULATE_REQUESTS) {
//     console.log('getFiveDayWeatherByCoordinates EMULATED')
//     let data = { "city": { "id": 8012502, "name": "Socorro", "coord": { "lon": -9.1333, "lat": 38.7169 }, "country": "PT", "population": 0, "timezone": 3600 }, "cod": "200", "message": 3.0031879, "cnt": 14, "list": [{ "dt": 1572091200, "sunrise": 1572072985, "sunset": 1572111863, "temp": { "day": 18.29, "min": 15.75, "max": 18.29, "night": 15.75, "eve": 18.29, "morn": 18.29 }, "pressure": 1017, "humidity": 70, "weather": [{ "id": 800, "main": "Clear", "description": "sky is clear", "icon": "01n" }], "speed": 2.05, "deg": 246, "clouds": 0 }, { "dt": 1572177600, "sunrise": 1572159449, "sunset": 1572198189, "temp": { "day": 19.65, "min": 15.2, "max": 20.45, "night": 16.45, "eve": 16.86, "morn": 15.2 }, "pressure": 1018, "humidity": 71, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "speed": 2.44, "deg": 184, "clouds": 91 }, { "dt": 1572264000, "sunrise": 1572245913, "sunset": 1572284515, "temp": { "day": 19.48, "min": 16.88, "max": 20.24, "night": 16.88, "eve": 18.08, "morn": 16.93 }, "pressure": 1017, "humidity": 83, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 3.18, "deg": 186, "clouds": 100, "rain": 1.13 }, { "dt": 1572350400, "sunrise": 1572332378, "sunset": 1572370843, "temp": { "day": 22.32, "min": 15.9, "max": 22.32, "night": 16.47, "eve": 17.87, "morn": 15.9 }, "pressure": 1019, "humidity": 61, "weather": [{ "id": 800, "main": "Clear", "description": "sky is clear", "icon": "01d" }], "speed": 2.84, "deg": 241, "clouds": 0 }, { "dt": 1572436800, "sunrise": 1572418843, "sunset": 1572457172, "temp": { "day": 23.43, "min": 16.29, "max": 23.43, "night": 16.95, "eve": 18.55, "morn": 16.29 }, "pressure": 1023, "humidity": 61, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d" }], "speed": 1.6, "deg": 259, "clouds": 94 }, { "dt": 1572523200, "sunrise": 1572505308, "sunset": 1572543502, "temp": { "day": 23.5, "min": 16.73, "max": 24.59, "night": 17.42, "eve": 18.71, "morn": 16.73 }, "pressure": 1025, "humidity": 65, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "speed": 2.91, "deg": 307, "clouds": 73 }, { "dt": 1572609600, "sunrise": 1572591773, "sunset": 1572629833, "temp": { "day": 24.7, "min": 16.9, "max": 24.7, "night": 18.22, "eve": 19.54, "morn": 16.9 }, "pressure": 1023, "humidity": 59, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "speed": 2.49, "deg": 238, "clouds": 71 }, { "dt": 1572696000, "sunrise": 1572678239, "sunset": 1572716166, "temp": { "day": 20.75, "min": 15.6, "max": 20.75, "night": 17.34, "eve": 18.2, "morn": 17.76 }, "pressure": 1016, "humidity": 74, "weather": [{ "id": 502, "main": "Rain", "description": "heavy intensity rain", "icon": "10d" }], "speed": 4.13, "deg": 238, "clouds": 100, "rain": 23.56 }, { "dt": 1572782400, "sunrise": 1572764705, "sunset": 1572802501, "temp": { "day": 16.71, "min": 14.62, "max": 16.89, "night": 15.13, "eve": 14.62, "morn": 15.9 }, "pressure": 1012, "humidity": 56, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 5.68, "deg": 280, "clouds": 95, "rain": 2.44 }, { "dt": 1572868800, "sunrise": 1572851171, "sunset": 1572888837, "temp": { "day": 18.11, "min": 13.48, "max": 18.11, "night": 13.97, "eve": 13.75, "morn": 13.77 }, "pressure": 1014, "humidity": 52, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 4.49, "deg": 276, "clouds": 0, "rain": 0.38 }, { "dt": 1572955200, "sunrise": 1572937638, "sunset": 1572975174, "temp": { "day": 17.35, "min": 12.81, "max": 17.63, "night": 13.59, "eve": 13.68, "morn": 16.69 }, "pressure": 1011, "humidity": 63, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "speed": 7.18, "deg": 302, "clouds": 44, "rain": 3.38 }, { "dt": 1573041600, "sunrise": 1573024104, "sunset": 1573061513, "temp": { "day": 16.57, "min": 11.73, "max": 16.57, "night": 12.82, "eve": 12.4, "morn": 12.23 }, "pressure": 1014, "humidity": 52, "weather": [{ "id": 500, "main": "Rain", "description": "light rain", "icon": "10d" }], "speed": 6.31, "deg": 306, "clouds": 46, "rain": 1.19 }, { "dt": 1573128000, "sunrise": 1573110571, "sunset": 1573147853, "temp": { "day": 18.2, "min": 12.71, "max": 18.2, "night": 12.71, "eve": 15.12, "morn": 17.18 }, "pressure": 1006, "humidity": 66, "weather": [{ "id": 501, "main": "Rain", "description": "moderate rain", "icon": "10d" }], "speed": 10.62, "deg": 284, "clouds": 64, "rain": 9.57 }, { "dt": 1573214400, "sunrise": 1573197038, "sunset": 1573234195, "temp": { "day": 16.19, "min": 11, "max": 16.19, "night": 14.26, "eve": 12.91, "morn": 11 }, "pressure": 1019, "humidity": 48, "weather": [{ "id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03d" }], "speed": 3.01, "deg": 333, "clouds": 39 }] };
//     return data;
//   }
//   // END EMULATED REQUEST
//
//   return fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       console.log('getFiveDayWeatherByCoordinates: ', data);
//       return data;
//     })
//     // .catch(err => console.log(err));
//
// }

export function getWeatherByCoordinates(lat, lon) {
  let url = WEATHER_LAT_LON_URL(lat, lon);

  return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('getWeatherByCoordinates: ', data);
        return data
      })
}

export function getLocationCities(location) {
  let url = SEARCH_LOCATION_URL(location);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log('getLocationCities: ', data);
      return data;
    })
  // .catch(err => console.log(err));

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