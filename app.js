const express = require('express');
const socketio = require('socket.io');
const axios = require('axios');
const mongoose = require('mongoose');

const Message = require('./models/Message');

// Init App
const app = express();

// Connect to DB
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('DB CONNECTED;');
	})
	.catch((err) => {
		console.log('ERROR CONNECTING TO DB', err);
	});

// CORS
app.use((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Headers', '*');
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));

// Socket-io Setup
const io = socketio(server);

io.on('connection', (socket) => {
	// console.log("Socket Connected", socket.handshake.query);
	// console.log('User Connected');
	const name = socket.handshake.query.name;
	socket.emit('greetings', `Welcome ${name}. I am Khovi. I will help you stay updated about coronavirus.`);
	socket.on('query', (query) => {
		console.log(query);
		axios
			.get('http://localhost:5005/webhooks/rest/webhook')
      .then((res) => {
        console.log('---------------------------------------------------');
        console.log('KOVI RESPONSE');
				console.log(res.data);
        console.log('---------------------------------------------------');
        socket.emit('query-response', res.data.text);
        // Save to DB
				Message.create({
					query,
					response: JSON.stringify(res.data)
        }).then(msg => {
          console.log('Conversation Unit recorded', msg);
        }).catch(err => {
          console.log('Failed to record conversation unit', err);
        });
			})
			.catch((err) => {
				console.log(err);
				socket.emit('query-response', "Oops! Looks like something went wrong!! Couldn't get response");
			});
	});

	socket.on('disconnect', () => {
		console.log('Socket Disconnected');
	});
});

io.on('error', (err) => console.log(err));
