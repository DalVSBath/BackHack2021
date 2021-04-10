import React from 'react';
import { w3cwebsocket } from "websocket";

class socketContext {

    constructor() {
        this.socket = new w3cwebsocket('ws://127.0.0.1:8080');
        this.socket.onopen = () => {
            console.log("socket bound");
        };
        this.socket.onmessage = () => {
            console.log("sent message");
        };
    }

    send = (msg) => {
        this.socket.send(JSON.stringify(msg));
    }

}

export default socketContext;