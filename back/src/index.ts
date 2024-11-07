import express from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";
import fs from "fs";
import path from "path";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"]
    }
});

app.use(express.static('public'));

const listeners: { [key: string]: (socket: Socket) => void } = {};

const loadListeners = () => {
    const listenersDir = path.join(__dirname, "ws");

    fs.readdirSync(listenersDir).forEach((file) => {
      if (file.endsWith('.ts')) { 
        const listenerModule = require(path.join(listenersDir, file)); 
        const listener = listenerModule.default;
        const listenerName = path.basename(file, path.extname(file)); 
        listeners[listenerName] = listener; 
      }
    });
};

loadListeners();

io.on('connection', (socket: Socket) => {
  Object.values(listeners).forEach(listener => listener(socket));
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
