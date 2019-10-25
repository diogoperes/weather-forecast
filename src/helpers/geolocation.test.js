import { getLocationByNavigatorGeolocation, getLocationByIp, getCityNameByLatLng } from './geolocation';

beforeEach(() => {
    window.navigator.geolocation = undefined;
    fetch.resetMocks();
});

test('Test getLocationByNavigatorGeolocation Successfull request', () => {
    const mockGeolocation = {
        getCurrentPosition: jest.fn()
            .mockImplementationOnce((success) => Promise.resolve(success({
                coords: {
                    latitude: 38.72,
                    longitude: -9.14
                }
            })))
    };
    global.navigator.geolocation = mockGeolocation;
    const onResponse = jest.fn();
    const onError = jest.fn();

    return getLocationByNavigatorGeolocation()
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();
            expect(onResponse.mock.calls[0][0].latitude).toBeDefined();
            expect(onResponse.mock.calls[0][0].longitude).toBeDefined();
        });
});

test('Test getLocationByNavigatorGeolocation with Geolocation undefined', () => {
    const onResponse = jest.fn();
    const onError = jest.fn();

    return getLocationByNavigatorGeolocation()
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            // console.log('response', onError.mock.calls[0][0].message)
            expect(typeof onError.mock.calls[0][0].message).toBe('string');;
        });
});

describe('Test getLocationByNavigatorGeolocation error codes', function () {
    beforeEach(() => fetch.resetMocks());

    test.each`
        input     | expectedResult
        ${0}  | ${'User denied the request for Geolocation'}
        ${1}  | ${'Location information is unavailable'}
        ${2}  | ${'The request to get user location timed out'}
        ${404}  | ${'An unknown error occurred'}
        // add new test cases here
        `('test $input error. Expected: $expectedResult', ({ input, expectedResult }) => {
        
            const mockGeolocation = {
                getCurrentPosition: jest.fn()
                    .mockImplementationOnce((success, error) => Promise.resolve(error({ code: input})))
            };
            global.navigator.geolocation = mockGeolocation;
            const onResponse = jest.fn();
            const onError = jest.fn();
            return getLocationByNavigatorGeolocation()
                .then(onResponse)
                .catch(onError)
                .then(() => {
                    expect(onResponse).not.toHaveBeenCalled();
                    expect(onError).toHaveBeenCalled();
                    expect(onError.mock.calls[0][0].message).toBe(expectedResult);
                });

    })
});    

// TESTS FOR getLocationByIp

test('Test getLocationByIp Successfull Request', () => {
    fetch.mockResponseOnce(JSON.stringify({
        "ip": "148.69.141.221",
        "city": "Lisbon",
        "region": "Lisbon",
        "region_code": "11",
        "country": "PT",
        "country_name": "Portugal",
        "continent_code": "EU",
        "in_eu": true,
        "postal": "1150-244",
        "latitude": 38.7174,
        "longitude": -9.1321,
        "timezone": "Europe/Lisbon",
        "utc_offset": "+0100",
        "country_calling_code": "+351",
        "currency": "EUR",
        "languages": "pt-PT,mwl",
        "asn": "AS12353",
        "org": "Vodafone Portugal - Communicacoes Pessoais S.A."
    }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return getLocationByIp()
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();

            expect(onResponse.mock.calls[0][0].latitude).toEqual(38.7174);
            expect(onResponse.mock.calls[0][0].longitude).toEqual(-9.1321);
            expect(onResponse.mock.calls[0][0].city).toEqual('Lisbon');
            expect(onResponse.mock.calls[0][0].country).toEqual('PT');
        });
});

test('Test getLocationByIp Error 404', () => {
    fetch.mockReject(new Error('404'))
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let lat = 38.72;
    let lon = -9.14;

    return getLocationByIp(lat, lon)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            expect(onError.mock.calls[0][0].message).toMatch("404");
        });
});

// TESTS FOR getCityNameByLatLng

