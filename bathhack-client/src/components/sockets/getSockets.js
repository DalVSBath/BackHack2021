import { w3cwebsocket } from "websocket";

const getCreatorSocket = () => {
    const client = new w3cwebsocket('ws://127.0.0.1:4180');
    client.onopen = () => {
        console.log("Creator socket bound ");
    }
}

const getViberSocket = () => {
    const client = new w3cwebsocket('ws://127.0.0.1:4180');
    client.onopen = () => {
        console.log("Viber socket bound ");
    }
}
export { getCreatorSocket, getViberSocket };