import React from 'react';
import Arrow from '../../content/arrow.svg';

const LeftMoveArrow = ({style}) => {
    return (
        <img src={Arrow} className="move-arrow left blue" alt="arrow" style={style}/>
    )
}

const RightMoveArrow = ({style}) => {
    return (
        <img src={Arrow} className="move-arrow right yellow" alt="arrow" style={style}/>
    )
}

const UpMoveArrow = ({style}) => {
    return (
        <img src={Arrow} className="move-arrow up green" alt="arrow" style={style}/>
    )
}

const DownMoveArrow = ({style}) => {
    return (
        <img src={Arrow} className="move-arrow down red" alt="arrow" style={style}/>
    )
}

export {LeftMoveArrow, RightMoveArrow, UpMoveArrow, DownMoveArrow};