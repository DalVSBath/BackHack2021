import React from 'react';
import { w3cwebsocket } from "websocket";

class SocketContext {

    constructor(req) {
        this.socket = new w3cwebsocket('ws://127.0.0.1:4180');
        this.socket.onopen = () => {
            console.log("socket bound");
            this.send(req);
        };
        this.socket.onmessage = () => {
            console.log("sent message");
        };
    }

    send = (msg) => {
        this.socket.send(JSON.stringify(msg));
    }

    sendCode = (code) => {
        this.socket.send({isCode: true, code: code});
    }
}

export default SocketContext;