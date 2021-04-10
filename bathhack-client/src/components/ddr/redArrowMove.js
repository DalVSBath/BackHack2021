import React, { Component } from 'react'
import Arrow from "../../content/arrow.svg";
import "./arrowLayout.css";

class RedArrowMove extends React.Component{
    constructor(props){
        super(props);
        this.x = "27"// idk what this si but get it from props using time stamps
    }

    render() {
        return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100vh"}}>
       <img src={Arrow} className="layout-arrow red" alt="arrow" style={{"WebkitTransform": "rotate(180deg)","left":"35vw","top": this.x+"vh","position": 'absolute'}}/>
    </div>
    )
    }
}

export default RedArrowMove