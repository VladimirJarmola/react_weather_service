import * as React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import UserMap from './UserMap';
import WeatherNow from './WeatherNow';
import WeatherForecast from './WeatherForecast';

import cityDate from '../../city.json';

import '../styles/Main.css';

import { AnyObject } from 'react-yandex-maps';

function Main() {
    let [initlatitude, setLatitude] = useState<number>(); // переменные координаты города и функция их меняющая
    let [initlongitude, setLongitude] = useState<number>();
    let [errorPosition, setErrorPosition] = useState<string>();
    let [userChange, setUserChange] = useState<boolean>(false); //триггер на ручной выбор города
    
    let userCityId: number; // выбранный вручную город
    let [userlatitude, setUserlatitude] = useState<number>();
    let [userlongitude, setUserlogitude] = useState<number>(); // коородинаты выбранного города

    const cityList = cityDate.map(({name}, index) => ({
        'index': index,
        'name': name
    })); //получим список городов    

    // Функции вычисления геопзиции пользователя
    function getUserPosition() {
        navigator.geolocation.getCurrentPosition(Success, Error);
    };

    function Success(position: AnyObject) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    function Error(error: AnyObject) {
      console.log('Информация о местоположении недоступна');
      setErrorPosition(error.message);
      console.log(errorPosition);
    };

    if (!navigator.geolocation) {
        setErrorPosition('Информация о местоположении недоступна');
    } else {
        getUserPosition()
    };

    // обработчик выбора города
    let handleClick = (e: AnyObject) => {
        cityList.map(({index, name}) => {
            if (name === e.target.textContent) {
                userCityId = index;
            }
        });
        setUserlatitude(cityDate[userCityId].coord.lat);
        setUserlogitude(cityDate[userCityId].coord.lon);
        
        setUserChange(true);
    }

    return (
        <>
            <main>
                <div><p>Your coordinates: {initlatitude} {initlongitude} </p></div>

                <DropdownButton id="dropdown-basic-button" title="Choose city" >
                    {cityList.map(city => 
                        <Dropdown.Item href={ "#/action-" + city.index } key={city.index} 
                        onClick={(e) => handleClick(e)}>            
                            { city.name }
                        </Dropdown.Item>
                    )}
                </DropdownButton>

                {!userChange ?     
                    <WeatherNow 
                        lat = {initlatitude}
                        long = {initlongitude}
                    /> :
                    <WeatherNow 
                        lat = {userlatitude}
                        long = {userlongitude}
                    />
                }

                {!userChange ? 
                    <WeatherForecast 
                        lat = {initlatitude}
                        long = {initlongitude}
                    /> :
                    <WeatherForecast 
                        lat = {userlatitude}
                        long = {userlongitude}
                    />
                }

                {!userChange ? 
                    <UserMap                    
                        lat = {initlatitude}
                        long = {initlongitude}
                    /> :
                    <UserMap 
                        lat = {userlatitude}
                        long = {userlongitude}
                    /> }        
            </main>
        </>
        
    )
};

export default Main;