import React from 'react';
import { DownMoveArrow, LeftMoveArrow, RightMoveArrow, UpMoveArrow } from './movingArrow';

const arrowTypeToComponent = (viewRange, arrow, timestamp) => {

    const style = `translate(0, ${-(viewRange * (1-(arrow.timestamp - timestamp)))}vh)`;

    const dict = {  
        "left" : <LeftMoveArrow style={{transform: "rotate(-90deg) " + style}}/>,
        "right": <RightMoveArrow style={{transform: "rotate(90deg) " + style}} />,
        "up": <UpMoveArrow style={{transform: style}}/>,
        "down": <DownMoveArrow style={{transform: "rotate(180deg) " + style}}/>
    }

    console.log(dict[arrow.type].style);

    return dict[arrow.type];

}


const MovingArrowStaff = ({viewRange, arrows, timestamp}) => {

    {console.log(arrows)}
    return (
        <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}>
            {arrows.map(arrow => {
                return arrowTypeToComponent(viewRange, arrow, timestamp);
            })}
        </div>
    );
}

export default MovingArrowStaff;