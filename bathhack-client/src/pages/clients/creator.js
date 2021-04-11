import React, { useEffect, useState } from 'react';
import ArrowLayout from '../../components/ddr/arrowLayout';
import Player from '../../components/spotify/player';
import Countdown from "react-countdown";
import qs from "qs";

const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      //return <Completionist />;
      return ""
    } else {
      // Render a countdown
      return <span className="Counter" style={{fontWeight: "800", fontSize:"80px",position:"absolute"}}>{seconds}</span>;
    }
  };

const Creator = props => {
    const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;


    const REFRESH_INTERVAL = 10;
    const LIFE_THRESHOLD = 2000;

    const [timestamp, setTimestamp] = useState(0);
    const [arrows, setArrows] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [playing, setPlaying] = useState(false);

    const purgeArrows = (arrows) => {
        let arr = [];
        for (let a of arrows) {
            if (a.timestamp - timestamp >= -LIFE_THRESHOLD) {
                arr.push(a)
            }
        }
        return arr;
    }
    
    const arrowGenCallback = arrow => {
        //setTimestamp(timestamp); // todo replace with updated spotify timestamp
        
        setArrows(arrows => {
            let arr = purgeArrows(arrows);
            arr.push(arrow);

            return arr;
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(playing)
                setToggle(!toggle); // todo replace with updated spotify timestamp
            console.log(timestamp);
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [toggle]);

    return (
        <>      
            <Countdown
                date={Date.now() + 5}
                renderer={renderer}
                onComplete={() => setPlaying(true)}
            />
            <Player playing={playing} trackId={id} timeStamp={toggle} ready={s => {if(s) setTimestamp(s.timestamp);}} />
            <ArrowLayout creator incomingArrows={arrows} timestamp={timestamp} arrowSelfGenCallback={arrowGenCallback}/>
        </>
    )
}

export default Creator;