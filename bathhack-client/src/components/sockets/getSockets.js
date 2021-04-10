import socketContext from "./socketContext";

const getCreatorSocket = (req) => {
    const client = new socketContext(req);

    return client;
}

const getViberSocket = (req) => {      
    const client = new socketContext(req);
    return client;
}

export { getCreatorSocket, getViberSocket };