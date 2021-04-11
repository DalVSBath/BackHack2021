import React, { useContext, useEffect, useState } from 'react';
import ArrowLayout from '../../components/ddr/arrowLayout';
import Player from '../../components/spotify/player';
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

const Creator = props => {
    const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;


    const REFRESH_INTERVAL = 10;
    const LIFE_THRESHOLD = 1000;

    const [timestamp, setTimestamp] = useState(0);
    const [firstTimestamp, setFirstTimeStamp] = useState(0);
    const [arrows, setArrows] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [playing, setPlaying] = useState(false);

    const context = useContext(SocketContext);
    
    const relativeTime = (t) => {
        return t - firstTimestamp; 
    }

    const purgeArrows = (arrows) => {
        let arr = [];
        for (let a of arrows) {
            if (a.timestamp - relativeTime(timestamp) >= -LIFE_THRESHOLD) {
                arr.push(a)
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
        if (arrow.garbage) {arrow.timestamp += relativeTime(timestamp);

        setArrows(arrows => {
          arrow.hit = null;
          let arr = []
          if(playing) {
            arr = purgeArrows(arrows);
            arr.push(arrow);
          }else {
            arr = arrows;
            arr.push(arrow);
          }
  
          console.log(arrows)
  
          return arr;
        });}
    };
    
    const arrowGenCallback = arrow => {
        //setTimestamp(timestamp); // todo replace with updated spotify timestamp
        
        setArrows(arrows => {
            let arr = purgeArrows(arrows);
            arr.push(arrow);

            return arr;
        });
    }

    useEffect(() => {
        context.SetMessageCallBack(arrowCallBack);
        context.rebindToCreator();
        const interval = setInterval(() => {
            if(playing) {
                setToggle(!toggle); // todo replace with updated spotify timestamp
                if (firstTimestamp === 0) setFirstTimeStamp(timestamp);
                //console.log(relativeTime(timestamp));
            }
        }, REFRESH_INTERVAL);
        return () => clearInterval(interval);
    }, [toggle, playing, firstTimestamp]);

    return (
        <>
            <Player TrackEnd={() => setArrows(null)} playing={playing} trackId={id} timeStamp={toggle} ready={s => {
                if(s) setTimestamp(s.timestamp);
                }} />
            <ArrowLayout creator incomingArrows={arrows} timestamp={relativeTime(timestamp)} arrowSelfGenCallback={arrowGenCallback} arrowUpdate={updateArrows} missedCallback={v => {if(playing) setArrows(v);}}/>
            {playing ? "" :
                <Countdown
                    date={Date.now() + 5000}
                    renderer={renderer}
                    onComplete={() => setPlaying(true)}
            />}
        </>
    )
}

export default Creator;