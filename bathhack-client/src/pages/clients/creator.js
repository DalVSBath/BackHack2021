import React, { useEffect, useState } from 'react';
import ArrowLayout from '../../components/ddr/arrowLayout';
import Player from '../../components/spotify/player';

const Creator = () => {

    const REFRESH_INTERVAL = 10;
    const LIFE_THRESHOLD = 20;

    const [timestamp, setTimestamp] = useState(0);
    const [arrows, setArrows] = useState([]);
    
    const arrowGenCallback = arrow => {
        //setTimestamp(timestamp); // todo replace with updated spotify timestamp
        
        setArrows(arrows => {

            let arr = [];
            for (let a of arrows) {
                if (a.timestamp - timestamp >= -LIFE_THRESHOLD) {
                    arr.push(a)
                }
            }
            arr.push(arrow);

            return arr;
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp(timestamp => timestamp + 1); // todo replace with updated spotify timestamp
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Player playing={true} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} />
            <ArrowLayout creator incomingArrows={arrows} timestamp={timestamp} arrowSelfGenCallback={arrowGenCallback}/>
        </>
    )
}

export default Creator;