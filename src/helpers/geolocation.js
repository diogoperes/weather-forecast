import { IP_API_URL, OPENCAGEDATA_LAT_LON_URL } from '../constants/geolocationEndpoints';

/**
 * @return {Promise}
 */
export const getLocationByNavigatorGeolocation = () => {

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      return void navigator.geolocation.getCurrentPosition((position) => {
        console.log('getLocationByNavigatorGeolocation', position);
        // let city = getCityNameByLatLng(position.coords.latitude, position.coords.longitude);
        // console.log('city', city);
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }, (error) => {
        let errorMessage;
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'User denied the request for Geolocation';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
            break;
        }
        console.error('Error retrieving geolocation. Reason: ', errorMessage);
        return reject({message: errorMessage});
      });
    }

    reject({message: 'Geolocation is not supported by this browser'});
  });
};

export const getLocationByIp = () => {
  return fetch(IP_API_URL)
            .then(response => response.json())
            .then(data => {
              console.log('getLocationByIp', data);
              return {
                latitude: data.latitude,
                longitude: data.longitude,
                city: data.city,
                country: data.country
              };
            })
            .catch(err => console.error(err));
};


export function getCityNameByLatLng(lat, lng) {
  return fetch(OPENCAGEDATA_LAT_LON_URL(lat, lng))
          .then(response => response.json())
          .then(data => {
            console.log('getCityNameByLatLng', data);
            return {
              latitude: lat,
              longitude: lng,
              city: data.results[0].components.city,
              country: data.results[0].components.country_code.toUpperCase()
            };
          })
          .catch(err => console.error(err));
}