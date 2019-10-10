import React, { Component } from 'react';
import '../css/weather.css';
import {getWeekday} from '../helpers/datetime';
import {getIcon} from '../helpers/openWeatherMap';
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';
import { getAirQualityInfoByIndex } from '../helpers/airQuality';

class Weather extends Component {

  // constructor(props) {
  //   super(props);
  // }


  render() {
    let iconCode = getIcon(this.props.todayTemp.weather.icon);
    let airQuality = getAirQualityInfoByIndex(this.props.airQuality.iaqi.pm25.v);

    return (
      <div className="today-temp-container">
        <div className="weather-card">
          <div className="date-container">
            <span className="location">{this.props.location.city}, {this.props.location.country}</span>

            <div className="dates">
              <span className="date-dayname">{getWeekday()}</span><span className="date-day">15 Jan 2019</span>
            </div>


          </div>
          <div className="temperature-icon-container">
            <div className="icon-container">
              {/* {iconCode} */}
              <i className={`wi ${iconCode}`}></i>
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
              <i className={`wi wi-wind towards-${this.props.todayTemp.wind.deg}-deg`}></i>
              <div className="data">
                <p>{this.props.todayTemp.wind.speed}m/s</p>
                <p>wind</p>
              </div>
            </div>
            <div className="container air-quality">
              <i className="wi wi-smoke"></i>
              <div className="data">
                <p>{airQuality.label} ({this.props.airQuality.iaqi.pm25.v})</p>
                <p>Air Quality<i className="ball" style={{ "background": airQuality.color }} /></p>
              </div>
            </div>
            <div className="container humidity">
              <i className="wi wi-raindrops"></i>
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
