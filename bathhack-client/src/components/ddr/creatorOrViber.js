import React, { Component } from 'react';
import 'creatorOrViber.css'


class creatorOrViber extends React.Component {
    // Click Event.
    btnClickCreator() {
        window.open("http://localhost:3000/creator");
    }

    btnClickViber() {
        window.open("http://localhost:3000/viber");
    }
    render() {
        return (<div>
                <ButtonComponent cssClass='e-link' onClick={this.btnClickCreator.bind(this)}>CREATOR</ButtonComponent>
                <ButtonComponent cssClass="e-link" onClick={this.btnClickViber.bind(this)}>VIBER</ButtonComponent>
            </div>);
    }
}
    export default creatorOrViber