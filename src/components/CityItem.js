import React, { Component } from 'react';
import '../css/cityItem.css';
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';
import {getIcon} from "../helpers/openWeatherMap";

class CityItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const temp = Math.round(10*(this.props.data.main.temp -273.15))/10;
        const min_temp = Math.round(10*(this.props.data.main.temp_min -273.15))/10;
        const max_temp = Math.round(10*(this.props.data.main.temp_max -273.15))/10;

        let iconCode = getIcon(this.props.data.weather.icon);

        return (
            <div className={"city-item"} onClick={ () => this.props.searchCity( this.props.data ) }>
                <div className={"city-item-icon-container"}>
                    <i className={`wi ${iconCode}`}/>
                </div>
                <div className={"city-container"}>
                    <div  className={"city-name-container"}>
                        <p className={"city"}> {`${this.props.data.name}, ${this.props.data.sys.country}`} </p>
                    </div>
                    <p className={"coords"}> {`${this.props.data.coord.lat}, ${this.props.data.coord.lon}`} </p>
                </div>
                <div className={"temp-container"}>
                    <i className="wi wi-thermometer"/>
                    <div className={"temp"}>{`${temp}º`}</div>
                    <div className={"min-max-temp-container"}>
                        <div className={"max-temp"}>{`${max_temp}º`}</div>
                        <div className={"min-temp"}>{`${min_temp}º`}</div>
                    </div>
                </div>
                <div className={"info-container"}>

                   <div className={"wind"}> <i className={`wi wi-wind towards-${this.props.data.wind.deg}-deg`}/> {`${this.props.data.wind.speed}m/s`} </div>
                   <div className={"humidity"}> <i className="wi wi-raindrops"/> {`${this.props.data.main.humidity}%`} </div>
                </div>
            </div>
        );
    }
}

export default CityItem;
