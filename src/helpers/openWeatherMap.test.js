import { WEATHER_LAT_LON_URL, FORECAST_ID_URL } from '../constants/weatherEndpoints';
// jest.mock('node-fetch');
// import fetch from 'node-fetch';
// const { Response } = jest.requireActual('node-fetch');

const frisby = require('frisby');
const Joi = frisby.Joi;

// beforeEach(() => {
//     fetch.resetMocks();
// });

// test('returns result if array', () => {
//     fetch.mockResponseOnce(JSON.stringify([{ id: 1 }]));
// });

// test('getWeatherByCoordinates', () => {
//     // fetch.mockResponseOnce(JSON.stringify({ "coord": { "lon": -9.14, "lat": 38.72 }, "weather": [ { "id": 800, "main": "Clear", "description": "clear sky", "icon": "01d" } ], "base": "stations", "main": { "temp": 21.67, "pressure": 1019, "humidity": 37, "temp_min": 19.44, "temp_max": 23.89 }, "visibility": 10000, "wind": { "speed": 9.8, "deg": 350 }, "clouds": { "all": 0 }, "dt": 1570627510, "sys": { "type": 1, "id": 6901, "country": "PT", "sunrise": 1570603161, "sunset": 1570644493 }, "timezone": 3600, "id": 8012502, "name": "Socorro", "cod": 200 } ));
//     const onResponse = jest.fn();
//     const onError = jest.fn();

//     return getWeatherByCoordinates(38.72, -9.14)
//         .then(onResponse)
//         .catch(onError)
//         .then(() => {
//             expect(onResponse).toHaveBeenCalled();
//             expect(onError).not.toHaveBeenCalled();
//             console.log('onResponse.mock', onResponse.mock.calls[0[0]])
//             // expect(onResponse.mock.calls[0][0][0]).toEqual({ id: 1 });
//         });
// });

// describe('testing getWeatherByCoordinates', () => {
//     it('should load weather data', async () => {
//         const data = await getWeatherByCoordinates(38.72, -9.14);
//         console.log('test data', data);
//         expect(data).toBeDefined()
//         expect(data.entity.name).toEqual('Koen van Gilst')
//     })
// })

// it('ensures the state is set', () => {
//     const promise = Promise.resolve(mockData);
//     sinon.stub(global, 'fetch', () => promise);

//     const wrapper = mount(<ExampleComponent />);

//     return promise.then(() => {
//         expect(wrapper.state()).to.have.property('dataReady', true);

//         wrapper.update();
//     }).then(() => {
//         expect(wrapper.text()).to.contain('data is ready');
//     });
// });


it('should return weather coords', async () => {
    //LISBON ID
    let id = 8012502;
    let url = FORECAST_ID_URL(id);

    return frisby
        .get(url)
        .expect('status', 200)
        .expect('jsonTypes', Joi.object({
            cnt: Joi.number().required(),
            cod: Joi.string().required(),
            city: Joi.object({
                coord: Joi.object({
                    lat: Joi.number().required(),
                    lon: Joi.number().required()
                }),
                country: Joi.string().required(),
                id: Joi.number().required(),
                name: Joi.string().required(),
                population: Joi.number().required(),
                timezone: Joi.number().required()
            }).required(),
            list: Joi.array().items(
                Joi.object({
                    clouds: Joi.number().required(),
                    deg: Joi.number().required(),
                    dt: Joi.number().required(),
                    humidity: Joi.number().required(),
                    pressure: Joi.number().required(),
                    speed: Joi.number().required(),
                    sunrise: Joi.number().required(),
                    sunset: Joi.number().required(),
                    temp: Joi.object({
                        day: Joi.number().required(),
                        eve: Joi.number().required(),
                        max: Joi.number().required(),
                        min: Joi.number().required(),
                        morn: Joi.number().required(),
                        night: Joi.number().required(),
                    }),
                    weather: Joi.array().items(
                        Joi.object({
                            description: Joi.string().required(),
                            icon: Joi.string().required(),
                            id: Joi.number().required(),
                            main: Joi.string().required(),
                        }),
                    ).min(1).required(),
                })
            ).min(2).required()
        }));
});