import React, { Component } from 'react';
import '../css/weekWeather.css';
import { getIcon } from '../helpers/openWeatherMap';
import { getWeekday } from '../helpers/datetime';

class WeekWeather extends Component {


    render() {

        let onWeekWeatherCardClick = ( event, weekDayIndex ) => {
            this.props.onCardClick(weekDayIndex);
        };

        let weekTemperatures = [];
        for( let weekDayIndex = 0; weekDayIndex < 5; weekDayIndex++ ) {
            let iconCode = getIcon(this.props.data[weekDayIndex].weather[0].icon);
            let date = new Date();
            date.setDate(date.getDate() + weekDayIndex);

            let className = "week-temp-container";
            if ( weekDayIndex === this.props.weekDaySelected ) {
                className += ' selected';
            }

            weekTemperatures.push(
                <div key={weekDayIndex} className={className} onClick={(e) => onWeekWeatherCardClick(e, weekDayIndex)}>
                    <span className="day-name">{getWeekday(date).substring(0, 3)}</span>
                    <div className="icon-container"><i className={`wi ${iconCode}`}/></div>
                    <div className="maxTemp">{this.props.data[weekDayIndex].temp.max}º</div>
                    <div className="minTemp">{this.props.data[weekDayIndex].temp.min}º</div>
                </div>);
        }

        return (
            <div className="weekWeather">
                <div className="weather-card">
                    {weekTemperatures}
                </div>
            </div>
        );
    }
}

export default WeekWeather;
