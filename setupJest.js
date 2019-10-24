global.fetch = require('jest-fetch-mock');

// const mockGeolocation = {
//     getCurrentPosition: jest.fn()
//         .mockImplementationOnce((success) => Promise.resolve(success({
//             coords: {
//                 latitude: 38.72,
//                 longitude: -9.14
//             }
//         })))
// };
// global.navigator.geolocation = mockGeolocation;