import React from 'react';
import { w3cwebsocket } from "websocket";

class SocketContext {
    constructor(req) {
        this.ready = false;
        this.RefreshCallBack = [];
        this.AccessCallBack = [];
        this.MessageCallBack = [];
        this.socket = new w3cwebsocket('ws://127.0.0.1:4180');
        this.socket.onopen = () => {
            console.log("socket bound");
            this.ready = true;
            this.send(req);
        };
        this.socket.onmessage = (msg) => {
            console.log("sent message");
            const dataFromServer = JSON.parse(msg.data);

            console.log(dataFromServer);

            if(dataFromServer.error)
                return;
            
            if(dataFromServer.refresh_token) {
                for (let index = 0; index < this.RefreshCallBack.length; index++) {
                    this.RefreshCallBack[index](dataFromServer);
                }
                this.RefreshCallBack = [];
            }else if(dataFromServer.access_token) {
                for (let index = 0; index < this.AccessCallBack.length; index++) {
                    this.AccessCallBack[index](dataFromServer);
                }
                this.AccessCallBack = [];
            }else{
                for (let index = 0; index < this.MessageCallBack.length; index++) {
                    this.MessageCallBack[index](dataFromServer);
                }
            }
        };

        this.req = req;
    }

    AddRefreshCallback = cb => {
        this.RefreshCallBack.push(cb);
    }

    AddAccessCallback = cb => {
        this.AccessCallBack.push(cb);
    }

    AddMessageCallback = cb => {
        this.MessageCallBack.push(cb);
    }

    send = (msg) => {
        if(!this.ready) {
            setTimeout(() => this.send(msg), 50);//wait 50 millisecnds then recheck
            return;
        }
        msg["from"] = this.req.requestCreator ? "creator" : "viber";
        this.socket.send(JSON.stringify(msg));
    }

    sendCode = (code) => {
        this.send({isCode: true, code: code});
    }

    sendRefresh = refresh => {
        this.send({isRefresh: true, token: refresh});
    }
}

export default SocketContext;