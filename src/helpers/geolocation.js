import { IP_API_URL, OPENCAGEDATA_LAT_LON_URL } from '../constants/geolocationEndpoints';
import { getErrorDescriptionByCode } from '../constants/geolocationErrorCodes';
import { EMULATE_REQUESTS } from '../constants/system';

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
  if (process.env.NODE_ENV === 'development' && EMULATE_REQUESTS) {
    console.log('getLocationByIp EMULATED')
    let data = { "ip": "148.69.141.221", "city": "Lisbon", "region": "Lisbon", "region_code": "11", "country": "PT", "country_name": "Portugal", "continent_code": "EU", "in_eu": true, "postal": "1150-244", "latitude": 38.7174, "longitude": -9.1321, "timezone": "Europe/Lisbon", "utc_offset": "+0100", "country_calling_code": "+351", "currency": "EUR", "languages": "pt-PT,mwl", "asn": "AS12353", "org": "Vodafone Portugal - Communicacoes Pessoais S.A." };
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country
    };  
  }

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
  if (process.env.NODE_ENV === 'development' && EMULATE_REQUESTS) {
    console.log('getCityNameByLatLng EMULATED')
    let data = { "documentation": "https://opencagedata.com/api", "licenses": [{ "name": "see attribution guide", "url": "https://opencagedata.com/credits" }], "rate": { "limit": 2500, "remaining": 2498, "reset": 1571961600 }, "results": [{ "annotations": { "DMS": { "lat": "38° 42' 31.01436'' N", "lng": "9° 7' 56.41032'' W" }, "MGRS": "29SMC8849384450", "Maidenhead": "IM58kr40cb", "Mercator": { "x": -1016607.012, "y": 4653293.962 }, "OSM": { "edit_url": "https://www.openstreetmap.org/edit?way=96595218#map=16/38.70862/-9.13234", "url": "https://www.openstreetmap.org/?mlat=38.70862&mlon=-9.13234#map=16/38.70862/-9.13234" }, "UN_M49": { "regions": { "EUROPE": "150", "PT": "620", "SOUTHERN_EUROPE": "039", "WORLD": "001" }, "statistical_groupings": ["MEDC"] }, "callingcode": 351, "currency": { "alternate_symbols": [], "decimal_mark": ",", "html_entity": "&#x20AC;", "iso_code": "EUR", "iso_numeric": "978", "name": "Euro", "smallest_denomination": 1, "subunit": "Cent", "subunit_to_unit": 100, "symbol": "€", "symbol_first": 1, "thousands_separator": "." }, "flag": "🇵🇹", "geohash": "eycs0nwn10ue5pkqz5dj", "qibla": 97.88, "roadinfo": { "drive_on": "right", "speed_in": "km/h" }, "sun": { "rise": { "apparent": 1571900100, "astronomical": 1571894760, "civil": 1571898480, "nautical": 1571896620 }, "set": { "apparent": 1571939160, "astronomical": 1571944500, "civil": 1571940780, "nautical": 1571942640 } }, "timezone": { "name": "Europe/Lisbon", "now_in_dst": 1, "offset_sec": 3600, "offset_string": "+0100", "short_name": "WEST" }, "what3words": { "words": "outpost.sunset.fork" } }, "bounds": { "northeast": { "lat": 38.7087022, "lng": -9.1321842 }, "southwest": { "lat": 38.7084406, "lng": -9.1324683 } }, "components": { "ISO_3166-1_alpha-2": "PT", "ISO_3166-1_alpha-3": "PRT", "_type": "building", "city": "Lisbon", "continent": "Europe", "country": "Portugal", "country_code": "pt", "county": "Lisbon", "house_number": "14", "neighbourhood": "Sé", "pedestrian": "Rua Instituto Virgílio Machado", "political_union": "European Union", "postcode": "1100-135", "state": "Área Metropolitana de Lisboa", "state_district": "Grande Lisboa", "suburb": "Alfama" }, "confidence": 10, "formatted": "Rua Instituto Virgílio Machado 14, 1100-135 Lisbon, Portugal", "geometry": { "lat": 38.7086151, "lng": -9.1323362 } }], "status": { "code": 200, "message": "OK" }, "stay_informed": { "blog": "https://blog.opencagedata.com", "twitter": "https://twitter.com/opencagedata" }, "thanks": "For using an OpenCage API", "timestamp": { "created_http": "Thu, 24 Oct 2019 10:45:04 GMT", "created_unix": 1571913904 }, "total_results": 1 };
    let city = data.results[0].components.city !== undefined ? data.results[0].components.city : data.results[0].components.town;
    return {
      latitude: lat,
      longitude: lng,
      city: city,
      country: data.results[0].components.country_code.toUpperCase()
    };
  }

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