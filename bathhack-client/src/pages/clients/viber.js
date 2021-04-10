import Player from '../../components/spotify/player';
import ArrowLayout from '../../components/ddr/arrowLayout';
import React, { useState } from 'react';
import Countdown from "react-countdown";

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

const Viber = () => {  
    const [playing, setPlaying] = useState(false);

    const arrowGenCallback = arrows => {

    }

    return (
        <>
            <Countdown
                date={Date.now() + 10000}
                renderer={renderer}
                onComplete={() => console.log("done")}
            />
            <Player playing={playing} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} />
        </>
    )
}

export default Viber;