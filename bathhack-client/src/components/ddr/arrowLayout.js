import React, {useState, useContext, useCallback} from 'react';
import { Redirect } from 'react-router';
import "./arrowLayout.css";
import ArrowReact from './arrowReact';
import { UpMoveArrow } from './movingArrow';
import MovingArrowStaff from './movingArrowStaff';
import Score from './score';
import ScoreCategory from './scoreCatagory';
import { SocketContext } from "../../App";


const ArrowLayout = ({creator, incomingArrows, timestamp, arrowSelfGenCallback, arrowUpdate, missedCallback}) => {

    const VIEW_RANGE = 1/20;
    const MISSED_INTERVAL = 500;
    const MISSED_SCORE = -800;
    const [score, setScore] = useState(0);
    const [mostRecentScore, setMostRecentScore] = useState(0);
    const [end, setEnd] = useState(false)

    const context = useContext(SocketContext);

    const addScore = (value) => { 
        setScore(s => s + value);
        setMostRecentScore(value);
        if (!creator) generateGarbage(value);
    }

    const generateGarbage = (value) => {

        const nGarbage = Math.floor(value/2000 + Math.random(0, 3 * value/2000));
    
        const OFFSET_RANGE = {min: 1000, max: 1500};
        let offset = 0;
        let type;

        const getType = (n) => 
        {
            switch (n) {
                case 0:
                    return "left";
                case 1:
                    return "up";
                case 2:
                    return "down";
                default:
                    return "right";
            }
        }

        for (let i = 0; i < nGarbage; i++) {
            offset += Math.floor(OFFSET_RANGE.min + Math.random() * (OFFSET_RANGE.max - OFFSET_RANGE.min))
            type = getType(Math.floor(Math.random(i) * 4));
            context.send({type: type, timestamp: offset, garbage: true});
        }
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

    const accountForArrow = arrow => {
        if((creator && arrow.garbage) || !creator) {
        if(missedCallback) {
            let arr = [];
            //console.log("Interval 2 arr length " + arrows.length);
            for (let a of incomingArrows) {
                if(a.timestamp == arrow.timestamp && a.type == arrow.type)
                {
                    addScore(MISSED_SCORE);
                }
                else {
                    arr.push(a);
                }
            }
            missedCallback(arr);
            }
        }
    }

    /*const cb = useCallback(() =>{
        if (missedCallback != null) {
        const interval = setInterval(() => {missedCallback(accountForMissed(incomingArrows));}, MISSED_INTERVAL);
        return () => clearInterval(interval);
    }
}, [accountForMissed, incomingArrows, missedCallback]);*/

    if(incomingArrows === null)
        return <Redirect to={"/complete?score=" + score} />

    return (
        <>
            <div className="arrow-container">
                <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}>
                    <ArrowReact creator={creator} timestamp={timestamp} arrows={incomingArrows} addScore={addScore} arrowUpdate={arrowUpdate}
                        arrowSelfGenCallback={arrowSelfGenCallback == null ? () => {} : arrowSelfGenCallback}/>
                    
                    <Score count={score}/>
                    <ScoreCategory Score={mostRecentScore}  />
                </div>
                <MovingArrowStaff viewRange={VIEW_RANGE} arrows={incomingArrows} timestamp={timestamp} cb={accountForArrow}/>
            </div>
        </>
    );
}

export default ArrowLayout