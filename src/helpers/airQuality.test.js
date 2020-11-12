import { getAirQualityByCoordinates, getAirQualityInfoByIndex } from './airQuality';


// https://www.reactnativeschool.com/mocking-fetch-api-calls-when-using-jest

beforeEach(() => {
    fetch.resetMocks();
});

test('Successfull request', () => {
    fetch.mockResponseOnce(JSON.stringify({ "status": "ok", "data": { "aqi": 5, "idx": 10513, "attributions": [{ "url": "http://qualar.apambiente.pt/", "name": "Portugal -Agencia Portuguesa do Ambiente - Qualidade do Ar" }, { "url": "http://www.eea.europa.eu/themes/air/", "name": "European Environment Agency" }, { "url": "https://waqi.info/", "name": "World Air Quality Index Project" }], "city": { "geo": [38.768888888889, -9.1080555555556], "name": "Olivais, Lisboa, Portugal", "url": "https://aqicn.org/city/portugal/lisboa/olivais" }, "dominentpol": "o3", "iaqi": { "h": { "v": 53.5 }, "no2": { "v": 30.3 }, "o3": { "v": 4.9 }, "pm10": { "v": 16 }, "pm25": { "v": 15 }, "so2": { "v": 0.8 }, "t": { "v": 19.5 }, "w": { "v": 5.4 }, "wg": { "v": 12.3 } }, "time": { "s": "2019-10-15 11:00:00", "tz": "+01:00", "v": 1571137200 }, "debug": { "sync": "2019-10-15T21:58:47+09:00" } } }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let lat = 38.72;
    let lon = -9.14;
    
    return getAirQualityByCoordinates(lat, lon)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();

            expect(onResponse.mock.calls[0][0].iaqi.pm25.v).toEqual(15);
        });
});

test('Test Empty response', () => {
    fetch.mockResponseOnce(JSON.stringify({}));
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let lat = 38.72;
    let lon = -9.14;

    return getAirQualityByCoordinates(lat, lon)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            console.log('response', onResponse);
            expect(onResponse).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            expect(onError.mock.calls[0][0].message).toMatch("Empty Response");
        });
});

test('Test Error 404', () => {
    fetch.mockReject(new Error('404'))
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let lat = 38.72;
    let lon = -9.14;

    return getAirQualityByCoordinates(lat, lon)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            expect(onError.mock.calls[0][0].message).toMatch("404");
        });
});

describe('getAirQualityInfoByIndex', () => {
    test.each`
        input     | expectedResult
        ${23}  | ${{ label: 'Good', color: '#009966' }}
        ${62}   | ${{ label: 'Moderate', color: '#ffde33' }}
        ${134}  | ${{ label: 'Little Unhealthy', color: '#ff9933' }}
        ${165}   | ${{ label: 'Unhealthy', color: '#cc0033' }}
        ${246}   | ${{ label: 'Very Unhealthy', color: '#660099' }}
        ${320}   | ${{ label: 'Hazardous', color: '#7e0023' }}
        // add new test cases here
        `('converts $input to $expectedResult', ({ input, expectedResult }) => {
            expect(getAirQualityInfoByIndex(input)).toMatchObject(expectedResult)
    })
});
