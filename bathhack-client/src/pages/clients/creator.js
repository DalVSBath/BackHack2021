import ArrowLayout from '../../components/ddr/arrowLayout';
import React, {useState} from 'react';
import Player from '../../components/spotify/player';

const Creator = () => {

    const [timestamp, setTimestamp] = useState(0);

    return (
        <>
            <Player />
            <ArrowLayout creator timestamp={5}/>
        </>
    )
}

export default Creator;