import React, { useContext, useEffect, useState } from 'react';
import Player from '../../components/spotify/player';
import './creatorOrViber.css'

class creatorOrViber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        }
        this.render()
    }
    // Click Event.
    btnClickCreator() {
        this.setState({redirect: ""});
    }

    btnClickViber() {
        self.close()
    }
    render() {
        return (<div style={{display: "flex", alignItems: "center", justifyContent: "center", height:"100vh", width:"100wh"}}>
                <title><header>something</header></title>
                <Score />
                <button style={{fontSize:"70px",alignItems: "center"}} className='e-link' onClick={this.btnClickCreator.bind(this)}>Go Again</button>
                <button style={{fontSize:"70px",alignItems: "center"}} className="e-link" onClick={this.btnClickViber.bind(this)}>Exit</button>
            </div>);
    }
}
    export default creatorOrViber