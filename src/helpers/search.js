import { getLocationByNavigatorGeolocation, getLocationByIp, getCityNameByLatLng } from './geolocation';
import { getWeatherByCoordinates, getFiveDayWeatherByCoordinates } from './openWeatherMap';
import { getAirQualityByCoordinates } from './airQuality';

export function searchCurrentLocation(loadingDescriptionCallback) {

    let returnObject = {};

    return getLocationByNavigatorGeolocation()
        .then(position => {
            loadingDescriptionCallback('Get City Desctription');
            returnObject = {
                ...returnObject,
                latitude: position.latitude,
                longitude: position.longitude
            }
            return getCityNameByLatLng(position.latitude, position.longitude);
        })
        //GET LOCATION BY IP
        .catch(failed => {
            loadingDescriptionCallback('Get City by IP');
            return getLocationByIp();
        })
        //GET TODAY WETAHER BY COORDINATES
        .then(position => {
            returnObject = {
                ...returnObject,
                location: {
                    city: position.city,
                    country: position.country,
                    latitude: position.latitude,
                    longitude: position.longitude
                }
            };
            loadingDescriptionCallback('Fetching Today\'s Weather');
            return getWeatherByCoordinates(position.latitude, position.longitude);
        })
        //GET FIVE DAYS FORECAST WETAHER BY ID
        .then(data => {
            loadingDescriptionCallback('Fetching Next Five Days Forecast');
            returnObject = { ...returnObject, todayTemp: data};
            return getFiveDayWeatherByCoordinates(data.id);
        })
        //GET AIR QUALITY
        .then(data => {
            loadingDescriptionCallback('Fetching Air Quality');
            returnObject = { ...returnObject, weekTemp: data };
            return getAirQualityByCoordinates(returnObject.location.latitude, returnObject.location.longitude);
        })
        .then(data => {
            returnObject = { ...returnObject, airQuality: data };
            return returnObject;
        })
}

export function searchCity(lat, lon, city, country, loadingDescriptionCallback) {
    let returnObject = {
        location: {
            city,
            country,
            latitude: lat,
            longitude: lon
        }
    };

    return getWeatherByCoordinates(lat, lon)
        //GET FIVE DAYS FORECAST WETAHER BY ID
        .then(data => {
            loadingDescriptionCallback('Fetching Next Five Days Forecast');
            returnObject = { ...returnObject, todayTemp: data};
            return getFiveDayWeatherByCoordinates(data.id);
        })
        //GET AIR QUALITY
        .then(data => {
            loadingDescriptionCallback('Fetching Air Quality');
            returnObject = { ...returnObject, weekTemp: data };
            return getAirQualityByCoordinates(returnObject.location.latitude, returnObject.location.longitude);
        })
        .then(data => {
            returnObject = { ...returnObject, airQuality: data };
            return returnObject;
        })
}