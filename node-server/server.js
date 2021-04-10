const http = require('http');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 4180;

const connections = {};
const clients = {creator: null, viber: null};

const wss = new WebSocket.Server({ port: port });

// const cRegex = new RegExp("^C/");
// const vRegex = new RegExp("^V/");

// let processCommand = (msg) => {
//   if (cRegex.test(msg)) {
//     cmd = msg.slice(2);

//   }
//   else if (vRegex.test(msg)) {
//     cmd = msg.slice(2);
//   }
//   else {
//     console.log("recieved invalid cmd: " + msg)
//   }
// }

const processCode = code => {
  
  
}

const processMessage = m => {
  if (m.from == "viber") {

  }
  else if (m.from == "creator") {
    connections[clients.viber].send({type: m.type, timestamp: m.timestamp})
  }
}

const getId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wss.on('connection', ws => {

  var id = getId();

  connections[id] = ws;

  ws.on('message', message => {
    message = JSON.parse(message);
    if (message.isCode === true) {
      processCode(message.code);
    } 
    else if (message.requestCreator === true) {
      if (clients.creator == null) {
        console.log("set creator to " + id)
        clients.creator = id;
      }
      else {
        ws.send("false")
      }
    }
    else if (message.requestViber === true) {
      if (clients.viber == null) {
        console.log("set viber to " + id)
        clients.viber = id;
      }
      else {
        ws.send("false")
      }
    } else {
      if (clients.creator != null && clients.viber != null) {
        console.log(message);
        processMessage(message);
      }
    }
  })

  ws.on('close', connection => {
    if (clients.creator === id) {
      clients.creator = null;
    } else if (clients.viber === id) {
      clients.viber = null;
    }
    console.log("closed connection " + id)
    delete connections[id];
  })
})