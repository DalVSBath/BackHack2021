const http = require('http');
const WebSocket = require('ws');

const hostname = '127.0.0.1';
const port = 4180;

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});