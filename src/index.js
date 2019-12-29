const express = require('express');
const http = require('http');
const port = 3000 || process.env.PORT;
const app = express();
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);


app.use(express.static('public'));


io.on('connection', (socket) => {
  console.log('New Websocket Connection');

  io.emit('message', "Welcome!");

  socket.broadcast.emit('message', "A new user has joined")

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  })

  socket.on('disconnect', () => {
    io.emit('message', "A user has disconnected");
  })

  socket.on('sendLocation', ({ latitude, longitude }) => {
    io.emit('message', `https://google.com/maps?q=${latitude},${longitude}`)
  })

});



server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});