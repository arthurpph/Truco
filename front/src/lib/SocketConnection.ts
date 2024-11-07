import { io, Socket } from 'socket.io-client';
import EventEmitter from 'eventemitter3';
import { CreateRoomDTO, JoinRoomDTO, LeaveRoomDTO } from '../types/dtos';
import { Room } from '../types/models';
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

        this.socket.on("connectionTest", () => {
            this.socket.emit("connectionReceived");
        });

        this.socket.on("error", (_) => {
            window.location.reload();
        });
    }

    public requestRoomInfo(data: { id: string }, callback: (data: Room) => void): void {
        this.socket.emit("getRoom", data);

        this.socket.once("roomInfo", callback);
    }

    public requestRoomList(callback: (data: Room[]) => void): void {
        this.socket.emit("getRooms");

        this.socket.once("roomList", callback);
    }

    public createRoom(data: CreateRoomDTO, callback?: (data: Room) => void): void {
        this.socket.emit("createRoom", data);

        if(callback) {
            this.socket.once("roomCreated", callback);
        }
    }

    public joinRoom(data: JoinRoomDTO, callback?: (data: Room) => void): void {
        this.socket.emit("joinRoom", data);

        if(callback) {
            this.socket.once("joinedRoom", callback);
        }
    }

    public leaveRoom(data: LeaveRoomDTO, callback?: () => void): void {
        this.socket.emit("leaveRoom", data);

        if(callback) {
            this.socket.once("leftRoom", callback);
        }
    }
}
