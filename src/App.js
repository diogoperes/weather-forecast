import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {getLocationByNavigatorGeolocation, getLocationByIp, getCityNameByLatLng} from './helpers/geolocation';
import { getWeatherByCoordinates, getFiveDayWeatherByCoordinates } from './helpers/openWeatherMap';
import { getAirQualityByCoordinates } from './helpers/airQuality';
import Weather from "./components/Weather";
import WeekWeather from "./components/WeekWeather";

class App extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loadingDescription: 'Fetching geolocation',
      loadingWeather: true
    };
  }

  componentDidMount() {
    let location;
    getLocationByNavigatorGeolocation()
      .then(position => {
        this.setState(() => ({ loadingDescription: 'Get City Desctription'}));
        return getCityNameByLatLng(position.latitude , position.longitude);
      })
      //GET LOCATION BY IP
      .catch(failed => {
        this.setState(() => ({ loadingDescription: 'Get City by IP' }));
        return getLocationByIp();
      })
      //GET TODAY WETAHER BY COORDINATES
      .then(position => {
        location = {
          city: position.city,
          country: position.country,
          latitude: position.latitude,
          longitude: position.longitude
        };
        this.setState(() => (
          {location: location, 
          loadingDescription: 'Fetching Today\'s Weather'})
        );
        return getWeatherByCoordinates(position.latitude , position.longitude);
      })
      //GET FIVE DAYS FORECAST WETAHER BY ID
      .then(data => {
        console.log('today data' , data);
        this.setState(() => ({ todayTemp: data, loadingDescription: 'Fetching Next Five Days Forecast'}));
        return getFiveDayWeatherByCoordinates(data.id);
      })
      //GET AIR QUALITY
      .then(data => {
        console.log('week data', data);
        this.setState(() => ({
          weekTemp: data,
          loadingDescription: 'Fetching Air Quality'
        }));
        return getAirQualityByCoordinates(location.latitude, location.longitude);
      })
      .then(data => {
        console.log('getAirQualityByCoordinates data', data);
        this.setState(() => ({
          airQuality: data,
          loadingWeather: false,
        }));
      })
      .catch(error => {
        this.setState(() => ({loadingWeather: false}));
        console.error((error && error.message) || 'Error retrieving weather for current position')
      })
      // .finally(() => {
      //   this.setState(() => ({loadingWeather: false}));
      // });
      // .then(location => {
      //   return store.dispatch(fetchWeather(getCityNameFromGeocode(location)));
      // })
      
  }

  componentDidUpdate () {
    window.store = this.state;
  }

  render() {

    let loadingUI = '';
    if(this.state.loadingWeather) {
      loadingUI = (<div className="loader-container">
        <div className="loader"></div>
        <div className="loader-description">{this.state.loadingDescription}</div>
      </div>
      );
    }

    let weatherUI = '';
    if (!this.state.loadingWeather && this.state.todayTemp !== undefined) {
      weatherUI = (
        <div className="weather-container">
          <Weather location={this.state.location} todayTemp={this.state.todayTemp} airQuality={this.state.airQuality} />
          <WeekWeather data={this.state.weekTemp} />
        </div>
      );
    }

    return (
      <div className="App">
        {loadingUI}
        {weatherUI}
      </div>
    );
  }
}

export default App;
