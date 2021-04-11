import React, {useState, useEffect} from 'react';
import "./arrowLayout.css";
import ArrowReact from './arrowReact';
import MovingArrowStaff from './movingArrowStaff';
import Score from './score';
import ScoreCategory from './scoreCatagory';


const ArrowLayout = ({creator, incomingArrows, timestamp, arrowSelfGenCallback, arrowUpdate, missedCallback}) => {

    const VIEW_RANGE = 1/20;
    const MISSED_INTERVAL = 500;
    const MISSED_SCORE = -800;
    const [score, setScore] = useState(0);
    const [mostRecentScore, setMostRecentScore] = useState(0);

    const addScore = (value) => { 
        setScore(s => s + value);
        setMostRecentScore(value);
    }

    const accountForMissed = (arrows) => {
        let arr = [];
        let interp;
        console.log("Interval 2 arr length " + arrows.length);
        for (let a of arrows) {
          interp = -(VIEW_RANGE * (1-(a.timestamp - timestamp)));
          if (a.hit == null && interp < -10)
          {
            addScore(MISSED_SCORE);
          }
          else {
            arr.push(a);
          }
        }
        return arr;
    } 

    useEffect(() => {
        if (missedCallback != null) {
            const interval = setInterval(() => {missedCallback(accountForMissed(incomingArrows))}, MISSED_INTERVAL);
            return () => clearInterval(interval);
        }
    }, [accountForMissed, incomingArrows, missedCallback])

    return (
        <>
            <div className="arrow-container">
                <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}>
                    <ArrowReact creator={creator} timestamp={timestamp} arrows={incomingArrows} addScore={addScore} arrowUpdate={arrowUpdate}
                        arrowSelfGenCallback={arrowSelfGenCallback == null ? () => {} : arrowSelfGenCallback}/>
                    
                    <Score count={score}/>
                    <ScoreCategory Score={mostRecentScore}  />
                </div>
                <MovingArrowStaff viewRange={VIEW_RANGE} arrows={incomingArrows} timestamp={timestamp}/>
            </div>
        </>
    );
}

export default ArrowLayout