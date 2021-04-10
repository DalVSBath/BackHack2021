import React, { Component } from 'react';

class Score extends Component {

    constructor(props){
        super (props);
        this.state = {
            count: 0
        }
    }

    increment = () =>{
        this.setState( {count: this.state.count + 1 });
    }

  render() {
    return (
      <div className style={{"position":"absolute","right":"30px","top":"2vh"}}> 
            <h2>{this.state.count}</h2>
     </div>
    );
  }
}export default Score;


