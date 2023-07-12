import * as React from 'react';
import { YMaps, Map, AnyObject } from 'react-yandex-maps';

import '../styles/UserMap.css';

function UserMap(props: any) {

    let mapData = {
        center: [props.lat, props.long],
        zoom: 10,
      };

    return (
        
        <YMaps>         
            <div >                   
                <Map defaultState={ mapData } className={'map'}
                />
            </div>           
        </YMaps>
        

    )
};

 export default UserMap;