import { WAQI_URL } from '../constants/airQualityEndpoint';
import { EMULATE_REQUESTS } from '../constants/system';

export const getAirQualityByCoordinates = (lat, lon) => {
    console.log('args', process.argv);
    if (process.env.NODE_ENV === 'development' && EMULATE_REQUESTS) {
        console.log('getAirQualityByCoordinates EMULATED')
        return { "aqi": 5, "idx": 10513, "attributions": [{ "url": "http://qualar.apambiente.pt/", "name": "Portugal -Agencia Portuguesa do Ambiente - Qualidade do Ar" }, { "url": "http://www.eea.europa.eu/themes/air/", "name": "European Environment Agency" }, { "url": "https://waqi.info/", "name": "World Air Quality Index Project" }], "city": { "geo": [38.768888888889, -9.1080555555556], "name": "Olivais, Lisboa, Portugal", "url": "https://aqicn.org/city/portugal/lisboa/olivais" }, "dominentpol": "o3", "iaqi": { "h": { "v": 53.5 }, "no2": { "v": 30.3 }, "o3": { "v": 4.9 }, "pm10": { "v": 16 }, "pm25": { "v": 15 }, "so2": { "v": 0.8 }, "t": { "v": 19.5 }, "w": { "v": 5.4 }, "wg": { "v": 12.3 } }, "time": { "s": "2019-10-15 11:00:00", "tz": "+01:00", "v": 1571137200 }, "debug": { "sync": "2019-10-15T21:58:47+09:00" } };
    }

    return fetch(WAQI_URL(lat, lon) )
        .then(response => response.json())
        .then(data => {
            // console.log('getAirQualityByCoordinates', data);
            
            if (Object.keys(data).length === 0) {
                throw new Error('Empty Response');
            }

            return data.data;
        })
        // .catch(err => err);
};

export const getAirQualityInfoByIndex = (index) => {
    let valueToReturn = {};
    if( index <= 50 ) {
        valueToReturn = { label: 'Good', color: '#009966'}
    } else if ( index <= 100) {
        valueToReturn = { label: 'Moderate', color: '#ffde33' }
    } else if (index <= 150) {
        valueToReturn = { label: 'Little Unhealthy', color: '#ff9933' }
    } else if (index <= 200) {
        valueToReturn = { label: 'Unhealthy', color: '#cc0033' }
    } else if (index <= 300) {
        valueToReturn = { label: 'Very Unhealthy', color: '#660099' }
    } else {
        valueToReturn = { label: 'Hazardous', color: '#7e0023' }
    }
    return valueToReturn;
}