import { io, Socket } from 'socket.io-client';
import EventEmitter from 'eventemitter3';
import constants from '../data/constants.json';

let _instance: SocketConnection;

export default function getSocketConnection() {
    if (!_instance) {
        _instance = new SocketConnection(constants.WEBSOCKET_URL);
    }
    return _instance;
}

class SocketConnection {
    readonly emitter = new EventEmitter();
    private socket: Socket;

    constructor(url: string) {
        this.socket = io(url);

        this.socket.on('connect', () => {
            this.emitter.emit('socket.open');
        });

        this.socket.on('disconnect', () => {
            this.emitter.emit('socket.closed');
        });

        this.socket.on('roomList', (data) => {
            this.emitter.emit('roomList', data);
        });

        this.socket.on('roomCreated', (data) => {
            this.emitter.emit('roomCreated', data);
        });

        this.socket.on('error', (error) => {
            console.warn('SocketConnection.onerror', error);
        });
    }

    public requestRoomList(callback: (data: any) => void): void {
        this.socket.emit("getRooms");

        this.emitter.once('roomList', callback);
    }

    public createRoom(data: any, callback: (data: any) => void): void {
        this.socket.emit("createRoom", data);

        this.emitter.once('roomCreated', callback);
    }
}
