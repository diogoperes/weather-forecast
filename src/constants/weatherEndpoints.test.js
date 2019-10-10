import { WEATHER_LAT_LON_URL, FORECAST_ID_URL } from './weatherEndpoints';
const frisby = require('frisby');
const Joi = frisby.Joi;

it('Get Today Weather', async () => {
    //LISBON COORDINATES
    let lat = 38.72;
    let lon = -9.14;
    let url = WEATHER_LAT_LON_URL(lat, lon);

    return frisby
        .get(url)
        .expect('status', 200)
        .expect('jsonTypes', Joi.object({
            cod: Joi.number().required(),
            coord: Joi.object({
                lat: Joi.number().required(),
                lon: Joi.number().required()
            }),
            id: Joi.number().required(),
            main: Joi.object({
                humidity: Joi.number().required(),
                pressure: Joi.number().required(),
                temp: Joi.number().required(),
                temp_max: Joi.number().required(),
                temp_min: Joi.number().required(),
            }),
            name: Joi.string().required(),
            sys: Joi.object({
                country: Joi.string().required(),
                id: Joi.number().required(),
                sunrise: Joi.number().required(),
                sunset: Joi.number().required(),
                type: Joi.number().required(),
            }),
            timezone: Joi.number().required(),
            visibility: Joi.number().required(),
            weather: Joi.array().items(
                Joi.object({
                    description: Joi.string().required(),
                    icon: Joi.string().required(),
                    id: Joi.number().required(),
                    main: Joi.string().required(),
                }),
            ).min(1).required(),
            wind: Joi.object({
                deg: Joi.number(),
                speed: Joi.number().required(),
            }),
        }));
});

it('Get Weather Forecast', async () => {
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