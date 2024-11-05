import { v4 as uuidv4 } from "uuid";
import { Socket } from "socket.io";
import { RoomPlayerDTO } from "../dtos/room-player-dto";

class RoomPlayer {
    private static generateId(): string {
        let id: string = uuidv4();
        while(RoomPlayer.IDS.includes(id)) {
            id = uuidv4();
        }
        return id;
    }

    private static IDS: string[] = [];

    private id: string;
    private name: string;
    private socket: Socket;

    constructor(name: string, socket: Socket) {
        this.id = RoomPlayer.generateId();
        RoomPlayer.IDS.push(this.id);
        this.name = name;
        this.socket = socket;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getSocket(): Socket {
        return this.socket;
    }

    public toDTO(): RoomPlayerDTO {
        return {
            id: this.id,
            name: this.name,
        };
    }
}

export default RoomPlayer;