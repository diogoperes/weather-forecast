const APP_KEY = 'bf41500f10f1d269963a287a6f2b16dc28190796';
const API_URL = 'https://api.waqi.info/feed';

export const WAQI_URL = (lat, lon) => { return `${API_URL}/geo:${lat};${lon}/?token=${APP_KEY}` };