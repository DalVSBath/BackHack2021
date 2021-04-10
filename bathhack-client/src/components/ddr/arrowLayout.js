import React from 'react';
import Arrow from "../../content/arrow.svg";
import "./arrowLayout.css";
import ArrowReact from './arrowReact';

const ArrowLayout = ({incomingArrows, timestamp, creator}) => {

    const viewRange = 5;
    
    const classifyIncomingArrows = () => {

        if (incomingArrows != null) {
            let visible = [];
            let missed = [];
            for (let arrow of incomingArrows) {
                let diff = arrow.timestamp - timestamp;
                if (0 <= diff && diff <= viewRange) {
                    visible.push(arrow);
                } else if (diff < 0 && diff > -viewRange) {
                    missed.push(arrow);
                }
            }
            return {visible: visible, missed: missed};
        }
        return {visible: null, missed: null};
    }

    const arrows = classifyIncomingArrows();

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height:"100vh"}}>
            <img src={Arrow} className="layout-arrow blue" alt="arrow" style={{WebkitTransform: "rotate(-90deg)"}}/>
            <img src={Arrow} className="layout-arrow red" alt="arrow" style={{WebkitTransform: "rotate(180deg)"}}/>
            <img src={Arrow} className="layout-arrow green" alt="arrow"/>
            <img src={Arrow} className="layout-arrow yellow" alt="arrow" style={{WebkitTransform: "rotate(90deg)"}}/>
            <ArrowReact creator={creator} timestamp={timestamp} visible={arrows.visible} missed={arrows.missed}/>
        </div>
    );
}

export default ArrowLayout