const express = require("express");
const socketio = require("socket.io");
const axios = require('axios');
const app = express();

// CORS
app.use((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "*");
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));

// Socket-io Setup
const io = socketio(server);

io.on("connection", (socket) => {
  // console.log("Socket Connected", socket.handshake.query);
  console.log('User Connected');
  const name = socket.handshake.query.name;
  socket.emit('greetings', `Welcome ${name}. I am Khovi. I will help you stay updated about coronavirus.`)

  socket.on("query", (query) => {
    console.log(query);
    axios.get('http://localhost:5005/webhooks/rest/webhook')
      .then(res => {
        console.log(res.data);
        socket.emit('query-response', res.data.text);
      })
      .catch(err => {
        console.log(err);
        socket.emit('query-response', 'Oops! Looks like something went wrong!! Couldn\'t get response');
      })
  });

  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });
});

io.on('error', err => console.log(err))
