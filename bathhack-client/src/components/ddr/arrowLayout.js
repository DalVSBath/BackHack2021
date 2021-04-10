import React from 'react';
import Arrow from "../../content/arrow.svg";
import "./arrowLayout.css";
import ArrowReact from './arrowReact';

const ArrowLayout = () => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height:"100vh"}}>
            <img src={Arrow} className="layout-arrow blue" alt="arrow" style={{WebkitTransform: "rotate(-90deg)"}}/>
            <img src={Arrow} className="layout-arrow red" alt="arrow" style={{WebkitTransform: "rotate(180deg)"}}/>
            <img src={Arrow} className="layout-arrow green" alt="arrow"/>
            <img src={Arrow} className="layout-arrow yellow" alt="arrow" style={{WebkitTransform: "rotate(90deg)"}}/>
            <ArrowReact />
        </div>
    );
}

export default ArrowLayout