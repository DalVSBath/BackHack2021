import React, { useEffect, useState } from 'react';
import ArrowLayout from '../../components/ddr/arrowLayout';
import Player from '../../components/spotify/player';

const Creator = () => {

    const REFRESH_INTERVAL = 100;

    const [timestamp, setTimestamp] = useState(0);
    const [arrows, setArrows] = useState([]);
    
    const arrowGenCallback = arrow => {
        //setTimestamp(timestamp); // todo replace with updated spotify timestamp
        setArrows(arrows => [...arrows, arrow])
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(timestamp => timestamp + 1); // todo replace with updated spotify timestamp
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Player />
            <ArrowLayout creator incomingArrows={arrows} timestamp={timestamp} arrowSelfGenCallback={arrowGenCallback}/>
        </>
    )
}

export default Creator;