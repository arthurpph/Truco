const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500", 
        methods: ["GET", "POST"]
    }
});

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('Um jogador conectou');
  
    socket.on('start_game', () => {
      io.emit('distribute_cards');
    });
  
    socket.on('request_truco', () => {
      io.emit('truco_response', 'TRUCO!');
    });
  });

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
