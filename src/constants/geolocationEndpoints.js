export const IP_API_URL = 'https://ipapi.co/json/';

const OPENCAGEDATA_KEY = '19dffb48f1a5468f8bfabd4e95c31273';
const OPENCAGEDATA_URL = 'https://api.opencagedata.com/geocode/v1/json';
export const OPENCAGEDATA_LAT_LON_URL = (lat, lon) => { return `${OPENCAGEDATA_URL}?q=${lat}+${lon}&key=${OPENCAGEDATA_KEY}` };
