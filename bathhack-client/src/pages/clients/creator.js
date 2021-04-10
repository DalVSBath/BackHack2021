import React, { useEffect, useState } from 'react';
import ArrowLayout from '../../components/ddr/arrowLayout';
import Player from '../../components/spotify/player';

const Creator = () => {

    const REFRESH_INTERVAL = 500;

    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(timestamp => timestamp + 1);
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* {console.log("the time is: " + timestamp)} */}
            <Player />
            <ArrowLayout creator timestamp={timestamp}/>
        </>
    )
}

export default Creator;