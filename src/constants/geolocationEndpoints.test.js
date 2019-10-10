import { IP_API_URL, OPENCAGEDATA_LAT_LON_URL } from '../constants/geolocationEndpoints';
const frisby = require('frisby');
const Joi = frisby.Joi;

it('Get Location By IP', async () => {
    return frisby
        .get(IP_API_URL)
        .expect('status', 200)
        .expect('jsonTypes', Joi.object({
            city: Joi.string().required(),
            continent_code: Joi.string().required(),
            country: Joi.string().required(),
            country_name: Joi.string().required(),
            currency: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        }));
});

it('Get Info of Address', async () => {
    //LISBON COORDINATES
    let lat = 38.72;
    let lon = -9.14;
    let url = OPENCAGEDATA_LAT_LON_URL(lat, lon);
    return frisby
        .get(url)
        .expect('status', 200)
        .expect('jsonTypes', Joi.object({
            results: Joi.array().items(
                Joi.object({
                    componets: Joi.object({
                        city: Joi.string().required(),
                        continent: Joi.string().required(),
                        country_code: Joi.string().required(),
                        county: Joi.number().required(),
                    }),
                    confidence: Joi.number().required(),
                }),
            ).min(1).required(),
        }));
});