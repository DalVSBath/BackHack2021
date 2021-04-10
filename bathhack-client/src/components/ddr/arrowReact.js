import React, { Component } from 'react'
import Arrow from "../../content/arrow.svg";
import { SocketContext } from '../../App';
import Hollow from "../../content/arrowHit.svg";

class ArrowReact extends React.Component {
    constructor(props){
      super(props);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.from = this.props.creator ? "creator" : "viber";
    }
    static contextType = SocketContext;
    onKeyUp(event){
        console.log("released");
        document.getElementById("blue").src={Arrow};
        document.getElementById("red").src={Arrow};
        document.getElementById("green").src={Arrow};
        document.getElementById("yellow").src={Arrow};
    }
    onKeyDown(event){
      if(event.keyCode === 37) {
        this.context.send({from: this.from, type: "left", timestamp: this.props.timestamp});
        document.getElementById("blue").src={Hollow};
        this.props.arrowSelfGenCallback({type: "left", timestamp: this.props.timestamp});
        console.log("clicked left")
      }
      else if(event.keyCode === 38){
        this.context.send({from: this.from, type: "up", timestamp: this.props.timestamp});
        this.props.arrowSelfGenCallback({type: "up", timestamp: this.props.timestamp});
        document.getElementById("green").src={Hollow};
        document.getElementById("green").className="layout-arrow"
        console.log("clicked up")
      }
      else if(event.keyCode === 39){
        this.context.send({from: this.from, type: "right", timestamp: this.props.timestamp});
        this.props.arrowSelfGenCallback({type: "right", timestamp: this.props.timestamp});
        document.getElementById("yellow").src={Hollow};
        document.getElementById("yellow").className="layout-arrow";
        console.log("clicked right")
      }
      else if(event.keyCode === 40){
        this.context.send({from: this.from, type: "down", timestamp: this.props.timestamp});
        this.props.arrowSelfGenCallback({type: "down", timestamp: this.props.timestamp});
        document.getElementById("red").src={Hollow};
        console.log("clicked down")
      }
    }  
    
    componentDidMount(){

      document.addEventListener("keydown", this.onKeyDown, false);
    }  

    componentWillUnmount(){
      document.removeEventListener("keydown", this.onKeyDown, false);
    }  

    render(){
      return (   
        <>
        <div style={{position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width: "100vw"}}>
            <img id = "blue" src={Arrow} className="layout-arrow blue" alt="arrow" style={{WebkitTransform: "rotate(-90deg)"}}/>
            <img id = "red" src={Arrow} className="layout-arrow red" alt="arrow" style={{WebkitTransform: "rotate(180deg)"}}/>
            <img id = "green" src={Arrow} className="layout-arrow green" alt="arrow"/>
            <img id = "yellow" src={Arrow} className="layout-arrow yellow" alt="arrow" style={{WebkitTransform: "rotate(90deg)"}}/>
        </div>
            </>
      )
    }
}

export default ArrowReact