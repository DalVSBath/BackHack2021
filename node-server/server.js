const http = require('http');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 4180;

const wss = new WebSocket.Server({ port: 8080 });

const clients = {creator: null, viber: null};

let creatorTimestamp = null;
let viberTimestamp = null;

const cRegex = new RegExp("^C/");
const vRegex = new RegExp("^V/");

const timeStampCommandRegex = new RegExp("^setTimestamp:")

let processCommand = (msg) => {
  if (cRegex.test(msg)) {
    cmd = msg.slice(2);

  }
  else if (vRegex.test(msg)) {
    cmd = msg.slice(2);
  }
  else {
    console.log("recieved invalid cmd: " + msg)
  }
}

wss.on('request', request => {
  const connection = request.accept(null, request.origin);
})

wss.on('connection', function connection(ws) {

  const connection = 

  ws.on('message', function incoming(message) {

    processCommand(message);
    

    console.log('received: %s', message);
  });

  ws.send('something');
});