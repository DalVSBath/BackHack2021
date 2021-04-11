import React, { Component } from 'react'
import Arrow from "../../content/arrow.svg";
import { SocketContext } from '../../App';
import Hollow from "../../content/arrowHit.svg";

class ArrowReact extends React.Component {
    constructor(props){
      super(props);
      this.PERFECT_SCORE = 3;
      this.NEGATIVE_SCORE_MULT = 2.5;
      this.NOTE_HIT_TOLERANCE = 500;
      this.NOTE_MISS_MULTIPLIER = 5;
      this.onKeyDown = this.onKeyDown.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
      this.from = this.props.creator ? "creator" : "viber";
    }
    static contextType = SocketContext;
    
    hitProcess(direction, index, arrow) {
      if (arrow.type === direction) {
        let timeDiff = arrow.timestamp - this.props.timestamp;
        if (Math.abs(timeDiff) < this.NOTE_HIT_TOLERANCE && arrow.hit == null) {
          console.log("ARROW HIT GOD DAMN")
          if(this.props.arrowUpdate)
            this.props.arrowUpdate(index, true);
          this.props.addScore((this.NOTE_HIT_TOLERANCE-Math.abs(timeDiff))*this.PERFECT_SCORE);
          return true;
        } else if (timeDiff > this.NOTE_HIT_TOLERANCE && timeDiff < this.NOTE_MISS_MULTIPLIER * this.NOTE_HIT_TOLERANCE) {
          console.log("u r suck")
          if(this.props.arrowUpdate)
            this.props.arrowUpdate(index, false);
          this.props.addScore(-(this.NOTE_HIT_TOLERANCE * this.NEGATIVE_SCORE_MULT))
          return true;
        }

        // Only consider other in column if the next is already missed
        if (! timeDiff < -this.NOTE_HIT_TOLERANCE) {
          return true;
        }
      }
      return false;
    }

    checkForNoteHit(direction) { 
      for (let index = 0; index < this.props.arrows.length; index++) {
        let arrow = this.props.arrows[index];

        if (this.props.creator) {
          if (arrow.garbage) {
            if(this.hitProcess(direction, index, arrow))
              return;
          }
        } else {
          if(this.hitProcess(direction, index, arrow))
            return;
        }
      }
    }

    onKeyUp(event){
        console.log("released");
        document.getElementById("blue").src=Arrow;
        document.getElementById("red").src=Arrow;
        document.getElementById("green").src=Arrow;
        document.getElementById("green").className="layout-arrow green"
        document.getElementById("yellow").src=Arrow;
    }
    onKeyDown(event){
      if(event.keyCode === 37) {
        document.getElementById("blue").src=Hollow;
        this.context.send({type: "left", timestamp: this.props.timestamp});
        if (this.props.creator) {
          this.props.arrowSelfGenCallback({type: "left", timestamp: this.props.timestamp});
        }
        else {
          this.checkForNoteHit("left");
        }
        console.log("clicked left " + this.props.timestamp)
      }
      else if(event.keyCode === 38){
        this.context.send({type: "up", timestamp: this.props.timestamp});
        if (this.props.creator) {
          this.props.arrowSelfGenCallback({type: "up", timestamp: this.props.timestamp});
        } else {
          this.checkForNoteHit("up");
        }
        document.getElementById("green").src=Hollow;
        console.log("clicked up")
      }
      else if(event.keyCode === 39){
        this.context.send({type: "right", timestamp: this.props.timestamp});
        if (this.props.creator) {
          this.props.arrowSelfGenCallback({type: "right", timestamp: this.props.timestamp});
        } else {
          this.checkForNoteHit("right");
        }
        document.getElementById("yellow").src=Hollow;
        console.log("clicked right")
      }
      else if(event.keyCode === 40){
        this.context.send({type: "down", timestamp: this.props.timestamp});
        if (this.props.creator) {
          this.props.arrowSelfGenCallback({type: "down", timestamp: this.props.timestamp});
        } else {
          this.checkForNoteHit("down");
        }
        document.getElementById("red").src=Hollow;
        console.log("clicked down")
      }
    }  
    
    componentDidMount(){

      document.addEventListener("keydown", this.onKeyDown, false);
      document.addEventListener("keyup",this.onKeyUp, false);
    }  

    componentWillUnmount(){
      document.removeEventListener("keydown", this.onKeyDown, false);
      document.removeEventListener("keyup", this.onKeyUp, false);
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