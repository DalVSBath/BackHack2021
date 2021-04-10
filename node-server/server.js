const http = require('http');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 4180;

const wss = new WebSocket.Server({ port: port });

const cRegex = new RegExp("^C/");
const vRegex = new RegExp("^V/");

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

const processMessage = m => {
  if (m.type == "viber") {

  }
  else if (m.type == "creator") {

  }
}

wss.on('connection', ws => {  

  ws.on('message', message => {
    console.log(message);
    processMessage(message);
  })

})

// wss.on('connection', function connection(ws) {

//   const connection = 

//   ws.on('message', function incoming(message) {

//     processCommand(message);
    

//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });