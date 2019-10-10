import { WAQI_URL } from './airQualityEndpoint';
const frisby = require('frisby');
const Joi = frisby.Joi;

it('Get Air Quality By Coordinates', async () => {
    //LISBON COORDINATES
    let lat = 38.72;
    let lon = -9.14;
    let url = WAQI_URL(lat, lon);
    return frisby
        .get(url)
        .expect('status', 200)
        .expect('jsonTypes', Joi.object({
            status: Joi.string().required(),
            data: Joi.object({
                iaqi: Joi.object({
                    no2: Joi.object({
                        v: Joi.number().required(),
                    }),
                    o3: Joi.object({
                        v: Joi.number().required(),
                    }),
                    p: Joi.object({
                        v: Joi.number().required(),
                    }),
                    pm10: Joi.object({
                        v: Joi.number().required(),
                    }),
                    pm25: Joi.object({
                        v: Joi.number().required(),
                    }),
                    so2: Joi.object({
                        v: Joi.number().required(),
                    }),
                    t: Joi.object({
                        v: Joi.number().required(),
                    }),
                    w: Joi.object({
                        v: Joi.number().required(),
                    }),
                    wg: Joi.object({
                        v: Joi.number().required(),
                    }),
                }),
                dominentpol: Joi.string().required(),
            }),
        }));
});