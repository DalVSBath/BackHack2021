import React, { Component } from 'react'


class ArrowReact extends React.Component{
    constructor(props){
        super(props);
        this.onKeyPress = this.onKeyPress.bind(this);
      }  
      onKeyPress(event){
        if(event.keyCode === 37) {
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
          <div>
          </div>
        )
      }
}

export default ArrowReact