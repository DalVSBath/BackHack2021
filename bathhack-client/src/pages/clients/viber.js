import Player from '../../components/spotify/player';
import ArrowLayout from '../../components/ddr/arrowLayout';
import React, { useState, useContext } from 'react';
import Countdown from "react-countdown";
import { SocketContext } from '../../App';


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

    const REFRESH_INTERVAL = 10;
    const LIFE_THRESHOLD = 20000;

    const [playing, setPlaying] = useState(false);
    const [arrows, setArrows] = useState([]);
    const [timestamp, setTimestamp] = useState(0);

    const contextType = useContext(SocketContext);

    //maybe some validation needed here

    const purgeArrows = (arrows) => {
      let arr = [];
      for (let a of arrows) {
          if (a.timestamp - timestamp >= -LIFE_THRESHOLD) {
              if (!a.hit) {
                arr.push(a)
              }
              else if (a.hit == null) {
                a.hit = false;
              }
          } 
          else {

          }
      }
      return arr;
    }

    contextType.AddMessageCallback(arrow => {
      setArrows(arrows => {
        let arr = purgeArrows(arrows);
        arr.push(arrow);

        return arr;
      });
    });

    const arrowGenCallback = arrows => {

    };

    return (
        <>
            <ArrowLayout incomingArrows={arrows}/>        
            <Countdown
                date={Date.now() + 10000}
                renderer={renderer}
                onComplete={() => console.log("done")}
            />
            {/* <Player playing={playing} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} /> */}
            <Player playing={playing} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} />
        </>
    )
}

export default Viber;