import React, { Component } from 'react';
import '../css/citiesList.css';
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';
import CityItem from "../components/CityItem";

class CitiesList extends Component {

    render() {
        let mainClassName = 'cities';
        if ( this.props.show ) {
            mainClassName += ' visible';
        }

        return (
            <div className={mainClassName}>
                <h4 className={'search-city-label'}>Search City</h4>
                <span className={'search-city-description'}>( click on a city to select it )</span>
                { this.props.citiesList.map( ( city, index ) =>
                    <CityItem key={index} data={city} searchCity={this.props.searchCity}/> )
                }
            </div>
        );
    }
}

export default CitiesList;
