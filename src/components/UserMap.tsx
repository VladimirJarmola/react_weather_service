import * as React from 'react';
import { YMaps, Map, AnyObject } from 'react-yandex-maps';

function UserMap(props: any) {

    let mapData = {
        center: [props.lat, props.long],
        zoom: 10,
      };

    return (
        <YMaps>         
            <div>
                My awesome application with maps!                    
                <Map defaultState={ mapData } 
                />
            </div>           
        </YMaps>

    )
};

 export default UserMap;