import { IP_API_URL, OPENCAGEDATA_LAT_LON_URL } from '../constants/geolocationEndpoints';
import { getErrorDescriptionByCode } from '../constants/geolocationErrorCodes';

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
        let errorMessage = getErrorDescriptionByCode(error.code);
        console.error('Error retrieving geolocation. Reason: ', errorMessage);
        return reject({ message: errorMessage })
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
            // .catch(err => console.error(err));
};


export function getCityNameByLatLng(lat, lng) {
  return fetch(OPENCAGEDATA_LAT_LON_URL(lat, lng))
          .then(response => response.json())
          .then(data => {
            console.log('getCityNameByLatLng', data);
            let city = data.results[0].components.city !== undefined ? data.results[0].components.city : data.results[0].components.town;

            return {
              latitude: lat,
              longitude: lng,
              city: city,
              country: data.results[0].components.country_code.toUpperCase()
            };
          })
          // .catch(err => console.error(err));
}