[![Build Status](https://travis-ci.org/diogoperes/weather-forecast.svg?branch=master)](https://travis-ci.org/diogoperes/weather-forecast) [![Coverage Status](https://coveralls.io/repos/github/diogoperes/weather-forecast/badge.svg?branch=master)](https://coveralls.io/github/diogoperes/weather-forecast?branch=master)

Weather app built with react.

Uses the user browser location if the user allows it, or the IP address if not.

http://api.openweathermap.org used to retrieve the weather data.
https://api.waqi.info/feed used to retrieve air quality info.

# Run develop
```bash
npm start
```

# Run Tests
```bash
npm test -- --coverage --silent
```

Flags:
```bash
--coverage: show code coverage
--silent: prevent console.logs
```
