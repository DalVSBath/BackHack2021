import React from 'react';
import { w3cwebsocket } from "websocket";

class SocketContext {
    constructor(req) {
        this.ready = false;
        this.RefreshCallBack = [];
        this.AccessCallBack = [];
        this.ReadyCallBack = null;
        this.MessageCallBack = null;
        this.socket = new w3cwebsocket('ws://127.0.0.1:4180');
        this.socket.onopen = () => {
            console.log("socket bound");
            this.ready = true;
        };
        this.socket.onmessage = (msg) => {
            //console.log("sent message");
            //console.log(msg);
            const dataFromServer = JSON.parse(msg.data);

            //console.log(dataFromServer);

            if(dataFromServer.error || dataFromServer === false)
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
            }else if(dataFromServer.ready){
                if(this.ReadyCallBack)
                    this.ReadyCallBack(dataFromServer.track);
            }
            else{
                if(this.MessageCallBack) {
                    this.MessageCallBack(dataFromServer);
                }
            }
        };

        this.req = {requestCreator: false};
        
    }

    rebindToCreator = () => {
        this.req = {requestCreator: true};
        this.send({requestCreator: true});
    }

    rebindToViber = () => {
        this.req = {requestViber: true};
        this.send({requestViber: true});
    }

    AddRefreshCallback = cb => {
        this.RefreshCallBack.push(cb);
    }

    AddAccessCallback = cb => {
        this.AccessCallBack.push(cb);
    }

    SetMessageCallBack = cb => {
        this.MessageCallBack = cb;
    }

    SetReadyCallBack = cb => {
        this.ReadyCallBack = cb;
    }

    send = (msg) => {
        if(!this.ready) {
            //setTimeout(() => this.send(msg), 50);
            return;
        }
        msg["from"] = this.req.requestCreator ? "creator" : "viber";
        this.socket.send(JSON.stringify(msg));
    }

    sendCode = (code) => {
        this.send({isCode: true, code: code});
    }

    sendReady = id => {
        this.send({isReady: true, track: id});
    }

    sendRefresh = refresh => {
        this.send({isRefresh: true, token: refresh});
    }
}

export default SocketContext;