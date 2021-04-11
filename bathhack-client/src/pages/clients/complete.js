import React, { useContext, useEffect, useState } from 'react';
import Score from "../../components/ddr/score";
import '../creatorOrViber.css'
import qs from "qs";
import { Redirect } from 'react-router';

class creatorOrViber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        }
        this.render()
        this.score = qs.parse(props.location.search, { ignoreQueryPrefix: true }).score;
    }
    // Click Event.
    btnClickCreator() {
        this.setState({redirect: ""});
    }

    btnClickViber() {
        this.setState({redirect: ""});
    }
    render() {
        if(this.state.redirect)
            return <Redirect to={"/"} />
        return (<div style={{display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width:"100wh"}}>
                <title><header>something</header></title>
                <Score count={this.score} />
                <button style={{fontSize:"70px",alignItems: "center"}} className='e-link' onClick={this.btnClickCreator.bind(this)}>Go Again</button>
                <button style={{fontSize:"70px",alignItems: "center"}} className="e-link" onClick={this.btnClickViber.bind(this)}>Exit</button>
            </div>);
    }
}
    export default creatorOrViber