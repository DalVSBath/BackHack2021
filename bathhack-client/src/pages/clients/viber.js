import Player from '../../components/spotify/player';
import ArrowLayout from '../../components/ddr/arrowLayout';
import React, { useState } from 'react';
import Countdown from "react-countdown";

const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      //return <Completionist />;
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };

const Viber = () => {  
    const [playing, setPlaying] = useState(false);

    const arrowGenCallback = arrows => {

    }

    return (
        <>
            <Countdown
                date={Date.now() + 5000}
                renderer={renderer}
                onComplete={() => console.log("done")}
            />
            <Player playing={playing} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} />
            <ArrowLayout />        
        </>
    )
}

export default Viber;