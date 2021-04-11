import Player from '../../components/spotify/player';
import ArrowLayout from '../../components/ddr/arrowLayout';
import React, { useState, useContext, useEffect } from 'react';
import Countdown from "react-countdown";
import qs from "qs";
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

const Viber = props => {  
    const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
    const relativeTime = (t) => {
        return t - firstTimestamp; 
    }

    const thing = Date.now(); 

    const REFRESH_INTERVAL = 10;
    const LIFE_THRESHOLD = 1000;

    const [playing, setPlaying] = useState(false);
    const [firstTimestamp, setFirstTimeStamp] = useState(0);
    const [arrows, setArrows] = useState([]);
    const [timestamp, setTimestamp] = useState(0);
    const [toggle, setToggle] = useState(false);

    const context = useContext(SocketContext);
    

    //maybe some validation needed here

    const purgeArrows = (arrows) => {
      let arr = [];
      for (let a of arrows) {
          if (a.timestamp - relativeTime(timestamp) >= -LIFE_THRESHOLD) {
              if (a.hit == null || a.hit == false) {
                arr.push(a)
              }
          } 
          else {

          }
      }
      return arr;
    }

    const updateArrows = (index, state) => {
      setArrows(arrows => {
        arrows[index].hit = state;
        let arr = purgeArrows(arrows);
        //console.log(arrows)

        return arr;
      });

    }

    const arrowCallBack = arrow => {
      setArrows(arrows => {
        arrow.hit = null;
        let arr = purgeArrows(arrows);
        arr.push(arrow);

        console.log(arrows)

        return arr;
      });
    };

    useEffect(() => {
      context.SetMessageCallBack(arrowCallBack);
      context.rebindToViber();
      const interval = setInterval(() => {
        if(playing) {
            setToggle(!toggle); // todo replace with updated spotify timestamp
            if (firstTimestamp === 0) setFirstTimeStamp(timestamp);
            

            //console.log(relativeTime(timestamp));
        }
      }, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    },[toggle, playing, firstTimestamp])

    return (
        <>
            <ArrowLayout incomingArrows={arrows} timestamp={relativeTime(timestamp)} arrowUpdate={updateArrows} missedCallback={v => {if(playing) setArrows(v);}}/>
            {playing ? "" :
            <Countdown
                date={thing + 8000}
                renderer={renderer}
                onComplete={() => setPlaying(true)}
            />}
            {/* <Player playing={playing} trackId="6730LysZdBvgjo5MgWo4Tm" ready={() => console.log("Ready")} /> */}
            <Player playing={playing} trackId={id} timeStamp={toggle} ready={s => {
                if(s) setTimestamp(s.timestamp);
                }} />
        </>
    )
}

export default Viber;