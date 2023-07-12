import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import DailyWeatherForecast from './DailyWeatherForecast';


function WeatherForecast(props: any) {
    let [forecastWeatherList, setForecastWeatherList] = useState<Array<object>>();

    let timeNow = Math.ceil(Date.now()/1000); //текущее время в секундах

    interface mainType {
        temp: number,
        pressure: number,
        humidity: number
    };

    interface resContainer {
       main: mainType,
       weather: Array<any>,
       dt: number
    };

    function getSecondsToNextDay(nextDay: number) {
        let now = new Date();
      
        // завтрашняя дата
        let tomorrow: any = new Date(now.getFullYear(), now.getMonth(), now.getDate() + nextDay );
      
        return Math.round(tomorrow / 1000); // преобразуем в секунды
      }
    
    if (props.lat&&props.long) {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast`, 
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
            let requiredFields = res.data.list.map(({main, weather, dt}: resContainer) => ({
                'dt': dt,
                'temp': main.temp,
                'pressure': main.pressure,
                'humidity': main.humidity,
                'weather': weather[0].description
            }));                  
            
            setForecastWeatherList(requiredFields);
            
        })
        .catch(error => {
            console.log(error);
        })
    } else {console.log("not data")};

    if (!forecastWeatherList) {
        return (
            <div><p>Loading...</p></div>
        )
    } else {
        return (
            <>
                <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>

                    <Tab eventKey="Today" title="Today">
                        <Table striped bordered hover className={"forecast"}>
                            <thead><tr><th>Date</th><th>Temperature</th><th>Pressure</th><th>Humidity</th><th>Weather</th></tr></thead>
                            <tbody>
                                {forecastWeatherList.filter((elem: any) => elem.dt < getSecondsToNextDay(1))
                                .map((elem: any) =>                        
                                    <DailyWeatherForecast key={elem.dt} 
                                        date = {elem.dt}
                                        temp = {elem.temp}
                                        pressure = {elem.pressure} 
                                        humidity = {elem.humidity}
                                        weather = {elem.weather}
                                    /> 
                                )}
                            </tbody>            
                        </Table>
                    </Tab>

                    <Tab eventKey="Tomorrow" title="Tomorrow">
                        <Table striped bordered hover className={"forecast"}>
                            <thead><tr><th>Date</th><th>Temperature</th><th>Pressure</th><th>Humidity</th><th>Weather</th></tr></thead>
                            <tbody>
                                {forecastWeatherList.filter((elem: any) => elem.dt > getSecondsToNextDay(1)&&elem.dt < getSecondsToNextDay(2))
                                .map((elem: any) =>                        
                                    <DailyWeatherForecast key={elem.dt} 
                                        date = {elem.dt}
                                        temp = {elem.temp}
                                        pressure = {elem.pressure} 
                                        humidity = {elem.humidity}
                                        weather = {elem.weather}
                                    />
                                )}
                            </tbody>            
                        </Table>
                    </Tab>

                    <Tab eventKey="After Tomorrow" title="After Tomorrow">
                        <Table striped bordered hover className={"forecast"}>
                            <thead><tr><th>Date</th><th>Temperature</th><th>Pressure</th><th>Humidity</th><th>Weather</th></tr></thead>
                            <tbody>
                                {forecastWeatherList.filter((elem: any) => elem.dt > getSecondsToNextDay(2)&&elem.dt < getSecondsToNextDay(3))
                                .map((elem: any) =>                        
                                    <DailyWeatherForecast key={elem.dt} 
                                        date = {elem.dt}
                                        temp = {elem.temp}
                                        pressure = {elem.pressure} 
                                        humidity = {elem.humidity}
                                        weather = {elem.weather}
                                    />  
                                )}
                            </tbody>            
                        </Table>
                    </Tab>

                    <Tab eventKey="After After Tomorrow" title="After After Tomorrow">
                        <Table striped bordered hover className={"forecast"}>
                            <thead><tr><th>Date</th><th>Temperature</th><th>Pressure</th><th>Humidity</th><th>Weather</th></tr></thead>
                            <tbody>
                                {forecastWeatherList.filter((elem: any) => elem.dt > getSecondsToNextDay(3)&&elem.dt < getSecondsToNextDay(4))
                                .map((elem: any) =>                        
                                    <DailyWeatherForecast key={elem.dt} 
                                        date = {elem.dt}
                                        temp = {elem.temp}
                                        pressure = {elem.pressure} 
                                        humidity = {elem.humidity}
                                        weather = {elem.weather}
                                    />  
                                )}
                            </tbody>            
                        </Table>
                    </Tab>

                    <Tab eventKey="After After After Tomorrow" title="After After After Tomorrow">
                        <Table striped bordered hover className={"forecast"}>
                            <thead><tr><th>Date</th><th>Temperature</th><th>Pressure</th><th>Humidity</th><th>Weather</th></tr></thead> 
                            <tbody>
                                {forecastWeatherList.filter((elem: any) => elem.dt > getSecondsToNextDay(4)&&elem.dt < getSecondsToNextDay(5))
                                .map((elem: any) =>                        
                                    <DailyWeatherForecast key={elem.dt} 
                                        date = {elem.dt}
                                        temp = {elem.temp}
                                        pressure = {elem.pressure} 
                                        humidity = {elem.humidity}
                                        weather = {elem.weather}
                                    /> 
                                )}
                            </tbody>            
                        </Table>
                    </Tab>

                </Tabs>
             
            </>
    
        )
    }

};

export default WeatherForecast;
