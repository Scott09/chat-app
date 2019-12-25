const express = require('express');
const http = require('http');
const port = 3000 || process.env.PORT;
const app = express();
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);


app.use(express.static('public'));

io.on('connection', () => {
  console.log('new websocket connection')
});


server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});