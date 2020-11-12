export const IP_API_URL = 'https://ipapi.co/json/';

const OPENCAGEDATA_KEY = '00f711f73483427c8577e646aa2bf4bf';
const OPENCAGEDATA_URL = 'https://api.opencagedata.com/geocode/v1/json';
export const OPENCAGEDATA_LAT_LON_URL = (lat, lon) => { return `${OPENCAGEDATA_URL}?q=${lat}+${lon}&key=${OPENCAGEDATA_KEY}` };
