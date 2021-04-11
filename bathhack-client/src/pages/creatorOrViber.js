import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './creatorOrViber.css'


class creatorOrViber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        }
    }
    // Click Event.
    btnClickCreator() {
        this.setState({redirect: "selector"});
    }

    btnClickViber() {
        this.setState({redirect: "waiting"});
    }
    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (<div style={{display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width:"100wh"}}>
                <title><header>something</header></title>
                <button style={{fontSize:"70px",alignItems: "center"}} className='e-link' onClick={this.btnClickCreator.bind(this)}>𝕔𝕣𝕖𝕒𝕥𝕠𝕣</button>
                <button style={{fontSize:"70px",alignItems: "center"}} className="e-link" onClick={this.btnClickViber.bind(this)}>𝕧𝕚𝕓𝕖𝕣</button>
            </div>);
    }
}
    export default creatorOrViber