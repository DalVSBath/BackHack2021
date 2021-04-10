import React, { Component } from 'react'
import Arrow from "../../content/arrow.svg";
import "./arrowLayout.css";

class BlueArrowMove extends React.Component{
    constructor(props){
        super(props);
        var x // idk what this si but get it from props using time stamps
    }

    render() {
        return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "200vh"}}>
        <img src={Arrow} className="layout-arrow blue" alt="arrow" style={{"-webkit-transform": "rotate(-90deg)" , "top": x+"px","position": 'absolute'}}/>
    </div>
    )
    }
}

export default BlueArrowMove