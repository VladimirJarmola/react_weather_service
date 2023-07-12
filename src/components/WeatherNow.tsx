import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

import ListGroup from 'react-bootstrap/ListGroup';


function WeatherNow(props: any) {

    let [currentWeather, setCurrentWeather] = useState<any>();

    if (props.lat&&props.long) {
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, 
        {
            params: {
                lat: props.lat,
                lon: props.long,
                appid: process.env.REACT_APP_API_OPENWEATHERMAP,
                mode: 'json',
                units: 'metric',
                lang: 'ru'
            }
        })
        .then(res => {
            setCurrentWeather(res.data);
            
        })
        .catch(error => {
            console.log(error);
        })
    } else {console.log("not data")}
    
    return (
        <>
            <div>Current Weather</div>
            {currentWeather ? 
            <ListGroup>
                <ListGroup.Item>Ваш город: { currentWeather.name }</ListGroup.Item>
                <ListGroup.Item>Температура: { currentWeather.main.temp }</ListGroup.Item>
                <ListGroup.Item>Ветер: { currentWeather.wind.speed }</ListGroup.Item>
                <ListGroup.Item>Давление: { currentWeather.main.pressure }</ListGroup.Item>
                <ListGroup.Item>Влажность: { currentWeather.main.humidity }</ListGroup.Item>
                <ListGroup.Item>Облачность: { currentWeather.weather[0].description }</ListGroup.Item>
            </ListGroup> :
            <div>Loading...</div>}
        </>
    )
}

export default WeatherNow;