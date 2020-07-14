import {WEATHER_LAT_LON_URL, SEARCH_LOCATION_URL} from './weatherEndpoints';
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

it('Search location', async () => {
    let location = 'Lisbon';
    let url = SEARCH_LOCATION_URL(location);

    return frisby
        .get(url)
        .expect('status', 200)
        .expect('jsonTypes', Joi.object({
            message: Joi.string().required(),
            cod: Joi.string().required(),
            count: Joi.number().required(),
            list: Joi.array().items(
                Joi.object({
                    id: Joi.number().required(),
                    name: Joi.string().required(),
                    coord: Joi.object({
                        lat: Joi.number().required(),
                        lon: Joi.number().required()
                    }).min(1).required(),
                    main: Joi.object({
                        temp: Joi.number().required(),
                        temp_min: Joi.number().required(),
                        temp_max: Joi.number().required(),
                        pressure: Joi.number().required(),
                        humidity: Joi.number().required()
                    }).min(1).required(),
                    wind: Joi.object({
                        speed: Joi.number().required(),
                        deg: Joi.number().required()
                    }),
                    sys: Joi.object({
                        country: Joi.string().required(),
                    }),
                    weather: Joi.array().items(
                        Joi.object({
                            icon: Joi.string().required()
                        })
                    ).min(1).required()
                })
            ).min(1).required()
        }));
});