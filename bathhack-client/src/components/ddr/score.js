import React, { Component } from 'react';

class Score extends Component {

    smallIncrement = () =>{
        this.setState( {count: this.state.count + 1 });
    }
    medIncrement = () =>{
      this.setState( {count: this.state.count + 2 });
    }
    bigIncrement = () =>{
    this.setState( {count: this.state.count + 3 });
  }

  render() {
    return (
      <div className style={{"position":"absolute","right":"30px","top":"2vh"}}> 
            <h2 style={{"color":"white"}}>Score:{this.props.count}</h2>
     </div>
    );
  }
}export default Score;


