import React, { Component } from 'react';
import './creatorOrViber.css'


class creatorOrViber extends React.Component {
    // Click Event.
    btnClickCreator() {
        window.open("http://localhost:3000/creator");
    }

    btnClickViber() {
        window.open("http://localhost:3000/viber");
    }
    render() {
        return (<div style={{display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width:"100wh"}}>
                <button className='e-link' onClick={this.btnClickCreator.bind(this)}>CREATOR</button>
                <button className="e-link" onClick={this.btnClickViber.bind(this)}>VIBER</button>
            </div>);
    }
}
    export default creatorOrViber