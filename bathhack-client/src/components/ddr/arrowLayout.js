import React from 'react';
import Arrow from "../../content/arrow.svg";
import "./arrowLayout.css";

const ArrowLayout = () => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height:"100vh"}}>
            <img src={Arrow} className="layout-arrow blue" alt="arrow" style={{"-webkit-transform": "rotate(-90deg)"}}/>
            <img src={Arrow} className="layout-arrow red" alt="arrow" style={{"-webkit-transform": "rotate(180deg)"}}/>
            <img src={Arrow} className="layout-arrow green" alt="arrow"/>
            <img src={Arrow} className="layout-arrow yellow" alt="arrow" style={{"-webkit-transform": "rotate(90deg)"}}/>
        </div>
    );
}

export default ArrowLayout