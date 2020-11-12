import { getWeatherByCoordinates, getLocationCities, getIcon } from './openWeatherMap';
import getWeatherByCoordinatesMockupCall from '../mockupCalls/getWeatherByCoordinates.json'
import getLocationCitiesMockupCall from '../mockupCalls/getLocationCities.json'


// https://www.reactnativeschool.com/mocking-fetch-api-calls-when-using-jest

beforeEach(() => {
    fetch.resetMocks();
});

test('Test getWeatherByCoordinates successfull request', () => {
    fetch.mockResponseOnce(JSON.stringify(getWeatherByCoordinatesMockupCall));
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let lat = 38.72;
    let lon = -9.14;

    return getWeatherByCoordinates(lat, lon)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();

            expect(onResponse.mock.calls[0][0].current).toEqual(expect.any(Object));
            expect(onResponse.mock.calls[0][0].current.temp).toEqual(expect.any(Number));
            expect(onResponse.mock.calls[0][0].current.pressure).toEqual(expect.any(Number));
            expect(onResponse.mock.calls[0][0].current.humidity).toEqual(expect.any(Number));
            expect(onResponse.mock.calls[0][0].current.wind_deg).toEqual(expect.any(Number));
            expect(onResponse.mock.calls[0][0].current.weather).toEqual(expect.any(Object));

        });
});

test('Test getLocationCities successfull request', () => {
    fetch.mockResponseOnce(JSON.stringify(getLocationCitiesMockupCall));
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let location = 'lisbon';

    return getLocationCities(location)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();


            expect(onResponse.mock.calls[0][0].list.length).toBeGreaterThanOrEqual(1);
            expect(onResponse.mock.calls[0][0].list[0].name).toEqual(expect.any(String));
            expect(onResponse.mock.calls[0][0].list[0].main).toEqual(expect.any(Object));
            expect(onResponse.mock.calls[0][0].list[0].main.temp).toEqual(expect.any(Number));

        });
});

describe.each([['01d'], ['01n'], ['02d'], ['03d'], ['03n'], ['04d'], ['04n'], ['09d'], ['09n'], ['10d'], ['10n'], ['11d'], ['11n'], ['13d'], ['13n'], ['50d'], ['50n']])(
    'Test icons',
    (a) => {
        test(`Icon ${a} has icon associated`, () => {
            expect(getIcon(a)).toEqual(expect.any(String));
        });
    },
);
test('Unknown icon returns an icon', () => {
    expect(getIcon('unknown')).toEqual(expect.any(String));
});