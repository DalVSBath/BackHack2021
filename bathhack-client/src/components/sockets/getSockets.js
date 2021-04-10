import { w3cwebsocket } from "websocket";

const getCreatorSocket = () => {
    const client = new w3cwebsocket('ws://127.0.0.1:8080');
    client.onopen = () => {
        console.log("Creator socket bound");
    }
    return client;
}

const getViberSocket = () => {      
    const client = new w3cwebsocket('ws://127.0.0.1:8080');
    client.onopen = () => {
        console.log("Viber socket bound");
    };
    client.onmessage = () => {
        console.log("viber sent message");
    };
    return client;
}
export { getCreatorSocket, getViberSocket };