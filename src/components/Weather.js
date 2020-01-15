import React, { Component } from 'react';
import '../css/weather.css';
import {getWeekday} from '../helpers/datetime';
import {getIcon} from '../helpers/openWeatherMap';
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';
import { getAirQualityInfoByIndex } from '../helpers/airQuality';

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = { locationSearchValue: '' };

    this.handleLocationChange = this._handleLocationChange.bind(this);
  }

  _handleLocationChange(event) {
    this.setState({ locationSearchValue: event.target.value });
  }


  render() {
    let iconCode = getIcon(this.props.todayTemp.weather.icon);

    let airQuality = {};
    try {
      airQuality = getAirQualityInfoByIndex(this.props.airQuality.iaqi.pm25.v);
    }
    catch (e) { // non-standard
      console.error( 'Cannot read airQuality pm25 value. Error description: ', e );
      airQuality.label = 'n/a';
      airQuality.color = '#b5b5b5';
      airQuality.value = 'n/a';
    }

    return (
      <div className="today-temp-container">
        <div className="weather-card">
          <div className="date-container">
            <div className="location-container">
              <span className="location">{this.props.location.city}, {this.props.location.country}</span>
              <form onSubmit={(event) => this.props.searchLocationCallBack(event, this.state.locationSearchValue)}>
                <input type="text" placeholder="City Name" onChange={this.handleLocationChange}/>
                <button type="submit">Search</button>
              </form>
            </div>

            <div className="dates">
              <span className="date-dayname">{getWeekday()}</span><span className="date-day">15 Jan 2019</span>
            </div>


          </div>
          <div className="temperature-icon-container">
            <div className="icon-container">
              {/* {iconCode} */}
              <i className={`wi ${iconCode}`}/>
            </div>
            <div className="temperatures-container">
              <h1 className="current-temperature">{this.props.todayTemp.temp}º</h1>
              <div className="min-max-temperatures">
                <div className="min-temperature">
                  <h5>{this.props.todayTemp.tempMin}º</h5>
                </div>
                <div className="max-temperature">
                  <h5>{this.props.todayTemp.tempMax}º</h5>
                </div>
              </div>
            </div>
          </div>
          
          <div className="weather-data-container">
            <div className="container wind">
              <i className={`wi wi-wind towards-${this.props.todayTemp.wind.deg}-deg`}/>
              <div className="data">
                <p>{this.props.todayTemp.wind.speed}m/s</p>
                <p>wind</p>
              </div>
            </div>
            <div className="container air-quality">
              <i className="wi wi-smoke"/>
              <div className="data">
                <p>{airQuality.label} ({airQuality.value})</p>
                <p>Air Quality<i className="ball" style={{ "background": airQuality.color }} /></p>
              </div>
            </div>
            <div className="container humidity">
              <i className="wi wi-raindrops"/>
              <div className="data">
                <p>{this.props.todayTemp.humidity}%</p>
                <p>humidity</p>
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default Weather;
