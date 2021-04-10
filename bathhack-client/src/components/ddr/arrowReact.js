import React, { Component } from 'react'
import { SocketContext } from '../../App';


class ArrowReact extends React.Component {
    constructor(props){
      super(props);
      this.onKeyPress = this.onKeyPress.bind(this);
    }
    static contextType = SocketContext;

    onKeyPress(event){
      if(event.keyCode === 37) {
        this.context.send({type: "viber"});
        console.log("clicked left")
      }
      else if(event.keyCode === 38){
          console.log("clicked up")
      }
      else if(event.keyCode === 39){
          console.log("clicked right")
      }
      else if(event.keyCode === 40){
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