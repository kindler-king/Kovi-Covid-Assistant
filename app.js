const express = require("express");
const socketio = require("socket.io");

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
    socket.emit('query-response', 'Here is your response');
  });

  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });
});

io.on('error', err => console.log(err))
