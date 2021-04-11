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
                <title><header>something</header></title>
                <button style={{fontSize:"70px",alignItems: "center"}} className='e-link' onClick={this.btnClickCreator.bind(this)}>𝕔𝕣𝕖𝕒𝕥𝕠𝕣</button>
                <button style={{fontSize:"70px",alignItems: "center"}} className="e-link" onClick={this.btnClickViber.bind(this)}>𝕧𝕚𝕓𝕖𝕣</button>
            </div>);
    }
}
    export default creatorOrViber