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
      <div className="App"> 
            <button onClick = {this.increment} className = "counter">add</button>
            <h2>{this.state.count}</h2>
     </div>
    );
  }
}export default Score;


