const WEATHER_URL = 'https://openweathermap.org/data/2.5';
const APP_ID = 'b6907d289e10d714a6e88b30761fae22';
export const WEATHER_LAT_LON_URL = (lat, lon) => { return `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${APP_ID}`};
export const FORECAST_ID_URL = (id) => { return `${WEATHER_URL}/forecast/daily?id=${id}&cnt=5&appid=${APP_ID}`};