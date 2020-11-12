import React, { Component } from 'react';
import '../css/weekWeather.css';
import { getIcon } from '../helpers/openWeatherMap';
import { getWeekday } from '../helpers/datetime';

class WeekWeather extends Component {


    render() { 

        let weekTemp = this.props.data.slice(1, 6).map( (currTemp, index) => {
            let iconCode = getIcon(currTemp.weather[0].icon);
            let date = new Date();
            date.setDate(date.getDate() + index + 1);

            return (<div key={index} className="week-temp-container"> 
                <span className="day-name">{getWeekday(date).substring(0, 3)}</span>
                <div className="icon-container"><i className={`wi ${iconCode}`}/></div>
                <div className="maxTemp">{currTemp.temp.max}º</div>
                <div className="minTemp">{currTemp.temp.min}º</div>
            </div>)
        });

        return (
            <div className="weekWeather">
                <div className="weather-card">
                    {weekTemp}
                </div>
            </div>
        );
    }
}

export default WeekWeather;
