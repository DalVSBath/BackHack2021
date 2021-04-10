import React from 'react';
import Arrow from "../../content/arrow.png";
import "./arrowLayout.css";

const ArrowLayout = () => {
    return (
        <span>
            <img src={Arrow} className="layout-arrow" alt="arrow" style={{"-webkit-transform": "rotate(-90deg)"}}/>
            <img src={Arrow} className="layout-arrow" alt="arrow" style={{"-webkit-transform": "rotate(180deg)"}}/>
            <img src={Arrow} className="layout-arrow" alt="arrow"/>
            <img src={Arrow} className="layout-arrow" alt="arrow" style={{"-webkit-transform": "rotate(90deg)"}}/>
        </span>
    );
}

export default ArrowLayout