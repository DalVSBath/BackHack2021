import React from 'react';
import { DownMoveArrow, LeftMoveArrow, RightMoveArrow, UpMoveArrow } from './movingArrow';

const arrowTypeToComponent = (viewRange, arrow, timestamp) => {

    const style = `translate(0, ${-(viewRange * (1-(arrow.timestamp - timestamp)))}vh)`;

    const dict = {  
        "left" : <LeftMoveArrow style={{transform: style + " rotate(-90deg)"}}/>,
        "right": <RightMoveArrow style={{transform: style + " rotate(90deg)"}} />,
        "up": <UpMoveArrow style={{transform: style}}/>,
        "down": <DownMoveArrow style={{transform: style + " rotate(180deg)"}}/>
    }

    return dict[arrow.type];

}


const MovingArrowStaff = ({viewRange, arrows, timestamp}) => {

    {console.log(arrows)}
    return (
        <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw", overflow: "hidden"}}>
            {arrows.map(arrow => {
                return arrowTypeToComponent(viewRange, arrow, timestamp);
            })}
        </div>
    );
}

export default MovingArrowStaff;