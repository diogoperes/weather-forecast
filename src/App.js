import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import {getLocationByNavigatorGeolocation, getLocationByIp, getCityNameByLatLng} from './helpers/geolocation';
// import { getWeatherByCoordinates, getFiveDayWeatherByCoordinates } from './helpers/openWeatherMap';
// import { getAirQualityByCoordinates } from './helpers/airQuality';
import { searchCurrentLocation, searchCity } from './helpers/search';
import { getLocationCities } from './helpers/openWeatherMap';
import Weather from "./components/Weather";
import WeekWeather from "./components/WeekWeather";
import CitiesList from "./containers/CitiesList";

class App extends Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      weekDaySelected: 0,
      loadingDescription: 'Fetching geolocation',
      loadingWeather: true,
      citiesList: []
    };

    this.loadingDescriptionCallback = (text) => {
      this.setState(() => ({ loadingDescription: text }));
    };

    this.searchLocationHandler = this.searchLocationHandler.bind(this);
  }

  componentDidMount() {

    searchCurrentLocation(this.loadingDescriptionCallback)
      .then(data => {
        console.log('data', data);
        this.setState(() => ({
          location: data.location,
          weather: data.weather,
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
        this.setState(() => ({
          showCitiesListModal: true,
          citiesList: data.list
        }));
      })
      .catch((error) => console.error('An Error Occured: ', error));

    // prevents page from refreshing when form is submited
    event.preventDefault();
  }

  searchCityHandler (cityData) {
    console.log('searchCityHandler', cityData);

    const lat = cityData.coord.lat;
    const lon = cityData.coord.lon;
    const city = cityData.name;
    const country = cityData.sys.country;

    searchCity(lat, lon, city, country, this.loadingDescriptionCallback)
        .then(data => {
          console.log('data', data);
          this.setState(() => ({
            location: data.location,
            weather: data.weather,
            airQuality: data.airQuality,
            loadingWeather: false,
            showCitiesListModal: false
          }));
        })
        .catch((error) => console.error('An Error Occured: ', error));

  }

  render() {

    let loadingUI = '';
    if(this.state.loadingWeather) {
      loadingUI = (<div className="loader-container">
        <div className="loader"/>
        <div className="loader-description">{this.state.loadingDescription}</div>
      </div>
      );
    }

    let weatherUI = '';
    let weatherUIClassName = 'weather-container';
    if ( this.state.showCitiesListModal ) {
      weatherUIClassName += ' slideUp'
    }
    if (!this.state.loadingWeather && this.state.weather !== undefined) {
      weatherUI = (
        <div className={weatherUIClassName}>
          <Weather location={this.state.location} 
            todayTemp={this.state.weather.current}
            dailyTemp={this.state.weather.daily}
            airQuality={this.state.airQuality} 
            searchLocationCallBack={this.searchLocationHandler}/>
          <WeekWeather data={this.state.weather.daily} weekDaySelected={this.state.weekDaySelected} onCardClick={(index) => this.setState({weekDaySelected: index})}/>
        </div>
      );
    }

    return (
      <div className="App">
        {loadingUI}
        {weatherUI}
        <CitiesList show={ this.state.showCitiesListModal } citiesList={this.state.citiesList} searchCity={this.searchCityHandler.bind(this)}/>
      </div>
    );
  }
}

export default App;
