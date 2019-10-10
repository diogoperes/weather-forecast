const APP_ID = 'bf41500f10f1d269963a287a6f2b16dc28190796';
const API_URL = 'https://api.waqi.info/feed';

export const getAirQualityByCoordinates = (lat, lon) => {
    let url = `${API_URL}/geo:${lat};${lon}/?token=${APP_ID}`;
    return fetch(url)
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