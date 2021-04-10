import React from 'react';
import Arrow from "../../content/arrow.svg";
import "./arrowLayout.css";
import ArrowReact from './arrowReact';
import MovingArrowStaff from './movingArrowStaff';
import Score from './score';


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
                    <img src={Arrow} className="layout-arrow blue" alt="arrow" style={{WebkitTransform: "rotate(-90deg)"}}/>
                    <img src={Arrow} className="layout-arrow red" alt="arrow" style={{WebkitTransform: "rotate(180deg)"}}/>
                    <img src={Arrow} className="layout-arrow green" alt="arrow"/>
                    <img src={Arrow} className="layout-arrow yellow" alt="arrow" style={{WebkitTransform: "rotate(90deg)"}}/>
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