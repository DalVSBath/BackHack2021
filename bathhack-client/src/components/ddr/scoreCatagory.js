import React, { Component } from 'react';

const getRandomInt = max => {
    return Math.floor(Math.random() * max);
}

const colors = ["red", "white", "blue", "pink", "yellow", "lime", "purple", "orange"]

class ScoreCatagory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            colorInt: getRandomInt(8),
            message: "Wow..."
        }

        this.interval = null
    }


    componentDidUpdate(prevProps) {
        if(prevProps.Score !== this.props.Score) {

            if(this.props.Score > 0) {
                let msg = "";

                if(this.props.Score > 200)
                    msg = "You're really good";
                else if(this.props.Score > 160)
                    msg = "Absolutely Incredible";
                else if(this.props.Score > 120)
                    msg = "Golly gosh";
                else if(this.props.Score > 80)
                    msg = "Awesome, not.";
                else if(this.props.Score > 40)
                    msg = "Wow...";

                clearTimeout(this.interval);
                this.setState({visible: true, colorInt: getRandomInt(8), message: msg});
                this.interval = setTimeout(() => this.setState({visible: false}), 1500);
            }
        }
    }


    render() {
        return (
            <div className style={{"position":"absolute","right":"50%","top":"3vh"}}> 
                {this.state.visible ? 
                    <h2 style={{"color":colors[this.state.colorInt]}}>{this.state.message}</h2>
                : "" }
            </div>
        );
    }
}

export default ScoreCatagory;


