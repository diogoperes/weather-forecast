import React, { Component } from 'react';
import '../css/weather.css';
import {getPrettyDate, getWeekday} from '../helpers/datetime';
import {getIcon} from '../helpers/openWeatherMap';
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';
import { getAirQualityInfoByIndex } from '../helpers/airQuality';

class Weather extends Component {

  constructor(props) {
    super(props);
    this.state = { locationSearchValue: '' };

    this.handleLocationChange = this._handleLocationChange.bind(this);
    this.onClickAirQuality = this.onClickAirQuality.bind(this);
  }

  _handleLocationChange(event) {
    this.setState({ locationSearchValue: event.target.value });
  }

  onClickAirQuality( event ) {
    event.preventDefault();
    // https://waqi.info/pt/#/c/37.969/-8.828/13.8z
    window.open(this.props.airQuality.city.url, "_blank")
  }

  render() {
    let date = new Date();
    if ( this.props.weekDaySelected > 0 ) {
      date.setDate( date.getDate() + this.props.weekDaySelected );
    }

    let iconCode = getIcon(this.props.dailyTemp[this.props.weekDaySelected].weather[0].icon);

    let airQuality = {};
    let valueToUse = this.props.airQuality.dominentpol;

      if( this.props.airQuality ) {
        if ( this.props.airQuality.iaqi[valueToUse] && this.props.airQuality.iaqi[valueToUse].v ) {
          airQuality = getAirQualityInfoByIndex(this.props.airQuality.iaqi[valueToUse].v);
        } else if ( this.props.airQuality.iaqi.pm25 && this.props.airQuality.iaqi.pm25.v ) {
          airQuality = getAirQualityInfoByIndex(this.props.airQuality.iaqi.pm25.v);
        } else if ( this.props.airQuality.forecast.daily.pm25[0].avg ) {
          airQuality = getAirQualityInfoByIndex(this.props.airQuality.forecast.daily.pm25[0].avg);
        } else {
          airQuality.label = 'n/a';
          airQuality.color = '#b5b5b5';
          airQuality.value = 'n/a';
        }
      }

    let airQualityUI = null;
    if ( this.props.weekDaySelected === 0 ) {
      airQualityUI = <div className="container air-quality" onClick={this.onClickAirQuality}>
        <i className="wi wi-smoke"/>
        <div className="data">
          <p>{airQuality.label} ({airQuality.value})</p>
          <p>Air Quality<i className="ball" style={{ "background": airQuality.color }} /></p>
        </div>
      </div>;
    }

    return (
      <div className="today-temp-container">
        <div className="weather-card">
          <div className="date-container">
            <div className="location-container">
              <span className="location">{this.props.location.city}, {this.props.location.country}</span>
              <form onSubmit={(event) => this.props.searchLocationCallBack(event, this.state.locationSearchValue)}>
                <input type="text" placeholder="City Name" onChange={this.handleLocationChange} minLength={3}/>
                <button type="submit">Search</button>
              </form>
            </div>

            <div className="dates">
              <span className="date-dayname">{getWeekday(date)}</span>
              <span className="date-day">{getPrettyDate(date)}</span>
            </div>


          </div>
          <div className="temperature-icon-container">
            <div className="icon-container">
              {/* {iconCode} */}
              <i className={`wi ${iconCode}`}/>
            </div>
            <div className="temperatures-container">
              { this.props.weekDaySelected === 0
                  ? <h1 className="current-temperature">{this.props.todayTemp.temp}º</h1>
                  : <h1 className="current-temperature">--.--</h1>}
              <div className="min-max-temperatures">
                <div className="min-temperature">
                  <h5>{ this.props.dailyTemp[this.props.weekDaySelected].temp.min }º</h5>
                </div>
                <div className="max-temperature">
                  <h5>{ this.props.dailyTemp[this.props.weekDaySelected].temp.max }º</h5>
                </div>
              </div>
            </div>
          </div>
          
          <div className="weather-data-container">
            <div className="container wind">
              <i className={`wi wi-wind towards-${this.props.dailyTemp[this.props.weekDaySelected].wind_deg}-deg`}/>
              <div className="data">
                <p>{this.props.dailyTemp[this.props.weekDaySelected].wind_speed}m/s</p>
                <p>wind</p>
              </div>
            </div>
            {airQualityUI}
            <div className="container humidity">
              <i className="wi wi-raindrops"/>
              <div className="data">
                <p>{this.props.dailyTemp[this.props.weekDaySelected].humidity}%</p>
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