test('Test getCityNameByLatLng Successfull Request', () => {
    fetch.mockResponseOnce(JSON.stringify({ "documentation": "https://opencagedata.com/api", "licenses": [{ "name": "see attribution guide", "url": "https://opencagedata.com/credits" }], "rate": { "limit": 2500, "remaining": 2498, "reset": 1571961600 }, "results": [{ "annotations": { "DMS": { "lat": "38° 42' 31.01436'' N", "lng": "9° 7' 56.41032'' W" }, "MGRS": "29SMC8849384450", "Maidenhead": "IM58kr40cb", "Mercator": { "x": -1016607.012, "y": 4653293.962 }, "OSM": { "edit_url": "https://www.openstreetmap.org/edit?way=96595218#map=16/38.70862/-9.13234", "url": "https://www.openstreetmap.org/?mlat=38.70862&mlon=-9.13234#map=16/38.70862/-9.13234" }, "UN_M49": { "regions": { "EUROPE": "150", "PT": "620", "SOUTHERN_EUROPE": "039", "WORLD": "001" }, "statistical_groupings": ["MEDC"] }, "callingcode": 351, "currency": { "alternate_symbols": [], "decimal_mark": ",", "html_entity": "&#x20AC;", "iso_code": "EUR", "iso_numeric": "978", "name": "Euro", "smallest_denomination": 1, "subunit": "Cent", "subunit_to_unit": 100, "symbol": "€", "symbol_first": 1, "thousands_separator": "." }, "flag": "🇵🇹", "geohash": "eycs0nwn10ue5pkqz5dj", "qibla": 97.88, "roadinfo": { "drive_on": "right", "speed_in": "km/h" }, "sun": { "rise": { "apparent": 1571900100, "astronomical": 1571894760, "civil": 1571898480, "nautical": 1571896620 }, "set": { "apparent": 1571939160, "astronomical": 1571944500, "civil": 1571940780, "nautical": 1571942640 } }, "timezone": { "name": "Europe/Lisbon", "now_in_dst": 1, "offset_sec": 3600, "offset_string": "+0100", "short_name": "WEST" }, "what3words": { "words": "outpost.sunset.fork" } }, "bounds": { "northeast": { "lat": 38.7087022, "lng": -9.1321842 }, "southwest": { "lat": 38.7084406, "lng": -9.1324683 } }, "components": { "ISO_3166-1_alpha-2": "PT", "ISO_3166-1_alpha-3": "PRT", "_type": "building", "city": "Lisbon", "continent": "Europe", "country": "Portugal", "country_code": "pt", "county": "Lisbon", "house_number": "14", "neighbourhood": "Sé", "pedestrian": "Rua Instituto Virgílio Machado", "political_union": "European Union", "postcode": "1100-135", "state": "Área Metropolitana de Lisboa", "state_district": "Grande Lisboa", "suburb": "Alfama" }, "confidence": 10, "formatted": "Rua Instituto Virgílio Machado 14, 1100-135 Lisbon, Portugal", "geometry": { "lat": 38.7086151, "lng": -9.1323362 } }], "status": { "code": 200, "message": "OK" }, "stay_informed": { "blog": "https://blog.opencagedata.com", "twitter": "https://twitter.com/opencagedata" }, "thanks": "For using an OpenCage API", "timestamp": { "created_http": "Thu, 24 Oct 2019 10:45:04 GMT", "created_unix": 1571913904 }, "total_results": 1 }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let lat = 38.72;
    let lon = -9.14;

    return getCityNameByLatLng(lat, lon)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();

            expect(onResponse.mock.calls[0][0].latitude).toEqual(lat);
            expect(onResponse.mock.calls[0][0].longitude).toEqual(lon);
            expect(onResponse.mock.calls[0][0].city).toEqual('Lisbon');
            expect(onResponse.mock.calls[0][0].country).toEqual('PT');
        });
});

test('Test getCityNameByLatLng Error 404', () => {
    fetch.mockReject(new Error('404'))
    const onResponse = jest.fn();
    const onError = jest.fn();

    //LISBON
    let lat = 38.72;
    let lon = -9.14;

    return getCityNameByLatLng(lat, lon)
        .then(onResponse)
        .catch(onError)
        .then(() => {
            expect(onResponse).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            expect(onError.mock.calls[0][0].message).toMatch("404");
        });
});