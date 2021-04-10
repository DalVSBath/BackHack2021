import React, { Component } from 'react'
import Arrow from "../../content/arrow.svg";
import "./arrowLayout.css";

class YellowArrowMove extends React.Component{
    constructor(props){
        super(props);
        this.x = "27"// idk what this si but get it from props using time stamps
    }

    render() {
        return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
       <img src={Arrow} className="layout-arrow yellow" alt="arrow" style={{"WebkitTransform": "rotate(90deg)","left":"60vw","top": this.x+"vh","position": 'absolute'}}/>
    </div>
    )
    }
}

export default YellowArrowMove