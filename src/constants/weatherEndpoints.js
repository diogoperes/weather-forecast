const WEATHER_URL_API = 'http://api.openweathermap.org/data/2.5';
const APP_ID = '4d8fb5b93d4af21d66a2948710284366';
// export const WEATHER_LAT_LON_URL = (lat, lon) => { return `${WEATHER_URL_API}/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}`};
export const FORECAST_ID_URL = (id) => { return `${WEATHER_URL_API}/forecast/daily?id=${id}&cnt=5&appid=${APP_ID}`};
export const SEARCH_LOCATION_URL = (location) => { return `${WEATHER_URL_API}/find?q=${location}&appid=${APP_ID}`};
export const WEATHER_LAT_LON_URL = (lat, lon) => { return `${WEATHER_URL_API}/onecall?lat=${lat}&lon=${lon}&appid=${APP_ID}&units=metric`};