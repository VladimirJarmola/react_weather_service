import * as React from 'react';
import { useState } from 'react';

function DailyWeatherForecast(props: any) {

    function normalizeValue(value: number) {
        return value.toString().length > 1 ? value : `0${value}`;
      }

    function timeConverter(UNIX_timestamp: number) {
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = normalizeValue(a.getHours());
        let min = normalizeValue(a.getMinutes());
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
        return time;
      }

    return (
        
            <tr>
                <td>{timeConverter(props.date)}</td>
                <td>{props.temp}</td>
                <td>{props.pressure}</td>
                <td>{props.humidity}</td>
                <td>{props.weather}</td>              
            </tr>
        

    )
};

export default DailyWeatherForecast;
