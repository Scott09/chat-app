const express = require('express');
const http = require('http');
const port = 3000 || process.env.PORT;
const app = express();
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);


app.use(express.static('public'));

// let count = 0;

// io.on('connection', (socket) => {
//   console.log('new websocket connection')
  
//   socket.emit('countUpdated', count)

//   socket.on('increment', () => {
//     count++;
//     io.emit('countUpdated', count);
//   })
// });


io.on('connection', (socket) => {
  console.log('New Websocket Connection');

  io.emit('message', "Welcome!");

  socket.broadcast.emit('message', "A new user has joined")

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  })

  socket.on('disconnect', () => {
    io.emit('userDisconnect', "A user has disconnected");
  })
})



server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});