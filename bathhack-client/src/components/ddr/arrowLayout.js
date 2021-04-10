import React from 'react';
import "./arrowLayout.css";
import ArrowReact from './arrowReact';
import MovingArrowStaff from './movingArrowStaff';
import Score from './score';
import Hollow from '../../content/arrowHit.svg'


const ArrowLayout = ({incomingArrows, timestamp, arrowSelfGenCallback}) => {

    const VIEW_RANGE = 5;
    
    const classifyIncomingArrows = () => {

        if (incomingArrows != null) {
            let visible = [];
            let missed = [];
            for (let arrow of incomingArrows) {
                let diff = arrow.timestamp - timestamp;
                if (0 <= diff && diff <= VIEW_RANGE) {
                    visible.push(arrow);
                } else if (diff < 0 && diff > -VIEW_RANGE) {
                    missed.push(arrow);
                }
            }
            return {visible: visible, missed: missed};
        }
        return {visible: null, missed: null};
    }

    const arrows = classifyIncomingArrows();

    return (
        <>
            <div className="arrow-container">
                <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}>
                    <ArrowReact timestamp={timestamp} visible={arrows.visible} missed={arrows.missed}
                        arrowSelfGenCallback={arrowSelfGenCallback == null ? () => {} : arrowSelfGenCallback}/>

                    <Score />
                </div>
                <MovingArrowStaff viewRange={VIEW_RANGE} arrows={incomingArrows} timestamp={timestamp}/>
            </div>
        </>
    );
}

export default ArrowLayout