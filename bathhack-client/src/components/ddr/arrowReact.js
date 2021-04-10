import React, { Component } from 'react'
import { SocketContext } from '../../App';


class ArrowReact extends React.Component {
    constructor(props){
      super(props);
      this.onKeyPress = this.onKeyPress.bind(this);
      this.from = this.props.creator ? "creator" : "viber";
    }
    static contextType = SocketContext;

    onKeyPress(event){
      if(event.keyCode === 37) {
        this.context.send({from: this.from, type: "left", timestamp: this.props.timestamp});
        this.props.arrowSelfGenCallback();
        console.log("clicked left")
      }
      else if(event.keyCode === 38){
        this.context.send({from: this.from, type: "up", timestamp: this.props.timestamp});
        console.log("clicked up")
      }
      else if(event.keyCode === 39){
        this.context.send({from: this.from, type: "right", timestamp: this.props.timestamp});
        console.log("clicked right")
      }
      else if(event.keyCode === 40){
        this.context.send({from: this.from, type: "down", timestamp: this.props.timestamp});
        console.log("clicked down")
      }
    }  
    
    componentDidMount(){

      document.addEventListener("keydown", this.onKeyPress, false);
    }  

    componentWillUnmount(){
      document.removeEventListener("keydown", this.onKeyPress, false);
    }  

    render(){
      return (   
        <>

        </>
      )
    }
}

export default ArrowReact