const express = require('express');
const http = require('http');
const port = 3000 || process.env.PORT;
const app = express();
const socketio = require('socket.io');
const Filter = require('bad-words');

const server = http.createServer(app);
const io = socketio(server);


app.use(express.static('public'));


io.on('connection', (socket) => {
  console.log('New Websocket Connection');

  io.emit('message', "Welcome!");

  socket.broadcast.emit('message', "A new user has joined")

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback("Can't send messages with profane language! Message not delivered")
    }

    io.emit('message', message);
    callback();
  })

  socket.on('disconnect', () => {
    io.emit('message', "A user has disconnected");
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
    callback();
  })


});



server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});