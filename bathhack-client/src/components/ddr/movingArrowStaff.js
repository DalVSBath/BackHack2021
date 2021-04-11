import React from 'react';
import { DownMoveArrow, LeftMoveArrow, RightMoveArrow, UpMoveArrow } from './movingArrow';

const arrowTypeToComponent = (viewRange, arrow, timestamp, cb) => {

    const interp = -(viewRange * (1-(arrow.timestamp - timestamp)));
    const style = `translate(0, clamp(${interp}vh, -200vh, 200vh))`;

    if(interp < -60) {
        cb(arrow);
    }

    const dict = {  
        "left" : <LeftMoveArrow style={{transform: style + " rotate(-90deg)", opacity: arrow.hit === null ? (interp > -10 ? "1" : "0.2") : "0.2" }}/>,
        "right": <RightMoveArrow style={{transform: style + " rotate(90deg)", opacity: arrow.hit === null ? (interp > -10 ? "1" : "0.2") : "0.2"}} />,
        "up": <UpMoveArrow style={{transform: style, opacity: arrow.hit === null ? (interp > -10 ? "1" : "0.2") : "0.2"}}/>,
        "down": <DownMoveArrow style={{transform: style + " rotate(180deg)", opacity: arrow.hit === null ? (interp > -10 ? "1" : "0.2") : "0.2"}}/>
    }

    return dict[arrow.type];

}

const MovingArrowStaff = ({viewRange, arrows, timestamp, cb}) => {

    return (
        <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw", overflow: "hidden"}}>
            {arrows.map(arrow => {
                return arrowTypeToComponent(viewRange, arrow, timestamp, cb);
            })}
        </div>
    );
}

export default MovingArrowStaff;