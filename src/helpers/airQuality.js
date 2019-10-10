import { WAQI_URL } from '../constants/airQualityEndpoint';

export const getAirQualityByCoordinates = (lat, lon) => {
    return fetch(WAQI_URL(lat, lon) )
        .then(response => response.json())
        .then(data => {
            console.log('getAirQualityByCoordinates', data);
            return data.data;
        })
        .catch(err => console.error(err));
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