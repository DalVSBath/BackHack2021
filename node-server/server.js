const http = require('http');
const WebSocket = require('ws');
const fetch = require("node-fetch");

const hostname = '127.0.0.1';
const port = 4180;

const SpotifySecret = "e3b2bc257c9f443bb1c0a6a527c612ab";
const SpotifyId = "50f563707d1041d5bc9237357be49ee6";

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

const processRefresh = (token, id) => {
    var formBody = [];
    details = {
        "grant_type": "refresh_token",
        "refresh_token": token,
    };

    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`https://accounts.spotify.com/api/token`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Basic NTBmNTYzNzA3ZDEwNDFkNWJjOTIzNzM1N2JlNDllZTY6ZTNiMmJjMjU3YzlmNDQzYmIxYzBhNmE1MjdjNjEyYWI="
        },
        body: formBody
    })
        .then(dta => { return dta.json(); })
        .then(data => {
          connections[id].send(JSON.stringify(data));
        });
}

const processCode = (code, id) => {
    //console.log(code);
    var formBody = [];
    details = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://localhost:3000/spotify/callback/"
    };

    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`https://accounts.spotify.com/api/token`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Basic NTBmNTYzNzA3ZDEwNDFkNWJjOTIzNzM1N2JlNDllZTY6ZTNiMmJjMjU3YzlmNDQzYmIxYzBhNmE1MjdjNjEyYWI="
        },
        body: formBody
    })
        .then(dta => { return dta.json(); })
        .then(data => {
            connections[id].send(JSON.stringify(data));
        });
  
}

const processReady = (track) => {
  connections[clients.viber].send(JSON.stringify({ready:true, track: track}));
}

const processMessage = m => {
  if (m.from == "viber") {
    connections[clients.creator].send(JSON.stringify({type: m.type, timestamp: m.timestamp, garbage: m.garbage}));
  }
  else if (m.from == "creator") {
    connections[clients.viber].send(JSON.stringify({type: m.type, timestamp: m.timestamp}));
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
      processCode(message.code, id);
    } 
    else if (message.isRefresh === true) {
        processRefresh(message.token, id);
    }
    else if (message.isReady === true) {
      processReady(message.track);
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