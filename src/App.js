import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import {getLocationByNavigatorGeolocation, getLocationByIp, getCityNameByLatLng} from './helpers/geolocation';
// import { getWeatherByCoordinates, getFiveDayWeatherByCoordinates } from './helpers/openWeatherMap';
// import { getAirQualityByCoordinates } from './helpers/airQuality';
import { searchCurrentLocation} from './helpers/search';
import { getLocationCities } from './helpers/openWeatherMap';
import Weather from "./components/Weather";
import WeekWeather from "./components/WeekWeather";

class App extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      loadingDescription: 'Fetching geolocation',
      loadingWeather: true,
      cityList: []
    };

    this.searchLocationHandler = this.searchLocationHandler.bind(this);
  }

  componentDidMount() {

    let loadingDescriptionCallback = (text) => {
      this.setState(() => ({ loadingDescription: text }));
    };

    searchCurrentLocation(loadingDescriptionCallback)
      .then(data => {
        console.log('data', data);
        this.setState(() => ({
          location: data.location,
          todayTemp: data.todayTemp,
          weekTemp: data.weekTemp,
          airQuality: data.airQuality,
          loadingWeather: false,
        }));
      })
      .catch((error) => console.error('An Error Occured: ', error));
      
  }

  componentDidUpdate () {
    window.store = this.state;
  }

  searchLocationHandler (event, location) {
    
    getLocationCities(location)
      .then(data => {
        this.setState(() => ({ cityList: data.list }));
      })
      .catch((error) => console.error('An Error Occured: ', error));

    // prevents page from refreshing when form is submited
    event.preventDefault();
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
          <Weather location={this.state.location} 
            todayTemp={this.state.todayTemp} 
            airQuality={this.state.airQuality} 
            searchLocationCallBack={this.searchLocationHandler}/>
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
