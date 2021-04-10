import socketContext from "./socketContext";

const getCreatorSocket = () => {
    const client = new socketContext();

    return client;
}

const getViberSocket = () => {      
    const client = new socketContext();
    return client;
}

export { getCreatorSocket, getViberSocket };